import React, { useEffect } from "react";
import { getLimitedGrns } from "../_actions/grnAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FilterGrns from "./FilterGrns";
import Spinner from "./ui/Spinner";
import Moment from "react-moment";
import moment from "moment";

const Grns = ({ getLimitedGrns, grns, filtered, loading }) => {
  useEffect(() => {
    getLimitedGrns();
    //eslint-diable-next-line
  }, []);

  function increaseDateBy1(s, manual) {
    console.log(s, manual);
    if (!manual) {
      var d = moment(s).toDate();
      var increasePlanDate = new Date(d.setDate(d.getDate() + 1));

      return increasePlanDate;
    } else {
      return s;
    }
  }

  return (
    <div className='container-fluid' style={{ paddingTop: "130px" }}>
      <h5 className='bg-light p-2 border-left border-primary'>
        Stock Movement Report V3 (Uploaded in Last 7 days)
      </h5>
      <FilterGrns />

      <div className='tableFixHead'>
        <table className='table table-hover  table-striped my-2'>
          <thead style={{ backgroundColor: "#fe912b", color: "#fff" }}>
            <tr>
              <th scope='col'>PO</th>
              <th scope='col'>Transaction Type</th>
              <th scope='col'>Mode Of Delivery</th>
              <th scope='col'>In Date</th>
              <th scope='col'>Trans Date</th>
              <th scope='col'>Vendor Code</th>
              <th scope='col'>Vendor Name</th>
              <th scope='col'>Uploaded At</th>
              <th scope='col'>Uploaded By</th>
            </tr>
          </thead>

          {!loading ? (
            <tbody>
              {filtered !== null
                ? filtered.map((grn) => (
                  <tr key={grn._id}>
                    <td>{grn.poNumber && grn.poNumber}</td>
                    <td>{grn.transactionType && grn.transactionType}</td>
                    <td>{grn.modeOfDelivery && grn.modeOfDelivery}</td>
                    <td>
                      {" "}
                      <Moment format='DD-MMM-YYYY'>
                        {increaseDateBy1(grn.inDate, grn.manual)}
                      </Moment>{" "}
                    </td>
                    <td>
                      {" "}
                      <Moment format='DD-MMM-YYYY'>
                        {increaseDateBy1(grn.transDate, grn.manual)}
                      </Moment>{" "}
                    </td>

                    <td>{grn.vendorCode && grn.vendorCode}</td>
                    <td>{grn.vendorName && grn.vendorName}</td>
                    <td>
                      <Moment format='DD-MMM-YYYY, HH:mm:ss'>
                        {grn.date && grn.date}
                      </Moment>
                    </td>
                    <td>{grn.user && grn.user.name}</td>
                  </tr>
                ))
                : grns.data &&
                grns.data.data.map((grn) => (
                  <tr key={grn._id}>
                    <td>{grn.poNumber && grn.poNumber}</td>
                    <td>{grn.transactionType && grn.transactionType}</td>
                    <td>{grn.modeOfDelivery && grn.modeOfDelivery}</td>
                    <td>
                      {" "}
                      <Moment format='DD-MMM-YYYY'>
                        {increaseDateBy1(grn.inDate, grn.manual)}
                      </Moment>{" "}
                    </td>
                    <td>
                      {" "}
                      <Moment format='DD-MMM-YYYY'>
                        {increaseDateBy1(grn.transDate, grn.manual)}
                      </Moment>{" "}
                    </td>
                    <td>{grn.vendorCode && grn.vendorCode}</td>
                    <td>{grn.vendorName && grn.vendorName}</td>
                    <td>
                      <Moment format='DD-MMM-YYYY, HH:mm:ss'>
                        {grn.date && grn.date}
                      </Moment>
                    </td>
                    <td>{grn.user && grn.user.name}</td>
                  </tr>
                ))}
            </tbody>
          ) : (
            <Spinner />
          )}
        </table>
      </div>
    </div>
  );
};

Grns.propTypes = {
  getLimitedGrns: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  grns: state.grn.grns,
  loading: state.grn.loading,
  filtered: state.grn.filtered,
});

export default connect(mapStatetoProps, {
  getLimitedGrns,
})(Grns);
