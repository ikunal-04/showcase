"use client"

import { useEffect } from "react"

import { Button } from "./ui/button"
import Image from "next/image"
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export function Navbar() {
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session) {
            router.push("/portfolios")
        }
    }, [session, router])

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
            <Button onClick={() => signIn("google")}>
                Get Started
            </Button>
        </nav>
    )
}