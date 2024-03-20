import React from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="w-full h-[100vh] flex flex-row justify-center items-center bg-[#163545]">
      <div className="w-[300px] flex flex-col gap-8 justify-between">
        <div className="w-full text-center text-6xl font-medium text-white">
          Sign in
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <input
              className="w-full bg-[#224957] p-[10px] rounded-md text-sm"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              className="w-full bg-[#224957] p-[10px] rounded-md text-sm"
              placeholder="Password"
            />
          </div>
          <div className="flex flex-row justify-center items-center">
            <input
              className="bg-[#224957] appearance-none checked:bg-blue-600 w-4 h-4 mr-2 cursor-pointer"
              type="checkbox"
            />
            <div className="text-white text-sm">Remember Me</div>
          </div>
        </div>
        <Link
          className="bg-[#66D17F] p-[15px] rounded-md text-white text-center"
          to="/empty-state"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
