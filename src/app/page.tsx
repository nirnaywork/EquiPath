import HeroIcons from "@/components/HeroIcons";
import AuthCard from "@/components/AuthCard";
import { Compass, Briefcase, Bell } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] w-full pt-16">
        <div className="container mx-auto grid min-h-[80vh] grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* Left Side: Copy & Icons */}
          <div className="relative z-10 flex h-full flex-col justify-center gap-6">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-[5rem] lg:leading-[1.1]">
              Your CS Career, <br />
              <span className="text-accent underline decoration-accent/30 decoration-8 underline-offset-4">Engineered.</span>
            </h1>
            <p className="max-w-xl text-lg text-foreground/70 sm:text-xl">
              Roadmaps. Opportunities. Reminders. <br />
              <span className="font-semibold text-white">All free. Always.</span>
            </p>

            {/* Background floating icons absolute to this container */}
            <div className="absolute inset-0 -z-10 opacity-40 lg:opacity-100 pointer-events-none">
              <HeroIcons />
            </div>
          </div>

          {/* Right Side: Auth Card */}
          <div className="relative z-10 flex items-center justify-center lg:justify-end">
            <AuthCard />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Built for Students, by Students.</h2>
          <p className="text-lg leading-relaxed text-foreground/70">
            EquiPath provides AI-powered custom roadmaps, real internships, and smart deadline reminders.
            There are NO paywalls, NO upgrades, and NO restricted features. 100% free, forever.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="glass group rounded-3xl p-8 transition-colors hover:border-accent/40 hover:bg-card/80">
            <div className="mb-6 inline-flex rounded-2xl bg-accent/10 p-4 text-accent ring-1 ring-accent/20">
              <Compass className="h-8 w-8" />
            </div>
            <h3 className="mb-3 text-xl font-bold">Custom Roadmaps</h3>
            <p className="text-sm text-foreground/60 leading-relaxed">
              AI builds your personalized learning path based on your exact year and domain. Unique projects, structured learning.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass group rounded-3xl p-8 transition-colors hover:border-blue-500/40 hover:bg-card/80">
            <div className="mb-6 inline-flex rounded-2xl bg-blue-500/10 p-4 text-blue-400 ring-1 ring-blue-500/20">
              <Briefcase className="h-8 w-8" />
            </div>
            <h3 className="mb-3 text-xl font-bold">Internships & Jobs</h3>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Real listings matched to your skills and interests. From beginner hackathons to full-time roles.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass group rounded-3xl p-8 transition-colors hover:border-violet-500/40 hover:bg-card/80">
            <div className="mb-6 inline-flex rounded-2xl bg-violet-500/10 p-4 text-violet-400 ring-1 ring-violet-500/20">
              <Bell className="h-8 w-8" />
            </div>
            <h3 className="mb-3 text-xl font-bold">Remind Me</h3>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Set deadline reminders and get emailed exactly one day before the big event via automated scheduling.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
