import React from 'react';

// import './ServiceItem.css';

const ServiceItem = props => (
  <>
    <li className="list-group-item d-flex justify-content-between lh-condensed" key={props.service.id}>
      <div>
        <h6 className="my-0">{props.service.name}</h6>
        <small className="text-muted">
          {props.service.description}
        </small>
      </div>
      <span className="text-muted">{props.service.price} $</span>
    </li>
  </>
);

export default ServiceItem;