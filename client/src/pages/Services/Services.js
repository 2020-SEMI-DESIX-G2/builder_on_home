import React from 'react';
import { GET_USER_SERVICES } from '../../gql/service';
import { useQuery } from "@apollo/client";
import Spinner from '../../component/spinner/Spinner';
import ServiceContractList from '../../component/Services/ServicetList/ServiceContraList.js';
import userAuth from "../../hooks/useAuth";
import { Container } from 'semantic-ui-react';
import ServiceForm from '../../component/Services/ServiceForm';

export default function Services() {
    const { auth } = userAuth();
    const { data, loading, error, refetch } = useQuery(GET_USER_SERVICES, {
        variables: { username: auth.username },
    });

    if (loading) return <Spinner />;
    if (error) return <h1>Services not found</h1>;
    const { getServices } = data;

    return (
        <>
            <ServiceForm />

            <ServiceContractList
                services={getServices}
                authUserId={auth.id}
            />

        </>
    );
}