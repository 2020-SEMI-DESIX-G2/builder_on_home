import React from 'react';

// import './ServiceContractItem.css';

const ServiceContractItem = props => (
    <div className="card h-100" key={props.service.id}>
        <a href="#"><img className="card-img-top" src="http://placehold.it/700x400" alt="" /></a>
        <div className="card-body">
            <h4 className="card-title">
                {props.worker != null ? <ha className="card-title font-weight-bold mb-2">{props.worker.name}</ha> : "No Worker"}
            </h4>
            <h5>{props.service.name}</h5>
            <h5>{props.service.price}</h5>
            {props.worker != null ? <p className="card-text"><i className="far fa-clock pr-2"></i>{props.worker.phone_number}</p> : "without phone number"}
            <p className="card-text">{props.service.description}</p>
        </div>
        <div className="card-footer">
            <small className="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
        </div>
        <div className="card-body">

            <div className="collapse-content">
                <button className="btn btn-lg btn-primary" type="submit">Contratar</button>

            </div>
        </div>
    </div>
);

export default ServiceContractItem;