import { Navigation } from "../nav/Navigation";
import {
  useGetAllBugsQuery,
  useGetProjectsQuery,
  useGetCommentsQuery,
} from "../../features/api/bugsProjectsCommentsAPI";

const UserDashboard = () => {
  const {
    data: bugs,
    isLoading: bugsLoading,
    isError: bugsError,
  } = useGetAllBugsQuery();
  const {
    data: projects,
    isLoading: projectsLoading,
    isError: projectsError,
  } = useGetProjectsQuery();
  const {
    data: comments,
    isLoading: commentsLoading,
    isError: commentsError,
  } = useGetCommentsQuery();

  const openBugsCount = bugs?.filter((b) => b.status !== "Closed").length ?? 0;
  const projectsCount = projects?.length ?? 0;
  const commentsCount = comments?.length ?? 0;

  return (
    <div className="min-h-screen bg-base-200">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User Dashboard</h1>
          <p className="text-base-content/70">
            Welcome back! From here you can quickly access your bugs, projects, and
            conversations.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <article className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">My Bugs</h2>
              <p className="text-sm text-base-content/70">
                View and manage bugs you have reported or are assigned to you.
              </p>
              <div className="card-actions justify-end mt-4">
                <a href="/bugs" className="btn btn-primary btn-sm">
                  Go to Bugs
                </a>
              </div>
            </div>
          </article>

          <article className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">Projects</h2>
              <p className="text-sm text-base-content/70">
                Explore active projects, their timelines, and related issues.
              </p>
              <div className="card-actions justify-end mt-4">
                <a href="/projects" className="btn btn-primary btn-sm">
                  Go to Projects
                </a>
              </div>
            </div>
          </article>

          <article className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">Comments</h2>
              <p className="text-sm text-base-content/70">
                Catch up on the latest discussions around bugs and projects.
              </p>
              <div className="card-actions justify-end mt-4">
                <a href="/comments" className="btn btn-primary btn-sm">
                  Go to Comments
                </a>
              </div>
            </div>
          </article>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">Activity Overview</h2>
              <p className="text-sm text-base-content/70 mb-4">
                Live statistics from your bug tracking backend.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="stat bg-base-200 rounded-box">
                  <div className="stat-title">Open Bugs</div>
                  <div className="stat-value text-primary">
                    {bugsLoading ? "…" : openBugsCount}
                  </div>
                  {bugsError && (
                    <div className="stat-desc text-xs text-error">
                      Failed to load bugs
                    </div>
                  )}
                </div>
                <div className="stat bg-base-200 rounded-box">
                  <div className="stat-title">Active Projects</div>
                  <div className="stat-value text-secondary">
                    {projectsLoading ? "…" : projectsCount}
                  </div>
                  {projectsError && (
                    <div className="stat-desc text-xs text-error">
                      Failed to load projects
                    </div>
                  )}
                </div>
                <div className="stat bg-base-200 rounded-box">
                  <div className="stat-title">Recent Comments</div>
                  <div className="stat-value text-accent">
                    {commentsLoading ? "…" : commentsCount}
                  </div>
                  {commentsError && (
                    <div className="stat-desc text-xs text-error">
                      Failed to load comments
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <aside className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">Quick Actions</h2>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/bugs" className="link link-primary">
                    Report a new bug
                  </a>
                </li>
                <li>
                  <a href="/projects" className="link link-primary">
                    Create a new project
                  </a>
                </li>
                <li>
                  <a href="/comments" className="link link-primary">
                    Join a discussion
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;


