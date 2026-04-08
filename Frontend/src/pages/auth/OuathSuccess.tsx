import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import Robot from "../../assets/Robot.png";
import Logo from "../../assets/mainLogo.png";
import VerifyOTP from "./OTPverify.tsx";

const signupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const cardRef = useRef<HTMLFormElement | null>(null);
  const navigate = useNavigate();
  const [showOTP, setShowOTP] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rx = (y / rect.height - 0.5) * -8;
    const ry = (x / rect.width - 0.5) * 8;

    card.style.setProperty("--rx", `${rx}deg`);
    card.style.setProperty("--ry", `${ry}deg`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--rx", "0deg");
    cardRef.current.style.setProperty("--ry", "0deg");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Signup failed");
        return;
      }
      setUserEmail(data.email);
      setShowOTP(true);

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="h-screen w-full flex bg-white">
      <div className="w-2/3 hidden md:flex relative overflow-hidden">
        <img
          src={Robot}
          alt="AI Robot"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full"
        />

        <div className="relative z-10 p-10 flex flex-col gap-6 h-full">
          <img src={Logo} className="h-20 w-60" />

          <div className="max-w-xl ml-55">
            <h2 className="text-5xl text-gray-800 leading-snug font-light">
              Join <span className="font-medium">HireLens - </span> <br />
              Start your <span className="font-medium">AI Journey</span>
            </h2>

            <p className="text-gray-600 mt-3 text-md">
              Create your account and experience AI-powered interviews.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div
          className="perspective-[1000px]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {showOTP ? (
            <VerifyOTP email={userEmail} />
          ) : (
            <form
              ref={cardRef}
              onSubmit={handleSubmit(onSubmit)}
              style={{
                transform:
                  "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(8px)",
              }}
              className="relative bg-white/60 backdrop-blur-sm p-10 rounded-3xl 
              shadow-[0_25px_80px_rgba(0,0,0,0.12)] w-100
              will-change-transform transition-transform duration-200 ease-out"
            >
              <div className="absolute -inset-0.5 rounded-3xl bg-linear-to-r from-blue-200 to-purple-200 opacity-30 blur-xl pointer-events-none"></div>
              <div className="absolute inset-0 rounded-3xl border border-white/50 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <img src={Logo} className="h-17" />
                </div>

                <p className="text-center text-gray-500 mb-5">
                  Create your account instantly
                </p>

                <div className="mb-5">
                  <label className="text-sm text-gray-500">User Name</label>
                  <input
                    {...register("name")}
                    className="w-full mt-2 p-3 rounded-xl border"
                  />
                  {errors.name && <p>{errors.name.message}</p>}
                </div>

                <div className="mb-4">
                  <label>Email</label>
                  <input {...register("email")} className="w-full mt-2 p-3 border rounded-xl" />
                </div>

                <div className="mb-5">
                  <label>Password</label>
                  <input type="password" {...register("password")} className="w-full mt-2 p-3 border rounded-xl" />
                </div>

                <button className="w-full py-3 bg-blue-500 text-white rounded-xl">
                  Sign Up
                </button>

                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  className="w-full mt-3 border p-3 rounded-xl"
                >
                  Continue with Google
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;