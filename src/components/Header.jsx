import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  return (
    <header style={{ padding: "15px", background: "#000", color: "#fff" }}>
      <h3>Frookoon</h3>
      <button onClick={logout}>Logout</button>
    </header>
  );
}

export default Header;
