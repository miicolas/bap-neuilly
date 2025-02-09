"use client";

import { Bell } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";


export default function Notification() {

    const data = [
        {
            title: "Notification 1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc euismod, purus in venenatis sodales, libero metus tincidunt nulla, in sagittis sem ligula eu quam. Sed volutpat, urna eu aliquam consectetur, mi neque aliquet nunc, eget posuere velit nunc nec erat.",
            url: "#",
        },
        {
            title: "Notification 2",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc euismod, purus in venenatis sodales, libero metus tincidunt nulla, in sagittis sem ligula eu quam. Sed volutpat, urna eu aliquam consectetur, mi neque aliquet nunc, eget posuere velit nunc nec erat.",
            url: "#",
        },
        {
            title: "Notification 3",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc euismod, purus in venenatis sodales, libero metus tincidunt nulla, in sagittis sem ligula eu quam. Sed volutpat, urna eu aliquam consectetur, mi neque aliquet nunc, eget posuere velit nunc nec erat.",
            url: "#",
        },
        {
            title: "Notification 4",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc euismod, purus in venenatis sodales, libero metus tincidunt nulla, in sagittis sem ligula eu quam. Sed volutpat, urna eu aliquam consectetur, mi neque aliquet nunc, eget posuere velit nunc nec erat.",
            url: "#",
        },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {data.length > 0 ? (
                    <div className="relative">
                        <Bell className="h-5 text-neutral-500" />
                        <span className="bg-red-500 rounded-full h-2 w-2 absolute top-1 right-1 animate-pulse"></span>

                    </div>
                ) : (
                    <Bell className="h-5 text-neutral-500 " />
                )}



            </DropdownMenuTrigger>
            <DropdownMenuContent className="mx-8 max-w-xs">
                {data.map((item) => (
                    <DropdownMenuItem key={item.title}>
                        <Link href={item.url}>
                            <div className="flex flex-col items-left justify-between gap-4 p-4">
                                <div className="flex items-center gap-4">
                                    <Bell className="h-5 w-5 text-neutral-500" />
                                    <p className="text-sm text-neutral-500">{item.title}</p>
                                </div>
                                <p className="text-sm text-neutral-500">{item.description.slice(0, 100) + "..."}</p>
                            </div>
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}