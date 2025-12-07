import { useState } from 'react';
import { Navigation } from '../../../nav/Navigation';
import {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateBugMutation,
} from '../../../../features/api/bugsProjectsCommentsAPI';
import { useSelector } from 'react-redux';

type TProject = {
  projectid?: number;
  title: string;
  description?: string;
  status?: 'active' | 'on-hold' | 'completed' | 'archived';
};

export default function Projects() {
  const [formData, setFormData] = useState<TProject>({
    title: '',
    description: '',
    status: 'active',
  });
  const [editingProject, setEditingProject] = useState<TProject | null>(null);

  const { data: projects = [], isLoading: projectsLoading, error: projectsError, refetch } = useGetProjectsQuery();
  const [createProject, { isLoading: creating }] = useCreateProjectMutation();

  const authState = useSelector((state: any) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject && editingProject.projectid) {
        // Update would need updateProject mutation - for now just create
        alert('Update functionality coming soon');
        setEditingProject(null);
      } else {
        await createProject(formData).unwrap();
      }
      setFormData({
        title: '',
        description: '',
        status: 'active',
      });
      refetch();
    } catch (error: any) {
      console.error('Error saving project:', error);
      alert(error?.data?.error || error?.message || 'Failed to save project');
    }
  };

  const handleEdit = (project: TProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title || '',
      description: project.description || '',
      status: project.status || 'active',
    });
  };

  const getStatusBadge = (status?: string) => {
    const badges: Record<string, string> = {
      active: 'badge-success',
      'on-hold': 'badge-warning',
      completed: 'badge-info',
      archived: 'badge-ghost',
    };
    return badges[status || 'active'] || 'badge-ghost';
  };

  return (
    <div>
      <Navigation />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Projects Management</h1>

        {/* Create Project Form */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h2 className="card-title">{editingProject ? 'Edit Project' : 'Create New Project'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Project Name *</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter project name"
                  className="input input-bordered"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Project description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="status">
                  <span className="label-text">Status *</span>
                </label>
                <select
                  id="status"
                  className="select select-bordered"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  required
                >
                  <option value="active">Active</option>
                  <option value="on-hold">On Hold</option>
                  <option value="completed">Completed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={creating}
                >
                  {creating ? 'Creating...' : editingProject ? 'Update Project' : 'Create Project'}
                </button>
                {editingProject && (
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => {
                      setEditingProject(null);
                      setFormData({
                        title: '',
                        description: '',
                        status: 'active',
                      });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Projects List */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">All Projects</h2>
            {projectsLoading && <div className="loading loading-spinner loading-lg"></div>}
            {projectsError && (
              <div className="alert alert-error">
                <span>Error loading projects. Please try again.</span>
              </div>
            )}
            {!projectsLoading && !projectsError && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.length === 0 ? (
                  <div className="col-span-full text-center py-8">
                    <p>No projects found. Create your first project!</p>
                  </div>
                ) : (
                  projects.map((project) => (
                    <div key={project.projectid} className="card bg-base-200 shadow-md">
                      <div className="card-body">
                        <h3 className="card-title text-lg">{project.title || project.project_name || `Project ${project.projectid}`}</h3>
                        <p className="text-sm line-clamp-3">
                          {project.description || 'No description available'}
                        </p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold">Status:</span>
                          <span className={`badge ${getStatusBadge(project.status as any)}`}>
                            {(project.status || 'active').replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div className="card-actions justify-end">
                          <button
                            className="btn btn-sm btn-outline"
                            onClick={() => handleEdit(project)}
                          >
                            View
                          </button>
                          <button
                            className="btn btn-sm btn-outline"
                            onClick={() => handleEdit(project)}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
