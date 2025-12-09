import { useState, useEffect } from 'react';
import { Navigation } from '../../../nav/Navigation';
import {
  useGetAllBugsQuery,
  useGetProjectsQuery,
  useCreateBugMutation,
  useUpdateBugMutation,
  useDeleteBugMutation,
} from '../../../../features/api/bugsProjectsCommentsAPI';
import { useSelector } from 'react-redux';

type TBug = {
  bugid?: number;
  project_id: any;
  reported_by: number;
  assigned_to?: number | null;
  title: string;
  description?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  created_at?: Date;
  updated_at?: Date;
};

export default function Bugs() {
  const [formData, setFormData] = useState<Partial<TBug>>({
    title: '',
    description: '',
    severity: 'low',
    project_id: '',
    reported_by: 0,
    status: 'open',
  });
  const [editingBug, setEditingBug] = useState<TBug | null>(null);

  const { data: bugs = [], isLoading: bugsLoading, error: bugsError, refetch } = useGetAllBugsQuery();
  const { data: projects = [] } = useGetProjectsQuery();
  const [createBug, { isLoading: creating }] = useCreateBugMutation();
  const [updateBug, { isLoading: updating }] = useUpdateBugMutation();
  const [deleteBug, { isLoading: deleting }] = useDeleteBugMutation();

  const authState = useSelector((state: any) => state.auth);
  const currentUserId = authState?.user?.userid || 1; // Fallback to 1 if not available

  useEffect(() => {
    if (currentUserId) {
      setFormData(prev => ({ ...prev, reported_by: currentUserId }));
    }
  }, [currentUserId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBug && editingBug.bugid) {
        await updateBug({ id: editingBug.bugid, bug: formData }).unwrap();
        setEditingBug(null);
      } else {
        await createBug(formData).unwrap();
      }
      setFormData({
        bugid: undefined,
        title:'string',
        assigned_to: null,
        description: '',
        severity: 'low',
        project_id: '',
        reported_by: currentUserId,
        status: 'open',
        updated_at: undefined,
      });
      refetch();
    } catch (error: any) {
      console.error('Error saving bug:', error);
      alert(error?.data?.error || 'Failed to save bug');
    }
  };

  const handleEdit = (bug: TBug) => {
    setEditingBug(bug);
    setFormData({
      title: bug.title,
      description: bug.description || '',
      severity: bug.severity,
      project_id: bug.project_id,
      reported_by: bug.reported_by,
      status: bug.status,
    });
  };

  const handleDelete = async (bugId: number) => {
    if (window.confirm('Are you sure you want to delete this bug?')) {
      try {
        await deleteBug(bugId).unwrap();
        refetch();
      } catch (error: any) {
        console.error('Error deleting bug:', error);
        alert(error?.data?.error || 'Failed to delete bug');
      }
    }
  };

  const getSeverityBadge = (severity: string) => {
    const badges: Record<string, string> = {
      low: 'badge-success',
      medium: 'badge-warning',
      high: 'badge-error',
      critical: 'badge-error',
    };
    return badges[severity] || 'badge-ghost';
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      open: 'badge-info',
      in_progress: 'badge-warning',
      resolved: 'badge-success',
      closed: 'badge-ghost',
    };
    return badges[status] || 'badge-ghost';
  };

  return (
    <div>
      <Navigation />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Bugs Management</h1>

        {/* Hero Section */}
        <div className="hero bg-base-200 rounded-box mb-6">
          <div className="hero-content flex-col lg:flex-row">
            <div>
              <h1 className="text-5xl font-bold">Track & Manage Bugs</h1>
              <p className="py-6">
                Report, track, and resolve bugs efficiently with our comprehensive bug tracking system.
              </p>
            </div>
          </div>
        </div>

        {/* Add/Edit Bug Form */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h2 className="card-title">{editingBug ? 'Edit Bug' : 'Report a Bug'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title *</span>
                </label>
                <input
                  type="text"
                  placeholder="Bug title"
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
                  placeholder="Describe the bug"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label" htmlFor="severity">
                    <span className="label-text">Severity *</span>
                  </label>
                  <select
                    id="severity"
                    className="select select-bordered"
                    value={formData.severity}
                    onChange={(e) => setFormData({ ...formData, severity: e.target.value as any })}
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
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
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
              <div className="form-control">
                <label className="label" htmlFor="project">
                  <span className="label-text">Project *</span>
                </label>
                <select
                  id="project"
                  className="select select-bordered"
                  value={formData.project_id}
                  onChange={(e) => setFormData({ ...formData, project_id: parseInt(e.target.value) })}
                  required
                >
                  <option value={0}>Select project</option>
                  {projects.map((project) => (
                    <option key={project.project_id} value={project.project_id}>
                      {project.title || project.project_name || `Project ${project.project_id}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={creating || updating}
                >
                  {creating || updating ? 'Saving...' : editingBug ? 'Update Bug' : 'Submit Bug'}
                </button>
                {editingBug && (
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => {
                      setEditingBug(null);
                      setFormData({
                        title: '',
                        description: '',
                        severity: 'low',
                        project_id: '',
                        reported_by: currentUserId,
                        status: 'open',
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

        {/* Bugs List */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Reported Bugs</h2>
            {bugsLoading && <div className="loading loading-spinner loading-lg"></div>}
            {bugsError && (
              <div className="alert alert-error">
                <span>Error loading bugs. Please try again.</span>
              </div>
            )}
            {!bugsLoading && !bugsError && (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Severity</th>
                      <th>Status</th>
                      <th>Project ID</th>
                      <th>Actions</th>
                      <th>ProjectID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bugs.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8">
                          No bugs found. Create your first bug!
                        </td>
                      </tr>
                    ) : (
                      bugs.map((bug) => (
                        <tr key={bug.bugid}>
                          <th>{bug.bugid}</th>
                          <td className="font-semibold">{bug.title}</td>
                          <td className="max-w-xs truncate">{bug.description || 'No description'}</td>
                          <td>
                            <span className={`badge ${getSeverityBadge(bug.severity)}`}>
                              {bug.severity.toUpperCase()}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${getStatusBadge(bug.status)}`}>
                              {bug.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </td>
                          <td>{bug.project_id}</td>
                          <td>
                            <div className="flex gap-2">
                              <button
                                className="btn btn-sm btn-outline"
                                onClick={() => handleEdit(bug)}
                                disabled={deleting}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline btn-error"
                                onClick={() => bug.bugid && handleDelete(bug.bugid)}
                                disabled={deleting}
                              >
                                {deleting ? 'Deleting...' : 'Delete'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
