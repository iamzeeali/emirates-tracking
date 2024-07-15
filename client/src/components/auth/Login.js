import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../_actions/authAction";

import { Link } from "react-router-dom";
import Input from "../ui/Input";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/upload' />;
  }

  return (
    <div className=''>
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='container landing-inner'>
            <div className=' ml-auto m-5 animated fadeInDown'>
              <div className='row login'>
                <div className='col-sm-12 py-5  ' style={{ width: "270px" }}>
                  {/* <i className='fa fa-cube fa-3x '></i> */}
                  <img src='/el_logo.png' alt='OWM' width='30%' />
                  <hr className='border-white' />

                  <h4 className='' style={{ color: "#fff" }}>
                    Sign In
                  </h4>

                  <form onSubmit={(e) => onSubmitHandler(e)}>
                    <Input
                      type='email'
                      className='form-control transparent-input mt-4 mb-3'
                      placeholder='Email'
                      name='email'
                      value={email}
                      onChange={(e) => onChangeHandler(e)}
                      required
                      autoFocus='true'
                    />
                    <Input
                      type='password'
                      className='form-control transparent-input mt-2'
                      placeholder='Password'
                      name='password'
                      value={password}
                      onChange={(e) => onChangeHandler(e)}
                      required
                    />
                    <Input
                      type='submit'
                      value='Sign in'
                      className='transparent-btn btn-block form-control my-3'
                    />
                  </form>
                  <Link to='#' className='text-white'>
                    {" "}
                    <small>Forgot Password?</small>
                  </Link>
                </div>
              </div>
            </div>
            <small
              className='mt-5 text-center text-white'
              style={{ textShadow: "1px 1px 5px #000" }}
            >
              {" "}
              Powered by{" "}
              <a
                href='http://globuslabs.com'
                className='text-white'
                target='_blank'
              >
                Globus Labs
              </a>{" "}
            </small>
          </div>
        </div>
      </section>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
