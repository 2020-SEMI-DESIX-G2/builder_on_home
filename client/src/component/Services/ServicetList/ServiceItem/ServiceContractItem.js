import React from 'react';
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../../gql/user";
import userAuth from "../../../../hooks/useAuth";
// import './ServiceContractItem.css';


export default function ServiceContractItem(props) {
    const { data, loading, error, refetch } = useQuery(GET_USER, {
        variables: { id: props.service.userID, username: "" },
    });
    if (loading) return null;
    if (error) return <h1>user not found</h1>;
    const { getUser } = data;

    return (
        <>
            <div className="card h-100" key={props.service.id}>
                <a href="#"><img className="card-img-top" src="http://placehold.it/700x400" alt="" /></a>
                <div className="card-body">
                    <h4 className="card-title">
                        {getUser != null ? <ha className="card-title font-weight-bold mb-2">{getUser.name}</ha> : "No Worker"}
                    </h4>
                    <h5>{props.service.name}</h5>
                    <h5>{props.service.price} $</h5>
                    {getUser != null ? <p className="card-text"><i className="far fa-clock pr-2"></i>{getUser.phone_number}</p> : "without phone number"}
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
        </>
    );
}