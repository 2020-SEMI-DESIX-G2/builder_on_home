import React from 'react';

import ServiceItem from './ServiceItem/ServiceItem';
// import './ServiceList.css';

const ServiceList = props => {
  const services = props.services.map(service => {
    return (
      <ServiceItem
        key={service.id}
        service={service}
        userID={props.authUserId}
        onDetail={props.onViewDetail}
      />
    );
  });

  return <ul className="list-group mb-3">{services}</ul>;
};

export default ServiceList;