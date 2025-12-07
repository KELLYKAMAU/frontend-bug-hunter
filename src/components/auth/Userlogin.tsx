import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { useLoginUserMutation } from "../../features/auth/usersAPI";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";

const UserLogin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    try {
      setErrorMessage(null);
      const result = await loginUser({ email, password }).unwrap();
      dispatch(setCredentials({ token: result.token, user: result.user }));

      if (result.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (error: any) {
      setErrorMessage(
        error?.data?.message || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-sky-200 to-sky-100">
      <div className="card w-96 bg-base-100 shadow-2xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold">Login</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
              />
            </div>
            {errorMessage && (
              <p className="text-sm text-error text-center">{errorMessage}</p>
            )}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;