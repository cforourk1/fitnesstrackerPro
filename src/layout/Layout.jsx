import Navbar from "./Navbar";
import { Outlet } from "react-router"

/** The shared layout for all pages of the app
 * outlet is how react router tells the layout wrapper to render all of the child routes.
 */
export default function Layout() {
  return (
    <>
      <Navbar />
      <main><Outlet /></main>
    </>
  );
}
