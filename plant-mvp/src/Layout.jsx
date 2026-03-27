import { Outlet, Link, useLocation } from "react-router-dom";
import "./Layout.css";

function Layout() {
  const location = useLocation();

  return (
    <main className="app-shell">
      <header className="app-header">
        <div className="header-content">
          <Link to="/" className="logo-link">
            <p className="logo-text">Plantir</p>
          </Link>
          <nav className="header-nav">
            <Link
              to="/"
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            >
              Find Your Plants
            </Link>
            <Link
              to="/manage"
              className={`nav-link ${
                location.pathname === "/manage" ? "active" : ""
              }`}
            >
              Love Your Plants
            </Link>
          </nav>
        </div>
      </header>
      <Outlet />
    </main>
  );
}

export default Layout;
