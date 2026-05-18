import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { registerUser } from "../network";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await registerUser(username, password);
      if (data && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);

        alert("Account registered successfully!");
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      //setError("Registration failed. The username might already be taken.");
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create an Account
        </h2>

        {error && (
          <p className="bg-red-500 text-white p-2 rounded mb-4 text-sm text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-400">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2.5 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-400">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition-colors mt-2"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
