import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const VerifyOTP = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const email = state?.email;

  const handleVerify = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
      email,
      otp,
    });

    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Enter OTP sent to {email}</h2>

      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />

      <button onClick={handleVerify} className="bg-red-500 p-6">Verify</button>
    </div>
  );
};

export default VerifyOTP;