import React from 'react';

// import './ServiceItem.css';

const ServiceItem = props => (
  <li key={props.serviceId} className="services__list-item">
    <div>
      <h1>{props.name}</h1>
      <h2>
        ${props.price}
      </h2>
      <h3>
      <select className="form-control-static" value={props.categoryID} readOnly>
        <option value="1">Wall Build</option>
        <option value="2">Project Budget</option>
        <option value="3">Structural Design</option>
        <option value="4">Interior Design</option>
        <option value="5">Demolition</option>
        <option value="6">Weld</option>
      </select>
      </h3>
    </div>
    <div>
      {props.userID === props.creatorId ? (
        <p>You're the owner of this service.</p>
      ) : (
        <button className="btn" onClick={props.onDetail.bind(this, props.serviceId)}>
          View Details
        </button>
      )}
    </div>
  </li>
);

export default ServiceItem;