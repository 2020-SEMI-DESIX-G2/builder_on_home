import React from 'react';

import ServiceContractItem from './ServiceItem/ServiceContractItem';
// import './ServiceList.css';

const ServiceContractList = props => {
  const services = props.services.map(service => {
    let worker = service.worker;
    // if (worker != null){
    //   console.log(Object.keys(worker));
    // }
    return (
      <div className="col-lg-6 col-md-8 mb-6">
        <ServiceContractItem
          key={service.id}
          service={service}
          worker={worker}
          userID={props.authUserId}
          onDetail={props.onViewDetail}
        />
      </div>
    );
  });

  return <div className="row">{services}</div>;
};

export default ServiceContractList;