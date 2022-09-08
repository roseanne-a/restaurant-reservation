import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";
import Footer from "./Footer";
import Hamburger from "../images/Hamburger.png";
import Fries from "../images/Fries.png";
import FruitBowl from "../images/Fruit_Bowl.png";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <>
      <div className="container-fluid">
        <div className="row h-100">
          <div className="col-md-2 side-bar">
            <Menu />
          </div>

          <div className="col">
            <div
              id="carouselExampleIndicators"
              className="carousel slide mb-4"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="1"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="2"
                ></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={Hamburger} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={FruitBowl} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={Fries} className="d-block w-100" alt="..." />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-target="#carouselExampleIndicators"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-target="#carouselExampleIndicators"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </button>
            </div>
            <main className="container">
              <Routes />
            </main>
          </div>
        </div>
      </div>
      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
}

export default Layout;
