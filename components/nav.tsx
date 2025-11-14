import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"

export function Navbar() {
    return (
        <nav className="px-4 h-16 border-b flex justify-between items-center">
            <div className="flex gap-4 items-center">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Image src={'/logo.svg'} height={32} width={32} alt="showcase-logo" />
                </div>
                <div className="flex flex-col gap-0.5 font-medium leading-none">
                    <span className="font-medium">Showcase</span>
                </div>
            </div>
            <Button asChild>
                <Link href="https://cliff-lipstick-643.notion.site/2ab137c6bc13802fa5a3e44f8092b8e2?pvs=105">
                    Contact Us!
                </Link>
            </Button>
        </nav>
    )
}