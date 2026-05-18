import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { loginUser } from "../network";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginUser(username, password);
      if (data && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);

        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Sign In to E-Shop
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
              className="w-full p-2.5 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400 text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-400">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded transition-colors mt-2"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-400">
          New to the shop?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
