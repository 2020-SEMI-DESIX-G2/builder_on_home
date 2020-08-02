import React from 'react';
import { GET_SERVICES } from '../../../gql/service';
import { useQuery } from "@apollo/client";
import Spinner from '../../../component/spinner/Spinner';
import ServiceContractList from '../../../component/Services/ServicetList/ServiceContraList.js';
import userAuth from "../../../hooks/useAuth";

export default function HomeServices() {
    const { auth } = userAuth();
    const { data, loading, error, refetch } = useQuery(GET_SERVICES, {
        variables: { username: auth.username },
    });

    if (loading) return <Spinner />;
    if (error) return <h1>Services not found</h1>;
    const { getServices } = data;

    return (
        <>
            <ServiceContractList
                services={getServices}
                authUserId={auth.id}
            />
        </>
    );
}