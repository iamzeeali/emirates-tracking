import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../_actions/authAction";

const Navbar = ({
  auth: { username, isAuthenticated, loading, role, user },
  logout,
}) => {
  const customerAuthLinks = (
    <nav
      className='navbar navbar-expand-lg fixed-top navbar-dark mb-5 py-2 px-5 '
      style={{ backgroundColor: "#fe912b" }}
    >
      <a className='navbar-brand' href='#'>
        <img src='/emirates.png' alt='owm' width='60px' />
      </a>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item active'>
            <Link className='nav-link' to='/'>
              <i className='fa fa-home'></i> Home{" "}
            </Link>
          </li>

          <li className='nav-item'>
            <Link className='nav-link' to='/inventory'>
              <i class='fa fa-cube '></i> View Inventory
            </Link>
          </li>
          <li className='nav-item '>
            <Link className='nav-link' to='/order'>
              <i class='fa fa-list'></i> Orders{" "}
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>
              <i class='fa fa-map-marker '></i> Track{" "}
            </Link>
          </li>

          <li className='nav-item dropdown'>
            <a
              className='nav-link dropdown-toggle'
              href='#'
              id='navbarDropdown'
              role='button'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <i class='fa fa-gear'></i> Settings
            </a>
            <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
              <Link className='dropdown-item' to='/sub-customer'>
                Your Customers{" "}
              </Link>

              <div className='dropdown-divider'></div>
              <Link className='dropdown-item' to='/profile'>
                Profile
              </Link>
            </div>
          </li>

          <li className='nav-item'>
            <Link className='nav-link' to='/report'>
              <i class='fa fa-line-chart'></i> Reports{" "}
            </Link>
          </li>
        </ul>
        <ul className='navbar-nav '></ul>
      </div>
    </nav>
  );

  const authLinks = (
    <nav
      className='navbar navbar-expand-lg fixed-top'
      style={{ backgroundColor: "#edf0f5" }}
    >
      <Link className='navbar-brand' to='/'>
        <img src='/emirates.png' alt='owm' width='130px' />
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'>
        </ul>
        <ul className='navbar-nav   '>
          <li className='nav-item '>
            <Link className='nav-link active' to='/upload'>
              <i className='fa fa-list'> </i> PO{" "}

            </Link>
          </li>
          <li className='nav-item '>
            <Link className='nav-link active' to='/'>
              <i className='fa fa-search'> </i> Track{" "}

            </Link>
          </li>
          <li className='nav-item '>
            <Link className='nav-link active' to='/feedback'>
              <i className='fa fa-user'> </i> Feedbacks{" "}

            </Link>
          </li>

          <li className='nav-item active'>
            <Link to='/login' onClick={logout} className='nav-link'>
              <i className='fa fa-sign-out'> </i> Sign out
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );

  const guestLinks = (
    <nav className='navbar  navbar-expand-lg fixed-top navbar-light'>
      <Link className='navbar-brand' to='/'>
        <img
          src='/emirates.png'
          alt='owm'
          width='20% '
          style={{ float: "left", marginTop: "-30px" }}
        />
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav'></ul>
        <ul className='navbar-nav ml-auto' style={{ textAlign: "right" }}>
          <li className='nav-item'>
            <Link className='nav-link active' to='/'>
              Track
            </Link>
          </li>
          <li className='nav-item'>
            <a
              className='nav-link active'
              href='http://www.emirateslogistics.com/'
              target='_blank'
            >
              About
            </a>
          </li>
          <li className='nav-item'>
            <Link className='nav-link active' to='/add-feedback'>
              Feedback
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link active' to='/login'>
              SignIn
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  );
  return (
    <Fragment>
      {!loading && (
        <div>
          {isAuthenticated && role === "admin"
            ? authLinks
            : isAuthenticated && role === "customer"
              ? customerAuthLinks
              : guestLinks}
        </div>
      )}
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
