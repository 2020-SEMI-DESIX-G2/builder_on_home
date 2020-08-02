import React from 'react';

// import './ServiceItem.css';

const ServiceItem = props => (
  <>
    <div className="card" key={props.service.id}>
      <a href="#"><img className="card-img-top" src="http://placehold.it/700x400" alt="" /></a>

      <h4 className="card-title">
        {props.service.name}
      </h4>
      <div className="card-body">
        <h2>
          ${props.service.price}
        </h2>
        <h3>
          <select className="form-control-static" value={props.service.categoryID} readonly>
            <option value="1">Wall Build</option>
            <option value="2">Project Budget</option>
            <option value="3">Structural Design</option>
            <option value="4">Interior Design</option>
            <option value="5">Demolition</option>
            <option value="6">Weld</option>
          </select>
        </h3>
        {/* <div>
      {props.userID === props.creatorId ? (
        <p>You're the owner of this service.</p>
      ) : (
        <button className="btn" onClick={props.onDetail.bind(this, props.serviceId)}>
          View Details
        </button>
      )}
    </div> */}
      </div>
      <div className="card-footer">

      </div>
    </div>
  </>
);

export default ServiceItem;