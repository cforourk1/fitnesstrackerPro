
import Layout from "./layout/Layout"
import Register from "./auth/Register";
import Login from "./auth/Login";
import ActivitiesPage from "./activities/ActivitiesPage";
import Error404 from "./Error404.jsx";

/**
 * Fitness Trackr is a platform where fitness enthusiasts can share their workouts and
 * discover new routines. Anyone can browse the site and make an account, and users with an
 * account will be able to upload and manage their own activities.
 */

/*import routes*/
import { Routes, Route } from "react-router"
export default function App() {
  return(
    <Routes>
      {/*import routes the parent route any URL using / will use layout as A wrapper  - it will wrap all other pages with the navbar and main content area*/}
      <Route path="/" element={<Layout />}>

{/* route index element - this is the default page when you are just at / it will show activities page*/}

        <Route index element={<ActivitiesPage />} />

{/* show the register component when URL is register */}
        <Route path="register" element={<Register />} />

{/* show the login component when URL is login */}
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  )
}
