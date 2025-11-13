"use client";

/* eslint-disable @next/next/no-img-element */
import { usePortfoliosStore } from "@/store/portfolios"
import { useEffect } from "react"
import Link from "next/link"
import { Twitter, Linkedin, ExternalLink } from "lucide-react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const extractTwitterHandle = (url: string): string | null => {
  if (!url?.trim()) return null
  try {
    const parsed = new URL(url)
    const pathParts = parsed.pathname.split("/").filter(Boolean)
    if (pathParts.length > 0) {
      return pathParts[0]
    }
  } catch {
    return null
  }
  return null
}

const extractLinkedInHandle = (url: string): string | null => {
  if (!url?.trim()) return null
  try {
    const parsed = new URL(url)
    const pathParts = parsed.pathname.split("/").filter(Boolean)
    const inIndex = pathParts.indexOf("in")
    if (inIndex !== -1 && pathParts[inIndex + 1]) {
      return pathParts[inIndex + 1]
    }
    if (pathParts.length > 0 && pathParts[0] !== "in") {
      return pathParts[0]
    }
  } catch {
    return null
  }
  return null
}

export default function Page() {
  const getPortfolios = usePortfoliosStore((state) => state.getPortfolios)
  const portfolios = usePortfoliosStore((state) => state.portfolios)

  useEffect(() => {
    getPortfolios();
  }, [getPortfolios])

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {portfolios.map((portfolio) => {
          const twitterHandle = extractTwitterHandle(portfolio.twitter)
          const linkedInHandle = extractLinkedInHandle(portfolio.linkedin)

          return (
            <Card key={portfolio.id} className="group overflow-hidden transition-shadow hover:shadow-md">
              <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-muted/30">
                {portfolio.screenshotUrl ? (
                  <img
                    src={portfolio.screenshotUrl}
                    alt={portfolio.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex h-full w-full items-center justify-center text-muted-foreground">
                    No preview
                  </div>
                )}
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="line-clamp-1 text-lg">{portfolio.name}</CardTitle>
                <CardDescription className="line-clamp-1">
                  <Link
                    href={portfolio.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    {portfolio.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    <ExternalLink className="size-3" />
                  </Link>
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-wrap gap-2 pt-0">
                {twitterHandle ? (
                  <Badge variant="outline" asChild>
                    <Link
                      href={portfolio.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5"
                    >
                      <Twitter className="size-3" />
                      @{twitterHandle}
                    </Link>
                  </Badge>
                ) : portfolio.twitter ? (
                  <Badge variant="outline" asChild>
                    <Link
                      href={portfolio.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      <Twitter className="size-3" />
                    </Link>
                  </Badge>
                ) : null}
                {linkedInHandle ? (
                  <Badge variant="outline" asChild>
                    <Link
                      href={portfolio.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5"
                    >
                      <Linkedin className="size-3" />
                      {linkedInHandle}
                    </Link>
                  </Badge>
                ) : portfolio.linkedin ? (
                  <Badge variant="outline" asChild>
                    <Link
                      href={portfolio.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      <Linkedin className="size-3" />
                    </Link>
                  </Badge>
                ) : null}
              </CardFooter>
            </Card>
          )
        })}
      </div>
      {portfolios.length === 0 && (
        <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed bg-muted/20 p-12">
          <div className="text-center">
            <p className="text-lg font-medium text-muted-foreground">No portfolios yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Add your first portfolio to get started</p>
          </div>
        </div>
      )}
    </div>
  )
}
