import { db, lucia } from "../../lib/auth";
import { Argon2id } from "oslo/password";
import type { APIContext } from "astro";
import type { DatabaseUser } from "lucia";

export async function POST(context: APIContext): Promise<Response> {
	const formData = await context.request.formData();
	const username = formData.get("username");
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return new Response(JSON.stringify({ error: "Invalid username" }), {
			status: 400
		});
	}
	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		return new Response(JSON.stringify({ error: "Invalid password" }), {
			status: 400
		});
	}

	const existingUser = await db.collection('users').findOne({ username: username })
	if (!existingUser) {
		return new Response(
			JSON.stringify({
				error: "Incorrect username"
			}),
			{
				status: 400
			}
		);
	}

	const validPassword = await new Argon2id().verify(existingUser.password, password);
	if (!validPassword) {
		return new Response(
			JSON.stringify({
				error: "Incorrect password"
			}),
			{
				status: 400
			}
		);
	}

	console.log("created session with" + existingUser._id.toString());
	
	const session = await lucia.createSession(existingUser._id.toString(), {});
	console.log("session id " + session.id);
	const sessionCookie = lucia.createSessionCookie(session.id);
	context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	return new Response();
}