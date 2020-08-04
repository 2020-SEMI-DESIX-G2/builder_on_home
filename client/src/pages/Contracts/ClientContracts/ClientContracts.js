import React from 'react';
import { useQuery } from "@apollo/client";
import Spinner from '../../../component/spinner/Spinner';
import Error404 from '../../Error404';
import { GET_CLIENT_CONTRACTS } from '../../../gql/contract';
import userAuth from "../../../hooks/useAuth";
import ContractTable from '../ContractTable';

export default function ClientContracts(props) {
    const { auth } = userAuth();
    const { data, loading, error } = useQuery(GET_CLIENT_CONTRACTS, {
        variables: { username: auth.username },
    });

    if (loading) return <Spinner />;
    if (error) return <h1>Loading....</h1>;
    const { getClientContracts } = data;
    // console.log(Object.keys(auth));
    if (auth.type == "WORKER") {
        return <Error404 />
    }
    return (

        <>
            <h1> ClientContracts </h1>
            {getClientContracts ? <ContractTable contracts={getClientContracts} /> : null}
        </>

    )
}