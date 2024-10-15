import { useForm } from "react-hook-form";
import axios from "axios"; // To make HTTP requests
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // To navigate after login

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (payload) => {
    setLoading(true); // Set loading while the request is being made
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:3001/api/v1/users", payload);

      // Handle successful login response
      if (response.status === 201) {
        const userData = response.data.data;

        // Store user data in localStorage or state
        localStorage.setItem("user", JSON.stringify(userData));

        // Redirect to the home page after login
        navigate("/home");
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-12 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-lg text-center font-bold">Login</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold"
            >
              Email
            </label>
            <input
              type="text"
              className="w-full border p-3 border-gray-400 rounded-xl outline-none mt-4"
              placeholder="domain@example.com"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              className="w-full border p-3 border-gray-400 rounded-xl outline-none mt-4"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
          </div>
          {errorMessage && (
            <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
          )}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full p-3 transition ease-in-out delay-200 bg-blue-500 hover:bg-blue-700 duration-300 text-white rounded-lg"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
