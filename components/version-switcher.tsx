"use client"

import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"

export function VersionSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href={'/'}>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <Image src={'/logo.svg'} height={32} width={32} alt="showcase-logo" />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-medium">Showcase</span>
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
