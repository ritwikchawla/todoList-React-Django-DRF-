import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="footer py-3 mt-4 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <span className="text-muted">
              © 2023 Todo App. All rights reserved.
            </span>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a href="#" className="text-decoration-none me-3">
              <FaFacebook />
            </a>
            <a href="#" className="text-decoration-none me-3">
              <FaTwitter />
            </a>
            <a href="#" className="text-decoration-none me-3">
              <FaInstagram />
            </a>
            <a href="#" className="text-decoration-none">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
