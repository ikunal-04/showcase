import Link from "next/link"
import { CalendarClock, LineChart, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const highlights = [
    {
        title: "Live metrics",
        description: "Track how often your portfolio gets discovered and viewed in real time.",
        Icon: LineChart,
    },
    {
        title: "Milestone alerts",
        description: "Get nudges when you hit key achievements or trending moments.",
        Icon: Sparkles,
    },
    {
        title: "Launch timeline",
        description: "Follow the roadmap toward the analytics release and what’s coming next.",
        Icon: CalendarClock,
    },
]

export default function AnalyticsPlaceholderPage() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-10 p-8 text-center">
            <div className="flex flex-col items-center gap-3">
                <Badge variant="outline" className="uppercase tracking-wider text-xs">
                    Coming soon
                </Badge>
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                    Analytics are on the way
                </h1>
                <p className="max-w-xl text-balance text-muted-foreground">
                    We&apos;re crafting a focused analytics hub to surface performance trends, showcase
                    momentum, and keep your portfolio storytelling sharp. Stay tuned for the first release.
                </p>
            </div>

            <div className="grid w-full max-w-4xl gap-4 md:grid-cols-3">
                {highlights.map(({ title, description, Icon }) => (
                    <Card key={title} className="h-full text-left">
                        <CardHeader className="flex flex-row items-start gap-3">
                            <div className="rounded-full border bg-muted/40 p-2">
                                <Icon className="size-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-base font-semibold">{title}</CardTitle>
                                <CardDescription>{description}</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>

            <Card className="w-full max-w-xl border-dashed bg-muted/20 text-left">
                <CardHeader>
                    <CardTitle>Want an early peek?</CardTitle>
                    <CardDescription>
                        Add your portfolio today and we&apos;ll notify you the moment analytics goes live.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Early access spots will roll out to creators who are already part of the showcase.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button asChild>
                        <Link href="/setup">Submit your portfolio</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

