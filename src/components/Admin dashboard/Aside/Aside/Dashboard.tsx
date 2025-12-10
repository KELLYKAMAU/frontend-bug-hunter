import { useState } from 'react'
import Bugs from '../content/Bugs'
import Comments from '../content/Comments'
import Projects from '../content/Projects'
import AdminProfile from '../content/Adminprofile'
import {
  useGetAllBugsQuery,
  useGetProjectsQuery,
  useGetCommentsQuery,
} from '../../../../features/api/bugsProjectsCommentsAPI'

export const Admindashboard = () => {
  const [activeView, setActiveView] = useState<'profile' | 'comments' | 'bugs' | 'projects' | 'homepage'>('homepage')
  
  const { data: bugs = [], isLoading: bugsLoading } = useGetAllBugsQuery()
  const { data: projects = [] } = useGetProjectsQuery()
  const { data: comments = [] } = useGetCommentsQuery()

  const stats = {
    totalBugs: bugs.length,
    openBugs: bugs.filter(b => b.status === 'open').length,
    in_progressBugs: bugs.filter(b => b.status === 'in_progress').length,
    resolvedBugs: bugs.filter(b => b.status === 'resolved' ).length,
    closedBugs: bugs.filter(b => b.status === 'closed').length,
    totalProjects: projects.length,
    activeProjects: projects.filter(p => (p.status as any) === 'active').length,
    totalComments: comments.length,
  }

  const renderContent = () => {
    switch (activeView) {
      case 'profile':
        return <AdminProfile />
      case 'comments':
        return <Comments />
      case 'bugs':
        return <Bugs />
      case 'projects':
        return <Projects />
      case 'homepage':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold mb-2 text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600 mb-8">Welcome! Manage your bug tracking system from here.</p>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="card bg-white shadow-lg">
                  <div className="card-body">
                    <h2 className="card-title text-blue-600">Total Bugs</h2>
                    <p className="text-3xl font-bold">{stats.totalBugs}</p>
                    <div className="text-sm text-gray-500">
                      {stats.openBugs} open, {stats.resolvedBugs} resolved
                    </div>
                  </div>
                </div>
                <div className="card bg-white shadow-lg">
                  <div className="card-body">
                    <h2 className="card-title text-green-600">Active Projects</h2>
                    <p className="text-3xl font-bold">{stats.activeProjects}</p>
                    <div className="text-sm text-gray-500">
                      {stats.totalProjects} total projects
                    </div>
                  </div>
                </div>
                <div className="card bg-white shadow-lg">
                  <div className="card-body">
                    <h2 className="card-title text-purple-600">Comments</h2>
                    <p className="text-3xl font-bold">{stats.totalComments}</p>
                    <div className="text-sm text-gray-500">
                      Total comments across all bugs
                    </div>
                  </div>
                </div>
                <div className="card bg-white shadow-lg">
                  <div className="card-body">
                    <h2 className="card-title text-orange-600">In Progress</h2>
                    <p className="text-3xl font-bold">{stats.in_progressBugs}</p>
                    <div className="text-sm text-gray-500">
                      Bugs currently being worked on
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setActiveView('bugs')}>
                  <div className="card-body">
                    <h3 className="card-title text-xl">Manage Bugs</h3>
                    <p className="text-gray-600">View, create, and manage all bugs in the system</p>
                    <div className="card-actions justify-end mt-4">
                      <button className="btn btn-primary">Go to Bugs</button>
                    </div>
                  </div>
                </div>
                <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setActiveView('projects')}>
                  <div className="card-body">
                    <h3 className="card-title text-xl">Manage Projects</h3>
                    <p className="text-gray-600">Create and manage projects for your team</p>
                    <div className="card-actions justify-end mt-4">
                      <button className="btn btn-primary">Go to Projects</button>
                    </div>
                  </div>
                </div>
                <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setActiveView('comments')}>
                  <div className="card-body">
                    <h3 className="card-title text-xl">View Comments</h3>
                    <p className="text-gray-600">Monitor and manage comments across all bugs</p>
                    <div className="card-actions justify-end mt-4">
                      <button className="btn btn-primary">Go to Comments</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-8 card bg-white shadow-lg">
                <div className="card-body">
                  <h2 className="card-title mb-4">Recent Activity</h2>
                  {bugsLoading ? (
                    <div className="loading loading-spinner"></div>
                  ) : (
                    <div className="space-y-2">
                      {bugs.slice(0, 5).map((bug) => (
                        <div key={bug.bugid} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <span className="font-semibold">{bug.title}</span>
                            <span className={`badge ml-2 ${bug.status === 'open' ? 'badge-info' : 'badge-success'}`}>
                              {bug.status}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">Severity: {bug.severity}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return <AdminProfile />
    }
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content min-h-screen w-full">
        <nav className="navbar w-full bg-base-300 shadow-md">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
          </label>
          <div className="px-4 font-bold text-lg">Admin Dashboard</div>
        </nav>
        {renderContent()}
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 w-64">
          <ul className="menu w-full grow p-4">
            <li>
              <button 
                className={activeView === 'homepage' ? 'active' : ''} 
                onClick={() => setActiveView('homepage')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                Home
              </button>
            </li>
            <li>
              <button 
                className={activeView === 'profile' ? 'active' : ''} 
                onClick={() => setActiveView('profile')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                Profile
              </button>
            </li>
            <li>
              <button 
                className={activeView === 'bugs' ? 'active' : ''} 
                onClick={() => setActiveView('bugs')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                Bugs
              </button>
            </li>
            <li>
              <button 
                className={activeView === 'projects' ? 'active' : ''} 
                onClick={() => setActiveView('projects')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                Projects
              </button>
            </li>
            <li>
              <button 
                className={activeView === 'comments' ? 'active' : ''} 
                onClick={() => setActiveView('comments')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                Comments
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
