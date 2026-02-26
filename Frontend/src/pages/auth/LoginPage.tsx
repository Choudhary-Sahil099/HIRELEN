import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("Form Data:", data);
    const fakeToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +"eyJfaWQiOiIxMjMiLCJuYW1lIjoiU2FoaWwiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicm9sZSI6ImludGVydmlld2VyIn0." +"signature";

    login(fakeToken);
    navigate("/dashboard");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          HireLens Login
        </h1>

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full border p-2 rounded mb-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-2"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded mt-4"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;