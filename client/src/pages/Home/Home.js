import './Home.scss';

import React from 'react';
import { GET_SERVICES } from '../../gql/service';
import { useQuery } from "@apollo/client";
import Spinner from '../../component/spinner/Spinner';
import ServiceContractList from '../../component/Services/ServicetList/ServiceContraList.js';
import userAuth from "../../hooks/useAuth";
import { get } from 'lodash';
import { map } from "lodash";

// import './Service.css';

export default function HomePage() {
    const { auth } = userAuth();
    const { data, loading, error, refetch } = useQuery(GET_SERVICES, {
        variables: { username: auth.username },
    });

    if (loading) return <Spinner />;
    if (error) return <h1>Services not found</h1>;
    const { getServices } = data;

    return (
        <>
            <React.Fragment>
                <div className="container">
                    <div className="col-lg-12">
                        <div className="row">
                            {/* {map(getServices, (service, index) => (
                                <h1>{service.name}</h1>
                            ))} */}
                            <ServiceContractList
                                services={getServices}
                                authUserId={auth.id}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </>
    );
}