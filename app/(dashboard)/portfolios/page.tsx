"use client";

/* eslint-disable @next/next/no-img-element */
import { usePortfoliosStore } from "@/store/portfolios"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Twitter, Linkedin, ExternalLink } from "lucide-react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

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

const ITEMS_PER_PAGE = 15

export default function Page() {
  const getPortfolios = usePortfoliosStore((state) => state.getPortfolios)
  const portfolios = usePortfoliosStore((state) => state.portfolios)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getPortfolios();
  }, [getPortfolios])

  const totalPages = Math.ceil(portfolios.length / ITEMS_PER_PAGE)

  // Ensure current page is within valid range (clamp to valid page)
  const validPage = totalPages > 0 ? Math.min(Math.max(1, currentPage), totalPages) : 1
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentPortfolios = portfolios.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (validPage <= 3) {
        // Near the start
        for (let i = 2; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("ellipsis")
        pages.push(totalPages)
      } else if (validPage >= totalPages - 2) {
        // Near the end
        pages.push("ellipsis")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // In the middle
        pages.push("ellipsis")
        for (let i = validPage - 1; i <= validPage + 1; i++) {
          pages.push(i)
        }
        pages.push("ellipsis")
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="relative flex flex-1 flex-col gap-4 p-4 sm:p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
      >
        <span className="rotate-[-30deg] text-[12vw] font-black uppercase text-secondary/10 dark:text-primary/5">
          Showcase
        </span>
      </div>
      <div className="grid auto-rows-min gap-4 sm:grid-cols-2 xl:grid-cols-3 z-10">
        {currentPortfolios.map((portfolio) => {
          const twitterHandle = extractTwitterHandle(portfolio.twitter)
          const linkedInHandle = extractLinkedInHandle(portfolio.linkedin)

          return (
            <Card key={portfolio.id} className="group max-w-xs w-full overflow-hidden p-0 pb-6 transition-shadow hover:shadow-md z-10">
              <div className="relative aspect-video w-full overflow-hidden bg-muted/30">
                {portfolio.screenshotUrl ? (
                  <img
                    src={portfolio.screenshotUrl}
                    alt={portfolio.name}
                    className="absolute h-full w-full transition-transform"
                  />
                ) : (
                  <div className="absolute inset-0 flex h-full w-full items-center justify-center text-muted-foreground">
                    No preview
                  </div>
                )}
              </div>
              <CardHeader className="pb-1">
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
                      {twitterHandle}
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
        <div className="z-10 flex flex-1 items-center justify-center rounded-xl border border-dashed bg-muted/20 p-12">
          <div className="text-center">
            <p className="text-lg font-medium text-muted-foreground">No portfolios yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Add your first portfolio to get started</p>
          </div>
        </div>
      )}
      {portfolios.length > ITEMS_PER_PAGE && (
        <div className="z-10 mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) {
                      handlePageChange(currentPage - 1)
                    }
                  }}
                  className={
                    validPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              {getPageNumbers().map((page, index) => {
                if (page === "ellipsis") {
                  return (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                }
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        handlePageChange(page)
                      }}
                      isActive={validPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) {
                      handlePageChange(currentPage + 1)
                    }
                  }}
                  className={
                    validPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
