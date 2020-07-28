import React from 'react';

import ServiceContractItem from './ServiceItem/ServiceContractItem';
// import './ServiceList.css';

const ServiceContractList = props => {
  const services = props.services.map(service => {
    return (
      <div className="col-lg-8 col-md-10 mb-8">
        <ServiceContractItem
          key={service.id}
          service={service}
          userID={props.authUserId}
          onDetail={props.onViewDetail}
        />
      </div>
    );
  });

  return <div className="row">{services}</div>;
};

export default ServiceContractList;