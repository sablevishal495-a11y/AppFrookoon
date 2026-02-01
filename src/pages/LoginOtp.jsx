import { useState } from "react";
import { verifyOtp } from "../services/authApi";
import { useLocation, useNavigate } from "react-router-dom";
import { saveToken } from "../utils/auth";

function LoginOtp() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.phone;

  const handleVerifyOtp = async () => {
    const response = await verifyOtp(phone, otp);
    saveToken(response.token);
    navigate("/");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Enter OTP</h2>
      <input
        type="number"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <br /><br />
      <button onClick={handleVerifyOtp}>Verify OTP</button>
    </div>
  );
}

export default LoginOtp;
