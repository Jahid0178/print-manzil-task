import { NavLink } from "react-router";

const Header = () => {
  return (
    <header className="py-4">
      <div className="container">
        <nav className="flex justify-between items-center">
          <NavLink to="/">
            <h2 className="text-2xl font-semibold">Print Manzil</h2>
          </NavLink>
          <ul className="flex items-center gap-4">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/logo-design">Logo Design</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
