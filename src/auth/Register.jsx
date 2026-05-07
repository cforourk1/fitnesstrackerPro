import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router";

/** A form that allows users to register for a new account
 * useNavigate is not built into react - it comes from the react-router library. It is a hook that gives you the tool. When we say const navigate = useNavigate () we are saying use the navigation tool and put in a variable called navigate - then later when we say navigate("/activities") we are using that same tool to go to that URL.
*/
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const tryRegister = async (formData) => {
    setError(null);

    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await register({ username, password });
      navigate("/activities");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Register for an account</h1>
      <form action={tryRegister}>
        <label>
          Username
          <input type="text" name="username" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Register</button>
        {error && <p role="alert">{error}</p>}
      </form>
      <Link to="login">Login</Link>
        Already have an account? Log in here.
    </>
  );
}
