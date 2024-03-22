import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (response.ok) {
        // Clear any previous error message
        setError("");

        // Navigate to new route or perform any other action
        console.log("Login successful");

        // Navigate to "/movie-list"
        navigate("/movie-list");
      } else {
        // If response is not successful, handle error
        const data = await response.json();
        setError(data.message || "Failed to sign in");
      }
    } catch (error) {
      console.error("Error occurred while signing in:", error);
      setError("Error occurred while signing in");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center flex-grow">
        <div className="w-[300px] flex flex-col gap-8 justify-between items-center">
          <div className="w-full text-center text-6xl font-medium text-white">
            Sign in
          </div>
          <div className="flex flex-col gap-4 w-full">
            <input
              className="w-full text-white bg-[#224957] p-[10px] rounded-md text-sm"
              placeholder="kminchelle"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full text-white bg-[#224957] p-[10px] rounded-md text-sm"
              placeholder="0lelplR"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex flex-row justify-center items-center">
              <input
                className="bg-[#224957] appearance-none checked:bg-blue-600 w-4 h-4 mr-2 cursor-pointer"
                type="checkbox"
              />
              <div className="text-white text-sm">Remember Me</div>
            </div>
          </div>
          <div
            className="bg-[#66D17F] w-full p-[15px] rounded-md text-white text-center cursor-pointer"
            onClick={handleSignIn}
          >
            Login
          </div>
          {error && (
            <div className="bg-[#224957] text-red-500 text-center p-2 rounded-md">
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
