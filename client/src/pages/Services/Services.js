import React from 'react';
import { GET_USER_SERVICES } from '../../gql/service';
import { useQuery } from "@apollo/client";
import Spinner from '../../component/spinner/Spinner';
import ServiceContractList from '../../component/Services/ServicetList/ServiceContraList.js';
import ServiceList from '../../component/Services/ServicetList/ServiceList';
import userAuth from "../../hooks/useAuth";
import { Container } from 'semantic-ui-react';
import ServiceForm from '../../component/Services/ServiceForm';
import Error404 from '../Error404'

export default function Services() {
    const { auth } = userAuth();
    const { data, loading, error } = useQuery(GET_USER_SERVICES, {
        variables: { username: auth.username },
    });

    if (loading) return <Spinner />;
    if (error) return <h1>Loading....</h1>;
    const { getUserServices } = data;
    // console.log(Object.keys(auth));
    if (auth.type != "WORKER") {
        return <Error404 />
    }

    return (
        <>
            <div className="container-fluid">
                <div className="py-5 text-center">
                    <img className="d-block mx-auto mb-4" src="/docs/4.5/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                    <h2>My Services</h2>
                    <p className="lead"></p>
                </div>
                <div className="row">
                    <div className="col-md-8 order-md-1">
                        <ServiceForm />
                    </div>
                    <div className="col-md-4 order-md-2 mb-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Your Services</span>
                            {/* <span className="badge badge-secondary badge-pill">3</span> */}
                        </h4>
                        <div className="row">
                            <ServiceList
                                services={getUserServices}
                                authUserId={auth.id}
                            />
                        </div>

                    </div>
                </div>
            </div>


        </>
    );
}