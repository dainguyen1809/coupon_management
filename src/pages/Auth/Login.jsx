import { useForm } from "react-hook-form";

const Login = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin =  (payload) => {

    console.log(payload);

    try {
      const isLogin =  login(payload);
     console.log(isLogin);
    } catch (error) {
      console.log(error);
    } finally{
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
              htmlFor="email"
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
          <div className="mb-4">
            <button className="w-full p-3 transition ease-in-out delay-200 bg-blue-500 hover:bg-blue-700 duration-300 text-white rounded-lg">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
