import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

function SignIn() {
  const [formData, setFormData] = useState({});
  const { error, loading } = useSelector((state) => state.user);
  const [passwordType, setPasswordType] = useState("password");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-9 md:text-4xl">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-4">
        <input
          type="email"
          autoComplete="off"
          placeholder="email@gmail.com"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <div className="flex flex-1 relative">
          <input
            type={passwordType}
            placeholder="password"
            autoComplete="off"
            className="border p-3 rounded-lg relative w-full"
            onChange={handleChange}
            id="password"
          />

          <span
            disabled={false}
            className="bg-transparent text-slate-700 text-xl p-3 rounded-lg uppercase w-10 absolute right-1 top-1 cursor-pointer"
            onClick={togglePassword}
          >
            {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <button
          disabled={loading}
          className="light-green-bg text-white text-lg p-3 rounded-lg uppercase hover:opacity-95 hover:shadow-lg transition-shadow disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-6">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-600">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}

export default SignIn;
