import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const FAKE_USER = {
    email: "user@gmail.com",
    password: "password123",
    name: "Demo User",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      email === FAKE_USER.email &&
      password === FAKE_USER.password
    ) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: FAKE_USER.email,
          name: FAKE_USER.name,
          isLoggedIn: true,
        })
      );
    } else {
      setError("Email hoặc mật khẩu không đúng");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={{ textAlign: "center" }}>Đăng nhập</h2>

        {error && (
          <p style={styles.error}>{error}</p>
        )}

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input}/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input}/>
        <button type="submit" style={styles.button}>
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default Login;

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },
  form: {
    width: "320px",
    padding: "24px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  },
  input: {
    padding: "10px",
    fontSize: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#667eea",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
  },
  error: {
    color: "red",
    fontSize: "14px",
    textAlign: "center",
  },
};
