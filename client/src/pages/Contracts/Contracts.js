import React from 'react';
import './Contracts.scss';
import userAuth from "../../hooks/useAuth";
import ClientContracts from './ClientContracts';
import WorkerContracts from './WorkerContracts';

export default function Services() {
    const { auth } = userAuth();
    const user_type = auth.type;

    return (
        <>
            {user_type == "WORKER" ? <WorkerContracts/> : <ClientContracts />}
        </>
    );
}