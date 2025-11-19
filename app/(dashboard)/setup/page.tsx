"use client"

import { useEffect, useMemo, useState } from "react"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { usePortfoliosStore } from "@/store/portfolios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const optionalUrl = z.string().trim()

const formSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, {
            message: "Please add a portfolio name",
        }),
    url: z
        .string()
        .trim()
        .url({
            message: "Share a valid portfolio URL",
        }),
    twitter: optionalUrl,
    linkedin: optionalUrl,
    tag: z.string().min(1, {
        message: "Please select a tag for this portfolio",
    }),
})

type FormValues = z.infer<typeof formSchema>

const PORTFOLIO_TAGS = [
    { value: "fullstack", label: "Full Stack Engineer", color: "bg-blue-500/10 text-blue-700 border-blue-200" },
    { value: "ai", label: "AI Engineer", color: "bg-purple-500/10 text-purple-700 border-purple-200" },
    { value: "backend", label: "Backend Engineer", color: "bg-green-500/10 text-green-700 border-green-200" },
    { value: "frontend", label: "Frontend Engineer", color: "bg-orange-500/10 text-orange-700 border-orange-200" },
    { value: "design", label: "Design Engineer", color: "bg-pink-500/10 text-pink-700 border-pink-200" },
]

const previewMotion = {
    initial: { opacity: 0, y: 12, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 12, scale: 0.98 },
    transition: { duration: 0.24 },
}

export default function SetupPage() {
    const addPortfolio = usePortfoliosStore((state) => state.addPortfolio)

    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [isPreviewLoading, setIsPreviewLoading] = useState(false)
    const [previewError, setPreviewError] = useState<string | null>(null)
    const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle")
    const [submitMessage, setSubmitMessage] = useState<string | null>(null)
    const router = useRouter();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            url: "",
            twitter: "",
            linkedin: "",
            tag: "",
        },
        mode: "onChange",
    })

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { isSubmitting },
        reset,
    } = form

    const watchedUrl = watch("url")

    useEffect(() => {
        if (!watchedUrl?.trim()) {
            setPreviewUrl(null)
            setPreviewError(null)
            return
        }

        let active = true
        // setSubmitState("idle")
        // setSubmitMessage(null)

        const handler = setTimeout(async () => {
            try {
                new URL(watchedUrl)
            } catch {
                if (!active) return
                setPreviewUrl(null)
                setPreviewError("That doesn't look like a valid URL yet.")
                return
            }

            if (!active) return

            setIsPreviewLoading(true)
            setPreviewError(null)

            try {
                const response = await fetch("/api/screenshot", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ url: watchedUrl }),
                })

                if (!active) return

                if (!response.ok) {
                    throw new Error("Screenshot request failed")
                }

                const data = await response.json()
                const rawUrl = data?.message?.response
                const parsedUrl = rawUrl ? JSON.parse(rawUrl) : null

                if (!parsedUrl) {
                    throw new Error("No screenshot available yet")
                }

                setPreviewUrl(parsedUrl)
            } catch (error) {
                console.error(error)
                setPreviewUrl(null)
                setPreviewError("We couldn't capture the preview—try again in a moment.")
            } finally {
                if (active) {
                    setIsPreviewLoading(false)
                }
            }
        }, 600)

        return () => {
            active = false
            clearTimeout(handler)
        }
    }, [watchedUrl, setValue])

    const onSubmit = async (data: FormValues) => {
        try {
            // setSubmitState("idle")
            // setSubmitMessage(null)

            const selectedTag = PORTFOLIO_TAGS.find(t => t.value === data.tag)

            const payload = {
                name: data.name.trim(),
                url: data.url.trim(),
                screenshotUrl: previewUrl ?? "",
                twitter: data.twitter?.trim() ?? "",
                linkedin: data.linkedin?.trim() ?? "",
                tag: selectedTag?.label ?? ""
            }

            await addPortfolio(payload)

            // setSubmitState("success")
            // setSubmitMessage("Portfolio saved. We'll keep the preview handy.")

            toast.success("Portfolio saved. We'll keep the preview handy.")

            reset({
                name: "",
                url: "",
                twitter: "",
                linkedin: "",
                tag: "",
            })
            setPreviewUrl(null)
            router.push("/portfolios")
        } catch (error) {
            console.error(error)
            // setSubmitState("error")
            // setSubmitMessage("Something went wrong while saving. Please try again.")
            toast.error("Something went wrong while saving. Please try again.")
        }
    }

    const disabled = useMemo(
        () => isSubmitting || isPreviewLoading,
        [isSubmitting, isPreviewLoading],
    )

    return (
        <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 items-center justify-center px-4 py-8 md:absolute md:inset-0 md:min-h-0 md:px-0 md:py-0 md:overflow-hidden">
            <Card className="w-full md:max-h-[75vh] md:overflow-y-auto no-scrollbar">
                <CardHeader>
                    <CardTitle className="text-2xl tracking-tight">Portfolio onboarding</CardTitle>
                    <CardDescription>
                        Introduce your portfolio and we&apos;ll prepare its preview, handle, and social
                        links for you.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8">
                            <div className="grid gap-6">
                                <FormField
                                    control={control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                                                Portfolio name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Acme Studio"
                                                    autoComplete="organization"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                What should we call this portfolio across the showcase?
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="url"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                                                Portfolio link
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="https://acmestudio.com"
                                                    inputMode="url"
                                                    autoComplete="url"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Drop in the live site.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="tag"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                                                Portfolio tag
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a tag for this portfolio" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {PORTFOLIO_TAGS.map((tag) => (
                                                        <SelectItem key={tag.value} value={tag.value}>
                                                            <div className="flex items-center gap-2">
                                                                <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium ${tag.color}`}>
                                                                    {tag.label}
                                                                </span>
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>
                                                Choose the category that best describes this portfolio.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <AnimatePresence mode="wait">
                                    {previewUrl && !isPreviewLoading && !previewError ? (
                                        <motion.div
                                            key={previewUrl}
                                            {...previewMotion}
                                            className="mx-auto flex h-[200px] w-full max-w-[350px] items-center justify-center overflow-hidden rounded-xl border bg-muted/20 shadow-inner"
                                        >
                                            <div className="relative aspect-video w-full bg-muted/30">
                                                <motion.img
                                                    src={previewUrl}
                                                    alt="Portfolio preview"
                                                    className="h-full w-full object-fit"
                                                    initial={{ scale: 1.02 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                                />
                                            </div>
                                        </motion.div>
                                    ) : null}
                                </AnimatePresence>
                                {isPreviewLoading ? (
                                    <motion.div {...previewMotion} className="rounded-xl border bg-muted/10 p-4">
                                        <div className="mb-3 text-sm font-medium text-muted-foreground">
                                            Capturing the latest frame…
                                        </div>
                                        <Skeleton className="aspect-video w-full rounded-lg" />
                                    </motion.div>
                                ) : null}
                                {previewError ? (
                                    <Alert variant="destructive">
                                        <AlertTitle>Preview unavailable</AlertTitle>
                                        <AlertDescription>{previewError}</AlertDescription>
                                    </Alert>
                                ) : null}
                                <div className="grid gap-4 md:grid-cols-2">
                                    <FormField
                                        control={control}
                                        name="twitter"
                                        render={({ field }) => (
                                            <FormItem className="grid gap-2">
                                                <FormLabel className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                                                    Twitter (optional)
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="https://x.com/kunlgrg"
                                                        inputMode="url"
                                                        autoComplete="url"
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Add a profile link to spotlight community updates.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={control}
                                        name="linkedin"
                                        render={({ field }) => (
                                            <FormItem className="grid gap-2">
                                                <FormLabel className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                                                    LinkedIn (optional)
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="https://linkedin.com/in/ikunal04"
                                                        inputMode="url"
                                                        autoComplete="url"
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Perfect for highlighting the team behind the work.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <Button type="submit" size="lg" disabled={disabled} className="self-start">
                                    {isSubmitting ? "Saving…" : isPreviewLoading ? "Preparing preview…" : "Add portfolio"}
                                </Button>
                                {submitMessage ? (
                                    <Alert variant={submitState === "error" ? "destructive" : "default"}>
                                        <AlertTitle>
                                            {submitState === "success" ? "All set" : "We hit a snag"}
                                        </AlertTitle>
                                        <AlertDescription>{submitMessage}</AlertDescription>
                                    </Alert>
                                ) : null}
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}