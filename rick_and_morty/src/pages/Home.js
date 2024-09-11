import RickAndMortyLogo from "../images/logo.png";
import Highlight from "../images/highlight_white.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 mx-auto align-items-center">
        <div className="col-lg-5 col-md-6 col-sm-8 col-10 mx-auto text-left">
          <img
            src={RickAndMortyLogo}
            alt="Rick and Morty Logo"
            className="img-fluid mb-4 logo-image"
          />
          <h1 className="main-heading">
            Selamat datang di Rick and Morty, Silahkan Explore Character yang
            ada.
          </h1>
          <div className="d-flex flex-column flex-md-row">
            <div className="d-flex justify-content-center justify-content-md-start mr-2">
              <Link
                to="/character"
                className="btn btn-info btn-lg mt-4 custom-button"
              >
                Explore Character
              </Link>
            </div>
            <div className="d-flex justify-content-center justify-content-md-start">
              <Link
                to="/locations"
                className="btn btn-info btn-lg mt-4 custom-button"
              >
                Explore By Location
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-md-6 d-none d-md-block mx-auto text-center">
          <img
            src={Highlight}
            alt="Rick and Morty"
            className="img-fluid highlight-image"
          />
        </div>
      </div>
    </div>
  );
}
