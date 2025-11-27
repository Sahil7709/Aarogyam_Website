import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { authAPI } from "utils/api";

export default function AdminLogin() {
  const [identifier, setIdentifier] = useState(""); // Can be email or phone
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Attempting login with:", { identifier, password });
      
      // Determine if identifier is email or phone
      const isEmail = identifier.includes('@');
      const loginData = isEmail 
        ? { email: identifier, password }
        : { phone: identifier, password };
      
      const { data, error } = await authAPI.login(loginData);
      console.log("Login response:", { data, error });
      
      if (data) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        console.log("Stored token and user data:", data.user || data);

        // Support both response shapes: { user: { role } } and { role }
        const role = (data.user && data.user.role) || data.role;

        // Check if user is admin
        if (role === "admin") {
          console.log("User is admin, redirecting to dashboard");
          // Small delay to ensure token is stored before redirect
          setTimeout(() => {
            history.push("/admin/dashboard");
          }, 100);
        } else {
          console.log("User is not admin, showing error");
          setError("Access denied. Admin privileges required.");
          // Remove token since user is not admin
          localStorage.removeItem("token");
        }
      } else {
        console.log("Login failed with error:", error);
        setError(error || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Admin Sign In
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {error && (
                  <div className="text-red-500 text-sm text-center mb-4">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="identifier"
                    >
                      Email or Phone Number
                    </label>
                    <input
                      type="text"
                      id="identifier"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email or Phone Number"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Signing In..." : "Sign In"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link to="/" className="text-blueGray-200">
                  <small>Back to Home</small>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/admin/auth/register" className="text-blueGray-200">
                  <small>Create Account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}