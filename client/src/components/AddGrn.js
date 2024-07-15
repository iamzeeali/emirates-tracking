import React, { useState } from "react";
import Input from "./ui/Input";
import { addManualGrn } from "../_actions/grnAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AddGrn = ({ addManualGrn }) => {
  const [formData, setFormData] = useState({
    poNumber: "",
    giNumber: "",
    transactionType: "GRN",
    modeOfDelivery: "MILK RUN",
    vendorCode: "",
    vendorName: "",
    inDate: "",
    transDate: "",
    manual: true,
  });

  const {
    poNumber,
    giNumber,
    transactionType,
    modeOfDelivery,
    vendorCode,
    vendorName,
    inDate,
    transDate,
  } = formData;

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addManualGrn(formData);
    document.getElementById("closeGrnModal").click();
  };
  return (
    <div>
      <button
        type='button'
        className='btn btn-primary btn-block'
        data-toggle='modal'
        data-target='#grnModal'
      >
        Add Manually
      </button>

      <div
        className='modal fade'
        id='grnModal'
        tabindex='-1'
        role='dialog'
        aria-labelledby='grnModalTitle'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='grnModalLongTitle'>
                Add Stock Movement
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form onSubmit={(e) => onSubmitHandler(e)}>
                <Input
                  placeholder='PO Number'
                  className='form-control'
                  type='number'
                  name='poNumber'
                  value={poNumber}
                  required={true}
                  autoFocus={true}
                  onChange={(e) => onChangeHandler(e)}
                />
                <br />
                <Input
                  placeholder='GI Number'
                  className='form-control'
                  type='text'
                  name='giNumber'
                  value={giNumber}
                  onChange={(e) => onChangeHandler(e)}
                />
                <br />
                <select
                  placeholder='Transaction Type'
                  className='form-control'
                  name='transactionType'
                  value={transactionType}
                  required={true}
                  onChange={(e) => onChangeHandler(e)}
                >
                  <option value='GRN'> GRN</option>
                  <option value='DO'> DO</option>
                </select>
                <br />
                <select
                  placeholder='Mode Of Delivery'
                  className='form-control'
                  name='modeOfDelivery'
                  value={modeOfDelivery}
                  required={true}
                  onChange={(e) => onChangeHandler(e)}
                >
                  <option value='MILK RUN'>MILK RUN</option>
                  <option value='DIRECT DELIVERY'>DIRECT DELIVERY</option>
                </select>
                <br />
                <Input
                  placeholder='Vendor Code'
                  className='form-control'
                  type='text'
                  name='vendorCode'
                  value={vendorCode}
                  onChange={(e) => onChangeHandler(e)}
                  required={true}
                />
                <br />
                <Input
                  placeholder='Vendor Name'
                  className='form-control'
                  type='text'
                  name='vendorName'
                  value={vendorName}
                  onChange={(e) => onChangeHandler(e)}
                  required={true}
                />
                <br />
                <label for='basic-url' className='form-label'>
                  In Date
                </label>
                <Input
                  placeholder='In Date'
                  className='form-control'
                  type='date'
                  name='inDate'
                  value={inDate}
                  onChange={(e) => onChangeHandler(e)}
                  required={true}
                />
                <br />
                <label for='basic-url' className='form-label'>
                  Trans Date
                </label>
                <Input
                  placeholder='Trans Date'
                  className='form-control'
                  type='date'
                  name='transDate'
                  value={transDate}
                  onChange={(e) => onChangeHandler(e)}
                />
                <br />
                <div class='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-dismiss='modal'
                    aria-label='Close'
                    id='closeGrnModal'
                  >
                    Close
                  </button>
                  <button type='submit' class='btn btn-primary'>
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AddGrn.propTypes = {
  addManualGrn: PropTypes.func.isRequired,
};

export default connect(null, {
  addManualGrn,
})(AddGrn);
