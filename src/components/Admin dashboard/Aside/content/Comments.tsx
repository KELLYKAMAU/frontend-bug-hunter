import { useState } from 'react';
import { Navigation } from '../../../nav/Navigation';
import {
  useGetCommentsQuery,
  useGetAllBugsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from '../../../../features/api/bugsProjectsCommentsAPI';
import { useSelector } from 'react-redux';

type TComment = {
  bugid: number;
  userid: number;
  content: string;
  timestamp?: Date;
};

export default function Comments() {
  const [formData, setFormData] = useState<Partial<TComment>>({
    bugid: 0,
    userid: 0,
    content: '',
  });
  const [editingComment, setEditingComment] = useState<TComment | null>(null);

  const { data: comments = [], isLoading: commentsLoading, error: commentsError, refetch } = useGetCommentsQuery();
  const { data: bugs = [] } = useGetAllBugsQuery();
  const [createComment, { isLoading: creating }] = useCreateCommentMutation();
  const [updateComment, { isLoading: updating }] = useUpdateCommentMutation();
  const [deleteComment, { isLoading: deleting }] = useDeleteCommentMutation();

  const authState = useSelector((state: any) => state.auth);
  const currentUserId = authState?.user?.userid || 1;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingComment && editingComment.bugid) {
        await updateComment({ id: editingComment.bugid, comment: formData }).unwrap();
        setEditingComment(null);
      } else {
        await createComment({ ...formData, userid: currentUserId }).unwrap();
      }
      setFormData({
        bugid: 0,
        userid: currentUserId,
        content: '',
      });
      refetch();
    } catch (error: any) {
      console.error('Error saving comment:', error);
      alert(error?.data?.error || 'Failed to save comment');
    }
  };

  const handleEdit = (comment: TComment) => {
    setEditingComment(comment);
    setFormData({
      bugid: comment.bugid,
      userid: comment.userid,
      content: comment.content,
    });
  };

  const handleDelete = async (commentId: number) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await deleteComment(commentId).unwrap();
        refetch();
      } catch (error: any) {
        console.error('Error deleting comment:', error);
        alert(error?.data?.error || 'Failed to delete comment');
      }
    }
  };

  const formatDate = (dateString?: Date | string) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div>
      <Navigation />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Comments Management</h1>

        {/* Hero Section */}
        <div className="hero bg-base-200 rounded-box mb-6">
          <div className="hero-content flex-col lg:flex-row">
            <div>
              <h1 className="text-5xl font-bold">Collaborate & Comment</h1>
              <p className="py-6">
                Share your thoughts, feedback, and insights on bugs and projects with the team.
              </p>
            </div>
          </div>
        </div>

        {/* Add/Edit Comment Form */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h2 className="card-title">{editingComment ? 'Edit Comment' : 'Add a Comment'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label" htmlFor="bugid">
                  <span className="label-text">Bug ID *</span>
                </label>
                <select
                  id="bugid"
                  className="select select-bordered"
                  value={formData.bugid}
                  onChange={(e) => setFormData({ ...formData, bugid: parseInt(e.target.value) })}
                  required
                >
                  <option value={0}>Select bug</option>
                  {bugs.map((bug) => (
                    <option key={bug.bugid} value={bug.bugid}>
                      #{bug.bugid} - {bug.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Comment *</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Write your comment here"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={creating || updating}
                >
                  {creating || updating ? 'Saving...' : editingComment ? 'Update Comment' : 'Post Comment'}
                </button>
                {editingComment && (
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => {
                      setEditingComment(null);
                      setFormData({
                        bugid: 0,
                        userid: currentUserId,
                        content: '',
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

        {/* Comments List */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">All Comments</h2>
            {commentsLoading && <div className="loading loading-spinner loading-lg"></div>}
            {commentsError && (
              <div className="alert alert-error">
                <span>Error loading comments. Please try again.</span>
              </div>
            )}
            {!commentsLoading && !commentsError && (
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <div className="text-center py-8">
                    <p>No comments yet. Be the first to comment!</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.commentid} className="chat chat-start">
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                          <span className="font-bold">{comment.userid}</span>
                        </div>
                      </div>
                      <div className="chat-header">
                        User {comment.userid}
                        <time className="text-xs opacity-50 ml-2">
                          {formatDate(comment.timestamp)}
                        </time>
                      </div>
                      <div className="chat-bubble bg-base-200 text-base-content">
                        {comment.content}
                      </div>
                      <div className="chat-footer opacity-50">
                        Bug ID: {comment.bugid}
                        <div className="flex gap-2 mt-2">
                          <button
                            className="btn btn-xs btn-ghost"
                            onClick={() => comment.commentid && handleEdit(comment)}
                            disabled={deleting}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-xs btn-ghost text-error"
                            onClick={() => comment.commentid && handleDelete(comment.commentid)}
                            disabled={deleting}
                          >
                            {deleting ? 'Deleting...' : 'Delete'}
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
