import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

export default function Register() {
const navigate = useNavigate();

const [form, setForm] =
useState({
name: "",
email: "",
password: "",
role: "USER",
});

const [loading, setLoading] =
useState(false);

const handleChange = (e) => {
setForm({
...form,
[e.target.name]:
e.target.value,
});
};

const handleSubmit = async (
e
) => {
e.preventDefault();


try {
  setLoading(true);

  await API.post(
    "/auth/register",
    form
  );

  alert(
    "Registration Successful"
  );

  navigate("/");
} catch (error) {
  alert(
    error?.response?.data
      ?.message ||
      "Registration Failed"
  );
} finally {
  setLoading(false);
}


};

return ( <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4"> <form
     onSubmit={handleSubmit}
     className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8"
   > <h1 className="text-3xl font-bold text-center mb-6">
Register </h1>


    <input
      name="name"
      placeholder="Full Name"
      className="w-full border rounded-lg p-3 mb-4"
      value={form.name}
      onChange={handleChange}
    />

    <input
      name="email"
      type="email"
      placeholder="Email"
      className="w-full border rounded-lg p-3 mb-4"
      value={form.email}
      onChange={handleChange}
    />

    <input
      name="password"
      type="password"
      placeholder="Password"
      className="w-full border rounded-lg p-3 mb-4"
      value={form.password}
      onChange={handleChange}
    />

    <select
      name="role"
      className="w-full border rounded-lg p-3 mb-4"
      value={form.role}
      onChange={handleChange}
    >
      <option value="USER">
        User
      </option>
      <option value="ADMIN">
        Admin
      </option>
    </select>

    <button
      type="submit"
      disabled={loading}
      className="w-full bg-black text-white p-3 rounded-lg"
    >
      {loading
        ? "Creating..."
        : "Register"}
    </button>

    <p className="text-center mt-4">
      Already have an account?
      <Link
        to="/"
        className="text-blue-600 ml-2"
      >
        Login
      </Link>
    </p>
  </form>
</div>


);
}
