import React, { useEffect } from "react";
import { getFeedbacks } from "../_actions/feedbackAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "./ui/Spinner";
import Moment from "react-moment";
const Feedback = ({ getFeedbacks, feedbacks, loading }) => {
  useEffect(() => {
    getFeedbacks();
    //eslint-diable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className='container' style={{ paddingTop: "130px" }}>
      <h5 className='bg-light p-2 border-left border-primary'>
        Complaints & Feedbacks
      </h5>

      <table className='table table-hover table-striped table-responsive-md my-5'>
        <thead style={{ backgroundColor: "#fe912b", color: "#fff" }}>
          <tr>
            <th scope='col'>Vendor Code</th>
            <th scope='col'>Vendor Name</th>
            <th scope='col'>Subject</th>
            <th scope='col'>Message</th>
            <th scope='col'>Date</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.data &&
            feedbacks.data.map((feedback) => (
              <tr key={feedback._id}>
                <td>{feedback.vendorCode && feedback.vendorCode}</td>
                <td>{feedback.vendorName && feedback.vendorName}</td>
                <td>{feedback.subject && feedback.subject}</td>
                <td>{feedback.message && feedback.message}</td>
                <td>
                  <Moment format='DD-MM-YYYY'>{feedback.date}</Moment>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

Feedback.propTypes = {
  getLimitedAsns: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  feedbacks: state.feedback.feedbacks,
  loading: state.feedback.loading,
});

export default connect(mapStatetoProps, {
  getFeedbacks,
})(Feedback);
