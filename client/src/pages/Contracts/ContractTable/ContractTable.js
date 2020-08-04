import React from 'react';
import { MDBDataTable } from 'mdbreact';

const DatatablePage = (props) => {
    const contracts = props.contracts;
    console.log('contract table ' + contracts);
    const data = {
        columns: [
            {
                label: 'Detail',
                field: 'detail',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Status',
                field: 'stateID',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Payment',
                field: 'payment',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Service',
                field: 'serviceID',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Price',
                field: 'price',
                sort: 'asc',
                width: 200
            },
        ],
        rows: contracts
    };

    return (
        <>
            {contracts
                ?
                < MDBDataTable
                    striped
                    bordered
                    small
                />
                : null}
        </>
    );
}

export default DatatablePage;