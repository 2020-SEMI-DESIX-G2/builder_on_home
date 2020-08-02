import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../../gql/user";
import userAuth from "../../../../hooks/useAuth";
import Modal from 'react-modal';
import { Button } from 'semantic-ui-react';
import ContractForm from '../../../Contracts/ContractForm';
// import './ServiceContractItem.css';

Modal.setAppElement('#root');
export default function ServiceContractItem(props) {
    const [showModal, setshowModal] = useState(false);
    const { auth } = userAuth();
    const { data, loading, error, refetch } = useQuery(GET_USER, {
        variables: { id: props.service.userID, username: "" },
    });
    if (loading) return null;
    if (error) return <h1>user not found</h1>;
    const { getUser } = data;
    const onOpen = () => {
        setshowModal(true);
        console.log('open? ' + showModal);
    };

    return (
        <>
            <div className="card h-100" key={props.service.id}>
                <a href="#"><img className="card-img-top" src="http://placehold.it/700x400" alt="" /></a>
                <div className="card-body">
                    Trabajador: <h4 className="card-title">
                        {getUser != null ? <q className="card-title font-weight-bold mb-2">{getUser.name}</q> : "No Worker"}
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
                        <Button onClick={() => onOpen()} className="btn btn-lg btn-primary float-right">Contract</Button>
                        <Modal isOpen={showModal} onRequestClose={() => setshowModal(false)}>
                            <h2>Create Contract</h2>
                            <div>
                                <ContractForm worker={getUser} service={props.service} username={auth.username}/>
                                <Button onClick={() => setshowModal(false)} className="btn btn-lg btn-secondary float-right">Close</Button>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    );
}