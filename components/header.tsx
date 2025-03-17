import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
    SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { GetYearEventAction } from "@/action/(visitor)/event-year/action";

export default async function Header() {
    const links = [
        { label: "Nos créateurs", href: "/exposants" },
        { label: "Contact", href: "/contact" },
    ];

    const year = (await GetYearEventAction()) as { content: string };

    return (
        <header className="sticky top-0 z-50 w-full bg-neutral-50 backdrop-blur-sm border-b border-neutral-100 shadow-md">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                        >
                            <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 mr-2">
                                Salon des créateurs
                            </h1>
                        </Link>
                        <Badge variant="default">
                            Édition {year.content ? year.content : "2025"}
                        </Badge>
                    </div>

                    <nav className="hidden md:flex items-center gap-6">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-neutral-500 hover:text-neutral-700 transition-colors duration-200 text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Button
                            variant="default"
                            className="bg-yellow-500 hover:bg-yellow-500/90 text-neutral-900 font-medium rounded-full px-5"
                            asChild
                        >
                            <Link href="/visitor-signup">Inscrivez-vous</Link>
                        </Button>
                    </nav>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden text-neutral-300 hover:text-white hover:bg-neutral-800"
                                aria-label="Menu"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetTitle className="hidden">
                            Menu de navigation
                        </SheetTitle>
                        <SheetContent
                            side="right"
                            className="bg-black/95 border-neutral-800"
                        >
                            <VisuallyHidden>
                                <h2 id="menu-heading">Menu de navigation</h2>
                            </VisuallyHidden>
                            <div
                                className="flex flex-col gap-6 mt-8"
                                aria-labelledby="menu-heading"
                            >
                                <Badge
                                    variant="outline"
                                    className="self-start px-3 py-1 text-xs bg-neutral-50 text-neutral-900 border-neutral-200"
                                >
                                    {year.content ? year.content : "2025"}
                                </Badge>
                                <nav className="flex flex-col gap-4">
                                    {links.map((link) => (
                                        <SheetClose asChild key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="text-neutral-500 hover:text-neutral-300 transition-colors duration-200 text-lg font-medium"
                                            >
                                                {link.label}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                    <SheetClose asChild>
                                        <Button
                                            variant="default"
                                            className="bg-primary hover:bg-primary/90 text-white font-medium rounded-full px-5 w-fit mt-2"
                                            asChild
                                        >
                                            <Link href="/visitor-signup">
                                                Inscrivez-vous
                                            </Link>
                                        </Button>
                                    </SheetClose>
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
