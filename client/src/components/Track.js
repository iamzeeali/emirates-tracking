import React, { useState } from 'react';
import axios from 'axios';
const Track = () => {
  const [ecci, setEcci] = useState('');
  const [notFoundInAsn, setNotFoundInAsn] = useState(false);
  const [notFoundInGrn, setNotFoundInGrn] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .get(`/api/asn?poNumber=${ecci}`)
      .then((response) => {
        if (response.data.results <= 0) {
          setNotFoundInAsn(true);
        } else {
          window.location.assign(`/trackStatus/${ecci}`);
        }
      })
      .catch((error) => {
        console.log('Something went wrong!', error);
        setNotFoundInAsn(true);
      });

    axios
      .get(`/api/grn/?poNumber=${ecci}`)
      .then((response) => {
        if (response.data.results <= 0) {
          setNotFoundInGrn(true);
        } else {
          window.location.assign(`/trackStatus/${ecci}`);
        }
      })
      .catch((error) => {
        console.log('Something went wrong!', error);
        setNotFoundInGrn(true);
      });
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      onSubmitHandler(e);
    }
  };

  return (
    <div className="track-main">
      <div className="container">
        <div className="row">
          <div className="col-sm-3 col-md-offset-6"></div>
          <div className="col-sm-6 col-md-offset-6">
            <div className="row no-gutters mt-1 align-items-center">
              <img
                src="/truck2.gif"
                alt="track"
                width="60%"
                className="ml-auto mr-auto   mt-4 "
                style={{ marginTop: '-50px' }}
              />

              <input
                className="form-control mb-2 rounded-pill p-4 shadow-sm border border-secondary"
                placeholder="Enter PO Number to track"
                style={{}}
                autoFocus
                required
                type="Number"
                value={ecci}
                onChange={(e) => setEcci(e.target.value)}
                onKeyPress={(e) => handleKeypress(e)}
              />
              <div className="col-auto">
                <button
                  onClick={(e) => onSubmitHandler(e)}
                  className="btn btn-outline-light bg-light text-dark border-0 rounded-pill ml-n5 mr-2"
                  style={{ marginTop: '-8px' }}
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>

              <p
                className="text-black ml-auto mr-auto"
                style={{ fontSize: '12px', fontWeight: 'bold' }}
              >
                <i>Enter the PO number and press enter.</i>
              </p>
            </div>

            {notFoundInAsn && notFoundInGrn ? (
              <div className="text-center animated bounceIn">
                {' '}
                <p className="ml-auto mr-auto">
                  {' '}
                  <i className="fa fa-frown-o text-dark lead font-weight-bold">
                    {' '}
                    PO not found!
                  </i>
                </p>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="col-sm-3 col-md-offset-6"></div>
        </div>
      </div>

      <div className="footer">
        <p style={{ fontSize: '13px' }} className="text-black">
          &copy; 2026, Emirates Logistics | Developed By{' '}
          <a href="http://globuslabs.com" className="text-dark" target="_blank">
            Globus Labs
          </a>{' '}
        </p>
      </div>
    </div>
  );
};

export default Track;
