import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

const handleLogin = async (e) => {
e.preventDefault();


try {
  setLoading(true);

  const res = await API.post(
    "/auth/login",
    {
      email,
      password,
    }
  );

  console.log(res.data);

  localStorage.setItem(
    "token",
    res.data.token
  );

  if (res.data.user) {
    localStorage.setItem(
      "user",
      JSON.stringify(
        res.data.user
      )
    );

    localStorage.setItem(
      "role",
      res.data.user.role
    );

    if (
      res.data.user.role ===
      "ADMIN"
    ) {
      navigate(
        "/admin/dashboard"
      );
    } else {
      navigate(
        "/user/dashboard"
      );
    }
  } else {
    alert(
      "User data missing from backend response"
    );
  }
} catch (error) {
  console.error(error);

  alert(
    error?.response?.data
      ?.message ||
      "Login Failed"
  );
} finally {
  setLoading(false);
}


};

return ( <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4"> <form
     onSubmit={handleLogin}
     className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8"
   > <h1 className="text-3xl font-bold text-center mb-6">
Login </h1>


    <input
      type="email"
      placeholder="Email"
      className="w-full border rounded-lg p-3 mb-4"
      value={email}
      onChange={(e) =>
        setEmail(e.target.value)
      }
      required
    />

    <input
      type="password"
      placeholder="Password"
      className="w-full border rounded-lg p-3 mb-4"
      value={password}
      onChange={(e) =>
        setPassword(
          e.target.value
        )
      }
      required
    />

    <button
      type="submit"
      disabled={loading}
      className="w-full bg-black text-white p-3 rounded-lg"
    >
      {loading
        ? "Logging in..."
        : "Login"}
    </button>

    <p className="text-center mt-4">
      Don't have an account?
      <Link
        to="/register"
        className="text-blue-600 ml-2"
      >
        Register
      </Link>
    </p>
  </form>
</div>


);
}
