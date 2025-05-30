import React, { useState } from "react";

interface LoginResponse {
  access_token: string;
  user: {
    _id: string;
    email: string;
    name: string;
    badgeNumber: number;
    isAdmin: boolean;
  };
}

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        alert("Login failed");
        return;
      }

      const data: LoginResponse = await res.json();
      setToken(data.access_token);
      // optionally save token to localStorage/sessionStorage here
      console.log("Logged in user:", data.user);
      alert("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login error");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label style={{ marginTop: 10 }}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit" style={{ marginTop: 15 }}>
          Login
        </button>
      </form>
      {token && (
        <div style={{ marginTop: 20 }}>
          <strong>Access Token:</strong>
          <pre style={{ whiteSpace: "break-spaces" }}>{token}</pre>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
