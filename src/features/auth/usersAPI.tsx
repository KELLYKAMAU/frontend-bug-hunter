import { apidomain } from "../../utils/APIdomains";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AuthState } from "./authSlice";

export type Tuser = {
  userid: number;
  // username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  
};

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  message: string;
  token: string;
  user: {
    userid: number;
    FN: string;
    LN: string;
    email: string;
    role: string;
  };
};

export const usersAPI = createApi({
  reducerPath: "usersAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: apidomain,
    prepareHeaders: (headers: any, { getState }: any) => {
      const state = getState() as { auth?: AuthState };
      const token = state.auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    createUsers: builder.mutation<Tuser, Partial<Tuser>>({
      query: (newUser: Partial<Tuser>) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),
    getUsers: builder.query<Tuser[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials: LoginRequest) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useCreateUsersMutation,
  useGetUsersQuery,
  useLoginUserMutation,
} = usersAPI;