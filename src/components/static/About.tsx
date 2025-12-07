import { Navigation } from "../nav/Navigation";

const About = () => {
  return (
    <div className="min-h-screen bg-red-50 text-base-content">
      <Navigation />

      <main className="relative container mx-auto px-4 py-16">
        {/* Glow background */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
          <div className="absolute -top-32 left-10 h-64 w-64 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-secondary blur-3xl" />
        </div>

        <section className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-red-900">
              About <span className="text-primary">Bug Hunter</span>
            </h1>
            <p className="mb-4 text-base-content/80 max-w-xl">
              Bug Hunter is a modern, collaborative bug tracking platform built
              for product teams that care about quality. From the first report
              to final resolution, we keep every issue organized, visible, and
              actionable.
            </p>
            <p className="text-base-content/70 max-w-xl">
              With role-based access for admins, developers, and testers, Bug
              Hunter creates a single source of truth for issues across your
              projects. Real-time dashboards, contextual comments, and clear
              workflows help your team ship stable, reliable software faster.
            </p>
          </div>

          <div className="space-y-4">
            <div className="card bg-base-100/90 shadow-xl border border-base-300 backdrop-blur">
              <div className="card-body">
                <h2 className="card-title text-primary mb-2">
                  Our Mission
                </h2>
                <p className="text-sm text-base-content/80">
                  Make bug tracking simple, transparent, and collaborative so
                  teams can focus on building features—not fighting fires.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="card bg-base-100/90 shadow-md border border-base-300">
                <div className="card-body py-4">
                  <h3 className="font-semibold mb-1">For Developers</h3>
                  <p className="text-xs text-base-content/70">
                    Clear priorities, rich context, and fewer surprises during
                    releases.
                  </p>
                </div>
              </div>
              <div className="card bg-base-100/90 shadow-md border border-base-300">
                <div className="card-body py-4">
                  <h3 className="font-semibold mb-1">For Testers</h3>
                  <p className="text-xs text-base-content/70">
                    Structured reporting, fast feedback loops, and traceable
                    resolutions.
                  </p>
                </div>
              </div>
              <div className="card bg-base-100/90 shadow-md border border-base-300">
                <div className="card-body py-4">
                  <h3 className="font-semibold mb-1">For Managers</h3>
                  <p className="text-xs text-base-content/70">
                    High-level visibility into quality, risks, and delivery
                    timelines.
                  </p>
                </div>
              </div>
              <div className="card bg-base-100/90 shadow-md border border-base-300">
                <div className="card-body py-4">
                  <h3 className="font-semibold mb-1">For Teams</h3>
                  <p className="text-xs text-base-content/70">
                    One place to collaborate, discuss trade-offs, and keep
                    everyone aligned.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;


