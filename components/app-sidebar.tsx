"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

const data = {
  navMain: [
    {
      title: "Explore",
      url: "#",
      items: [
        {
          title: "All portfolios",
          url: "/",
        },
        {
          title: "Add your portfolio",
          url: "/setup",
        },
      ],
    },
    {
      title: "Insights",
      url: "#",
      items: [
        {
          title: "Analytics",
          url: "/analytics",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher />
      </SidebarHeader>
      <SidebarContent className="flex flex-col flex-1 grow justify-between">
        <div>
          {data.navMain.map((item) => (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url || (item.url !== "/" && pathname?.startsWith(item.url))}
                      >
                        <Link href={item.url}>{item.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </div>
        <div className="p-4 text-sm text-white" >
          Created by {" "}
          {/* <Badge variant="outline" asChild> */}
            <Link
              href={"https://x.com/kunlgarg"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center underline"
            >
              Kunal Garg
            </Link>
          {/* </Badge> */}
          !!
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
