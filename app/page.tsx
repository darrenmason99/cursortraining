'use client';

import Link from "next/link"
import Image from "next/image"
import { Github, BarChart3, GitPullRequest, Star, GitBranch, ArrowRight, Check } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const { data: session, status } = useSession();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Github className="h-6 w-6" />
            <span className="text-xl font-bold">Dandi</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {status === "authenticated" ? (
              <>
                <div className="flex items-center gap-2">
                  {session.user?.image && (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User avatar"}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                  <span className="text-sm font-medium">{session.user?.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: '/' })}>
                  Sign out
                </Button>
                <Link href="/dashboards">
                  <Button size="sm">Dashboard</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 hover:from-pink-500 hover:to-purple-500 transition-all duration-200 rounded-lg px-5 font-bold shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Unlock the power of GitHub repositories
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Get valuable insights, summaries, and analytics for any open source GitHub repository. Track stars,
                    pull requests, and version updates.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  {status === "authenticated" ? (
                    <Link href="/dashboards">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 hover:from-pink-500 hover:to-purple-500 transition-all duration-200 rounded-lg px-6 font-bold shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-400 gap-1.5"
                      >
                        Go to Dashboard
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/auth/signin">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 hover:from-pink-500 hover:to-purple-500 transition-all duration-200 rounded-lg px-6 font-bold shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-400 gap-1.5"
                      >
                        Get started for free
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  <Link href="#how-it-works">
                    <Button size="lg" variant="outline">
                      See how it works
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl border bg-background p-4 shadow-xl">
                  <div className="flex items-center gap-2 border-b pb-4">
                    <Github className="h-5 w-5" />
                    <div className="text-sm font-medium">react/react</div>
                  </div>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <div className="text-lg font-semibold">Repository Summary</div>
                      <p className="text-sm text-muted-foreground">
                        React is a JavaScript library for building user interfaces. Declarative, component-based, and
                        learn-once-write-anywhere.
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="rounded-lg border p-2">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <div className="text-sm font-medium">Stars</div>
                        </div>
                        <div className="text-xl font-bold">212.5k</div>
                      </div>
                      <div className="rounded-lg border p-2">
                        <div className="flex items-center gap-2">
                          <GitPullRequest className="h-4 w-4 text-blue-500" />
                          <div className="text-sm font-medium">PRs</div>
                        </div>
                        <div className="text-xl font-bold">14.2k</div>
                      </div>
                      <div className="rounded-lg border p-2">
                        <div className="flex items-center gap-2">
                          <GitBranch className="h-4 w-4 text-green-500" />
                          <div className="text-sm font-medium">Version</div>
                        </div>
                        <div className="text-xl font-bold">v18.2.0</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Recent Activity</div>
                      <div className="space-y-2">
                        <div className="rounded-lg border p-2">
                          <div className="flex items-center gap-2">
                            <GitPullRequest className="h-4 w-4" />
                            <div className="text-xs">Fix concurrent mode rendering bug</div>
                          </div>
                        </div>
                        <div className="rounded-lg border p-2">
                          <div className="flex items-center gap-2">
                            <GitPullRequest className="h-4 w-4" />
                            <div className="text-xs">Add new hooks documentation</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Powerful GitHub Analytics</h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Dandi provides deep insights into any GitHub repository, helping you understand trends, activity, and
                important updates.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:gap-8 mt-12">
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold">Repository Insights</h3>
                  <p className="text-muted-foreground">
                    Get comprehensive summaries and statistics about any GitHub repository.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold">Star Tracking</h3>
                  <p className="text-muted-foreground">
                    Monitor star growth and trends to understand repository popularity.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <GitPullRequest className="h-6 w-6 text-primary" />
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold">PR Analysis</h3>
                  <p className="text-muted-foreground">
                    Track important pull requests and understand contribution patterns.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <GitBranch className="h-6 w-6 text-primary" />
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold">Version Updates</h3>
                  <p className="text-muted-foreground">Stay informed about new releases and version changes.</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold">Contribution Metrics</h3>
                  <p className="text-muted-foreground">Analyze contributor activity and community engagement.</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m16 10-4 4-4-4" />
                  </svg>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold">Custom Alerts</h3>
                  <p className="text-muted-foreground">
                    Set up notifications for important repository events and changes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">How Dandi Works</h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Get started in minutes and gain valuable insights into any GitHub repository.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Dashboard preview"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Sign up for free</h3>
                      <p className="text-muted-foreground">Create your account in seconds, no credit card required.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Connect repositories</h3>
                      <p className="text-muted-foreground">Add any public GitHub repository you want to analyze.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Get instant insights</h3>
                      <p className="text-muted-foreground">View comprehensive analytics and summaries immediately.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Monitor and track</h3>
                      <p className="text-muted-foreground">Set up alerts and track changes over time.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Simple, Transparent Pricing</h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Start for free, upgrade as you grow. No hidden fees or surprises.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">Free</h3>
                    <p className="text-muted-foreground">For individuals and hobbyists</p>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>5 repositories</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Daily updates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Link href="/auth/signin">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-6 shadow-lg">
                <div className="absolute right-0 top-0 p-1">
                  <div className="rounded-l-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Popular
                  </div>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">Pro</h3>
                    <p className="text-muted-foreground">For professionals and teams</p>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$19</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>25 repositories</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Hourly updates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Custom alerts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Link href="/auth/signin">
                  <Button className="w-full">Start 14-day Trial</Button>
                </Link>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">Enterprise</h3>
                    <p className="text-muted-foreground">For large organizations</p>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Unlimited repositories</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Enterprise analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Real-time updates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Advanced integrations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Dedicated support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Custom reporting</span>
                  </li>
                </ul>
                <Link href="/contact">
                  <Button className="w-full" variant="outline">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to unlock GitHub insights?
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  Join thousands of developers who use Dandi to understand GitHub repositories better.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                {status === "authenticated" ? (
                  <Link href="/dashboards">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 hover:from-pink-500 hover:to-purple-500 transition-all duration-200 rounded-lg px-6 font-bold shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-400 gap-1.5"
                    >
                      Go to Dashboard
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/auth/signin">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 hover:from-pink-500 hover:to-purple-500 transition-all duration-200 rounded-lg px-6 font-bold shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-400 gap-1.5"
                    >
                      Get started for free
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Contact sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2">
            <Github className="h-6 w-6" />
            <span className="text-lg font-bold">Dandi</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4">
              Cookies
            </Link>
          </nav>
          <div className="flex items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Dandi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
