import { useState } from "react";
import { registerUser } from "../Auth/authUtils";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const newUser = {
      email: email,
      password: password,
      role: role,
    };
    const registerResult = await registerUser(newUser);
    if (registerResult) {
      navigate("/");
    }
  };

  return (
    <div>
      <h1>Registration Page</h1>
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="text"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}
