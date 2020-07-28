import './Home.scss';

import React, { Component } from 'react';
import { GET_SERVICES } from '../../gql/service';
import { useQuery } from "@apollo/client";
import Spinner from '../../component/spinner/Spinner';
import ServiceContractList from '../../component/Services/ServicetList/ServiceContraList.js';
import userAuth from "../../hooks/useAuth";
import { get } from 'lodash';

// import './Service.css';

export default function HomePage() {
    const { auth } = userAuth();
    const { username } = "";
    const { data, loading, error, refetch } = useQuery(GET_SERVICES, {
        variables: { username },
    });

    if (loading) return null;
    if (error) return <h1>Services not found</h1>;
    const { getServices } = data;
    console.log('get services');
    console.log(Object.keys(getServices.services));


    return (
        <>
            <React.Fragment>
                <div className="container">
                    <div className="col-lg-12">
                        <div className="row">
                            <h1>Services</h1>
                            {this.state.isLoading ? (
                                <Spinner />
                            ) : (
                                    <ServiceContractList
                                        services={getServices.services}
                                        authUserId={auth}
                                        onViewDetail={this.showDetailHandler}
                                    />
                                )}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </>
    );
}