import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apidomain } from "../../utils/APIdomains";

export type TBug = {
  bugid?: number;
  project_id: number;
  reported_by: number;
  assigned_to?: number | null;
  title: string;
  description?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  created_at?: Date;
  updated_at?: Date;
};

export type TProject = {
  projectid: number;
  project_name?: string;
  title?: string;
  description?: string;
  status?:string;
};

export type TComment = {
  commentid?: number;
  bugid: number;
  userid: number;
  content: string;
  timestamp?: Date;
};

export const bugsProjectsCommentsAPI = createApi({
  reducerPath: "bugsProjectsCommentsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: apidomain,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as any;
      const token = state.auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Bugs", "Projects", "Comments"],
  endpoints: (builder) => ({
    getAllBugs: builder.query<TBug[], void>({
      query: () => "/allbugs",
      providesTags: ["Bugs"],
    }),
    getBugsByProject: builder.query<TBug[], number>({
      query: (projectId) => `/getbugs/${projectId}`,
      providesTags: ["Bugs"],
    }),
    getBugById: builder.query<TBug, number>({
      query: (id) => `/bugs/${id}`,
      providesTags: ["Bugs"],
    }),
    createBug: builder.mutation<{ message: string }, Partial<TBug>>({
      query: (newBug) => ({
        url: "/createbug",
        method: "POST",
        body: newBug,
      }),
      invalidatesTags: ["Bugs"],
    }),
    updateBug: builder.mutation<{ message: string }, { id: number; bug: Partial<TBug> }>({
      query: ({ id, bug }) => ({
        url: `/bugs/${id}`,
        method: "PUT",
        body: bug,
      }),
      invalidatesTags: ["Bugs"],
    }),
    deleteBug: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/bugs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bugs"],
    }),
    getProjects: builder.query<TProject[], void>({
      query: () => "/projects",
      providesTags: ["Projects"],
    }),
    getProjectById: builder.query<TProject, number>({
      query: (id) => `/projects/${id}`,
      providesTags: ["Projects"],
    }),
    createProject: builder.mutation<{ message: string }, Partial<TProject>>({
      query: (newProject) => ({
        url: "/projects",
        method: "POST",
        body: newProject,
      }),
      invalidatesTags: ["Projects"],
    }),
    getComments: builder.query<TComment[], void>({
      query: () => "/comments",
      providesTags: ["Comments"],
    }),
    getCommentsByBugId: builder.query<TComment[], number>({
      query: (bugId) => `/comments/${bugId}`,
      providesTags: ["Comments"],
    }),
    createComment: builder.mutation<{ message: string }, Partial<TComment>>({
      query: (newComment) => ({
        url: "/comments",
        method: "POST",
        body: newComment,
      }),
      invalidatesTags: ["Comments"],
    }),
    updateComment: builder.mutation<{ message: string }, { id: number; comment: Partial<TComment> }>({
      query: ({ id, comment }) => ({
        url: `/comments/${id}`,
        method: "PUT",
        body: comment,
      }),
      invalidatesTags: ["Comments"],
    }),
    deleteComment: builder.mutation<{ message: string }, number>({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useGetAllBugsQuery,
  useGetBugsByProjectQuery,
  useGetBugByIdQuery,
  useCreateBugMutation,
  useUpdateBugMutation,
  useDeleteBugMutation,
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useGetCommentsQuery,
  useGetCommentsByBugIdQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = bugsProjectsCommentsAPI;


