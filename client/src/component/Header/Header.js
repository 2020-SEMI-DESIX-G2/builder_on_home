import React from "react";
import { Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
// import Logo from "../../assets/png/instaclone.png";
import Search from '../Header/Search';
import RightHeader from '../Header/RightHeader';
import userAuth from "../../hooks/useAuth";

export default function Header() {
  const history = useHistory();
  const client = useApolloClient();
  const { logout } = userAuth();


  const onLogout = () => {
    client.clearStore();
    logout();
    history.push("/");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="nav-brand">
        <h1>Builder on Home</h1>
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              <Icon name="home" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/services" className="nav-link">
              services
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contracts" className="nav-link">
              My contracts
            </Link>
          </li>
          <li className="nav-item">
            <Button className="btn btn-light" onClick={logout}>Cerrar sesion</Button>
          </li>
          <li className="nav-item">
            <RightHeader />
          </li>
        </ul>
        {/* <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form> */}
      </div>

    </nav>
  );
}
