import { useState } from "react";
import { sendOtp } from "../services/authApi";
import { useNavigate } from "react-router-dom";

function LoginPhone() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    await sendOtp(phone);
    navigate("/login-otp", { state: { phone } });
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Login</h2>
      <input
        type="tel"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br /><br />
      <button onClick={handleSendOtp}>Send OTP</button>
    </div>
  );
}

export default LoginPhone;
