import React, { useState, useEffect } from "react";
import axios from "axios";
import AddAsn from "./AddAsn";
import AddGrn from "./AddGrn";
import { Link } from "react-router-dom";
import { getLimitedGrns } from "../_actions/grnAction";
import { getLimitedAsns } from "../_actions/asnAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";

const UploadEcci = ({ getLimitedAsns, getLimitedGrns, asns, grns }) => {
  const [asnFile, setAsnFile] = useState();
  const [grnFile, setGrnFile] = useState();

  useEffect(() => {
    getLimitedAsns();
    getLimitedGrns();

    //eslint-diable-next-line
  }, []);

  const onFileChangeOne = (e) => {
    setAsnFile(e.target.files[0]);
  };

  const onFileChangeTwo = (e) => {
    setGrnFile(e.target.files[0]);
  };

  const onSubmitHandlerOne = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("asnFile", asnFile);
    if (window.confirm("Confirm Upload?")) {
      axios
        .post("/api/asn", formData, {
          header: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Status: ", response.status);
          alert("Uploaded Sucessfully");
          window.location.reload();
        })
        .catch((error) => {
          alert("Incorrect Document!");
        });
    }
    setAsnFile();
  };

  const onSubmitHandlerTwo = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("grnFile", grnFile);

    if (window.confirm("Confirm Upload?")) {
      axios
        .post("/api/grn", formData, {
          header: {
            "Content-Type": "multipart/form-data",
          },
        })

        .then((response) => {
          console.log("Status: ", response.status);
          alert("Uploaded Sucessfully");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Something went wrong!", error);
          alert("Incorrect Document!");
        });
    }

    setGrnFile();
  };

  return (
    <div className='upload'>
      <div className='container' style={{ paddingTop: "130px" }}>
        <h5 className='border-left border-primary py-2 mb-5 bg-light'>
          Upload or Create ASNS & Stock Movement Report
        </h5>
        <div className='row pt-4'>
          <div className='col-sm-5 p-3 card shadow-sm col-md-offset-6'>
            <form
              onSubmit={(e) => onSubmitHandlerOne(e)}
              encType='multipart/form-data'
              className='text-center'
            >
              <div className='form-group'>
                <b>ASN REPORT - TO BE RECEIVED (REP22246) </b> <br />
                <Link to='/asns' className='btn border shadow-sm mt-3'>
                  View Report
                </Link>
                <br />
                <br />
                <div className='input-group'>
                  <div className='input-group-prepend'>
                    <span
                      className='input-group-text'
                      id='inputGroupFileAddon01'
                    >
                      ASN
                    </span>
                  </div>
                  <div className='custom-file'>
                    <input
                      type='file'
                      className='custom-file-input'
                      id='ecci'
                      aria-describedby='inputGroupFileAddon01'
                      name='asnFile'
                      onChange={onFileChangeOne}
                      accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                      required
                    />
                    <label className='custom-file-label' for='inputGroupFile01'>
                      Choose file
                    </label>
                  </div>
                </div>
                {asns && asns.result > 0 ? (
                  <small className='text-primary font-weight-bold'>
                    *Last Uploaded At: <br />
                    <Moment format='DD-MMM-YYYY, HH:mm:ss'>
                      {asns.data && asns.data.data[0].date}
                    </Moment>{" "}
                    | By,{" "}
                    {asns.data.data[0].user && asns.data.data[0].user.name}
                  </small>
                ) : (
                  ""
                )}
                <button
                  type='submit'
                  className='btn btn-block btn-primary mt-4'
                >
                  UPLOAD
                </button>
              </div>
            </form>
            <p className='text-center'>Or, </p>
            <AddAsn />
          </div>
          <div className='col-sm-2 text-center'>
            {/* <img src='/track.png' alt=' ' width='70%' className='pt-5' /> */}
          </div>

          <div className='col-sm-5 p-3 card shadow-sm col-md-offset-6'>
            <form
              onSubmit={(e) => onSubmitHandlerTwo(e)}
              encType='multipart/form-data'
              className='text-center'
            >
              <div className='form-group'>
                <b>Stock Movement Report (REP22248) </b> <br />
                <Link to='/grns' className='btn border shadow-sm mt-3'>
                  View Report
                </Link>
                <br />
                <br />
                <div className='input-group'>
                  <div className='input-group-prepend'>
                    <span
                      className='input-group-text'
                      id='inputGroupFileAddon01'
                    >
                      GRN
                    </span>
                  </div>
                  <div className='custom-file'>
                    <input
                      type='file'
                      className='custom-file-input'
                      id='grnFile'
                      aria-describedby='inputGroupFileAddon01'
                      name='grnFile'
                      onChange={onFileChangeTwo}
                      accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                      required
                    />
                    <label className='custom-file-label' for='inputGroupFile01'>
                      Choose file
                    </label>
                  </div>
                </div>
                {grns && grns.result > 0 ? (
                  <small className='text-primary font-weight-bold'>
                    *Last Uploaded At: <br />
                    <Moment format='DD-MMM-YYYY, HH:mm:ss'>
                      {grns.data.data[0].date}
                    </Moment>{" "}
                    | By,{" "}
                    {grns.data.data[0].user && grns.data.data[0].user.name}
                  </small>
                ) : (
                  ""
                )}
                <button
                  type='submit'
                  className='btn btn-block btn-primary mt-4'
                >
                  UPLOAD
                </button>
              </div>
            </form>
            <p className='text-center'>Or, </p>

            <AddGrn />
          </div>
        </div>
        <div className='row text-center'></div>
      </div>
    </div>
  );
};

UploadEcci.propTypes = {
  getLimitedAsns: PropTypes.func.isRequired,
  getLimitedGrns: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  asns: state.asn.asns,
  grns: state.grn.grns,
});

export default connect(mapStatetoProps, {
  getLimitedAsns,
  getLimitedGrns,
})(UploadEcci);
