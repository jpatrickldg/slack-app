import { Outlet, Link } from "react-router-dom";

export default function Login() {
    return (
      <main>
            <input type="text" />
            <br></br>
            <Link to="/app">Login</Link>
            <br></br>
            <Link to="/signup">SignUp</Link>
            <Outlet/>
      </main>
    )
  }