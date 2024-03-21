import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

export function SheetMobileMenu() {
    return (
        <Sheet>
            <SheetTrigger>Burger Icon</SheetTrigger>
            <SheetContent className="space-y-3">
                <SheetTitle>JibbyEats</SheetTitle>
                <Separator />
                <SheetDescription className="flex">
                    <Button className="flex-1 font-bold bg-sky-600 hover:bg-sky-500">Login Now</Button>
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}