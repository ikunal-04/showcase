import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutGrid, Plus, Briefcase, Users, Star, TrendingUp } from "lucide-react";
import { Navbar } from "@/components/nav";
import ScrollContext from "@/providers/scroll-context";

export default function Home() {
    return (
        <ScrollContext>
            <div className="min-h-screen">
                <nav>
                    <Navbar />
                </nav>
                {/* Hero Section */}
                <section className="container mx-auto px-4 py-20 md:py-32">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Star className="h-4 w-4" />
                            <span>Professional Portfolio Hub</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                            Showcase Your Work,
                            <br />
                            <span className="text-primary">Get Discovered</span>
                        </h1>

                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            A single place where talented professionals showcase their portfolios,
                            and employers find the perfect candidates for their teams.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="text-lg">
                                <Link href="/portfolios">
                                    <LayoutGrid className="mr-2 h-5 w-5" />
                                    Browse Portfolios
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="text-lg">
                                <Link href="/setup">
                                    <Plus className="mr-2 h-5 w-5" />
                                    Add Your Portfolio
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="container mx-auto px-4 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Showcase?</h2>
                        <p className="text-muted-foreground text-lg">
                            Connect talent with opportunity in one centralized platform
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <Card className="border-2">
                            <CardHeader>
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <Users className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle>For Job Seekers</CardTitle>
                                <CardDescription>
                                    Create a stunning portfolio that showcases your skills, projects, and experience.
                                    Stand out to potential employers and get noticed.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="border-2">
                            <CardHeader>
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <Briefcase className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle>For Employers</CardTitle>
                                <CardDescription>
                                    Browse through verified portfolios of talented professionals.
                                    Filter by skills, experience, and projects to find your ideal candidate.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="border-2">
                            <CardHeader>
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <TrendingUp className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle>Easy to Use</CardTitle>
                                <CardDescription>
                                    Simple and intuitive interface. Add your portfolio in minutes,
                                    search and filter efficiently, and connect directly with opportunities.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="container mx-auto px-4 py-16 mb-16">
                    <Card className="text-primary border-0 overflow-hidden relative">
                        <div className="absolute inset-0" />
                        <CardContent className="relative p-12 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Ready to Get Started?
                            </h2>
                            <p className="text-lg mb-8 text-primary/90 max-w-2xl mx-auto">
                                Join hundreds of professionals already showcasing their work on Portfolio Hub.
                                Create your portfolio today and unlock new opportunities.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg" variant="secondary" className="text-lg">
                                    <Link href="/setup">
                                        <Plus className="mr-2 h-5 w-5" />
                                        Create Your Portfolio
                                    </Link>
                                </Button>
                                <Button asChild size="lg" variant="outline" className="text-lg bg-transparent border-primary text-primary hover:bg-primary-foreground hover:text-primary">
                                    <Link href="/portfolios">
                                        Explore Portfolios
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </ScrollContext>
    );
}