import { Navigation } from "../nav/Navigation";

const Services = () => {
  return (
    <div className="min-h-screen bg-red-50 text-base-content">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-red-900 mb-4">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base-content/70 text-sm sm:text-base">
            Everything you need to keep bugs under control, projects on track,
            and teams aligned—from a single, powerful dashboard.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="card bg-base-100/90 border border-base-300 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Bug Tracking</h2>
              <p className="text-sm text-base-content/80">
                Capture, categorize, and prioritize issues across multiple
                projects with clear ownership and status updates.
              </p>
            </div>
          </div>

          <div className="card bg-base-100/90 border border-base-300 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Project Insights</h2>
              <p className="text-sm text-base-content/80">
                Get a high-level view of project health with dashboards that
                summarize open bugs, progress, and risk areas.
              </p>
            </div>
          </div>

          <div className="card bg-base-100/90 border border-base-300 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Collaboration</h2>
              <p className="text-sm text-base-content/80">
                Use comments and discussions on each bug to keep context,
                decisions, and history in one place.
              </p>
            </div>
          </div>

          <div className="card bg-base-100/90 border border-base-300 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Role-Based Access</h2>
              <p className="text-sm text-base-content/80">
                Give admins, developers, and testers the right level of access
                while keeping your workspace secure.
              </p>
            </div>
          </div>

          <div className="card bg-base-100/90 border border-base-300 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Activity Dashboards</h2>
              <p className="text-sm text-base-content/80">
                Monitor trends such as new bugs, resolved issues, and recent
                comments to understand how your team is performing.
              </p>
            </div>
          </div>

          <div className="card bg-base-100/90 border border-base-300 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Flexible Workflow</h2>
              <p className="text-sm text-base-content/80">
                Adapt Bug Hunter to your existing development workflow instead
                of forcing your team to change how they work.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Services;


