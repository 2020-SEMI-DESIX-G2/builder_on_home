import React from 'react';

import ServiceContractItem from './ServiceItem/ServiceContractItem';
import userAuth from "../../../hooks/useAuth";
// import './ServiceList.css';

const ServiceContractList = props => {
  const { auth } = userAuth();
  const services = props.services.map(service => {
    return (
      <div className="col-lg-8 col-md-10 mb-8">
        {service.userID != props.authUserId ?
          <ServiceContractItem
            key={service.id}
            service={service}
            userID={props.authUserId}
            onDetail={props.onViewDetail}
          />
          :
          <></>
        }
      </div>
    );
  });

  return <div className="row">{services}</div>;
};

export default ServiceContractList;

// { getUser != null ? <ha className="card-title font-weight-bold mb-2">{getUser.name}</ha> : "No Worker" }