import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type VerifyOTPProps = {
  email: string;
};

const VerifyOTP = ({ email }: VerifyOTPProps) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const paste = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(paste)) return;

    const newOtp = paste.split("");
    setOtp(newOtp);

    newOtp.forEach((val, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i]!.value = val;
      }
    });

    inputsRef.current[5]?.focus();
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length < 6) {
      alert("Enter complete OTP");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: finalOtp }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }
      login(data.token);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Verification failed");
    }
  };
  const handleResend = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      setTimer(30);
      setCanResend(false);
      setOtp(Array(6).fill(""));

      inputsRef.current[0]?.focus();
    } catch (err) {
      alert("Failed to resend OTP");
    }
  };

  return (
    <div
      className="relative bg-white/60 backdrop-blur-sm p-10 rounded-3xl 
      shadow-[0_25px_80px_rgba(0,0,0,0.12)] w-100
      transition-transform duration-200 ease-out"
    >
      <h2 className="text-xl font-semibold text-center mb-2">Verify OTP</h2>

      <p className="text-center text-gray-500 text-sm mb-6">
        Enter the 6-digit code sent to <br />
        <span className="font-medium text-gray-700">{email}</span>
      </p>
      <div className="flex justify-between gap-2 mb-6" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            ref={(el: HTMLInputElement | null) => {
              inputsRef.current[index] = el;
            }}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 text-center text-lg border rounded-xl 
            bg-white/50 focus:ring-2 focus:ring-purple-400 focus:border-gray-300 
            outline-none shadow-sm "
          />
        ))}
      </div>
      <button
        onClick={handleVerify}
        className="w-full py-3 rounded-xl 
        bg-linear-to-r from-blue-500 to-purple-600 
        text-white font-semibold shadow-md hover:scale-[1.02]
        transition-all duration-300"
      >
        Verify OTP
      </button>

      <div className="text-center mt-4 text-sm text-gray-500">
        {canResend ? (
          <span
            onClick={handleResend}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Resend OTP
          </span>
        ) : (
          <span>Resend in {timer}s</span>
        )}
      </div>
    </div>
  );
};

export default VerifyOTP;
