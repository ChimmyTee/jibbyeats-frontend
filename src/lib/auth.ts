import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { Collection, MongoClient } from "mongodb";

const client = new MongoClient(import.meta.env.MONGODB_CONNECTION_STRING);
await client.connect();

export const db = client.db("JibbyEats");
const User = db.collection("users") as Collection<UserDoc>;
const Session = db.collection("sessions") as Collection<SessionDoc>;

const adapter = new MongodbAdapter(Session, User);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: import.meta.env.DEV
		}
	},
    getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			username: attributes.username
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
        DatabaseUserAttributes: Omit<DatabaseUser, "id">;
	}
}

interface UserDoc {
	_id: string;
	username: string;
	password: string;
}

interface SessionDoc {
	_id: string;
	expires_at: Date;
	user_id: string;
}

export interface DatabaseUser {
	_id: string;
	username: string;
	password: string;
}