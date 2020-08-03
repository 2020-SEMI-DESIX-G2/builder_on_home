import React, { useState } from "react";
import { Form, Button, Select } from "semantic-ui-react";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { CREATE_CONTRACT } from "../../../gql/contract";
import PaypalCheckoutButton from '../../PaypalButton';

/**
 * 
 * @param {workerID: String,
    workerID: String,
    serviceID: String!,
    detail: String,
    price: Float,} props 
 */

export default function ContractForm(props) {
    // console.log('contract ' + Object.keys(props));
    // let setResp = this;
    const { worker, service } = props;
    const [created, setcreated] = useState(false);
    const [contractData, setcontractData] = useState({});
    const [contractID, setcontractID] = useState(undefined);
    const [createContract] = useMutation(CREATE_CONTRACT);
    const formik = useFormik({
        initialValues: initialValues(worker, service),
        validationSchema: Yup.object({
            detail: Yup.string()
                .required("El detalle del trabajo es necesario"),
            workerID: Yup.string(),
            serviceID: Yup.string(),
            price: Yup.number()
                .required("El precio es necesario"),
        }),
        onSubmit: async (formData) => {
            formData.workerID = worker.id;
            setcontractData(setOrder(worker, service));
            // console.log('Formik data ' + props.username);
            try {
                const newContract = formData;

                const contract = await createContract({
                    variables: {
                        username: props.username,
                        input: newContract,
                    },
                });
                setcontractID(contract.data.createContract);
                setcreated(true);
            } catch (error) {
                // toast.error(error);
                console.log(error.message);
            }
        },
    });

    // console.log('contract data ' + contractData);
    return (
        <>
            <Form className="form" onSubmit={formik.handleSubmit}>
                <h1>Servicio: {props.service.name}</h1>
                <h3>Trabajador: {worker.name}</h3>
                <div className="form-group">
                    <label htmlFor="detail">Detail</label>
                    <textarea
                        className="form-control" type="text" id="detail"
                        value={formik.values.detail}
                        onChange={formik.handleChange}
                        error={formik.errors.detail && true}>

                    </textarea>
                </div>
                <div className="form-group">
                    <input className="form-control" type="text" id="workerID"
                        value={formik.values.workerID}
                        onChange={formik.handleChange}
                        error={formik.errors.workerID && true} hidden />
                </div>
                <div className="form-group row">
                    <div className="col-8">

                        <label htmlFor="serviceID">Service Type</label>
                        <select id="serviceID" name="serviceID" className="custom-select"
                            value={formik.values.serviceID}
                            onChange={formik.handleChange}
                            error={formik.errors.serviceID && true}>
                            <option value="1">Wall Build</option>
                            <option value="2">Project Budget</option>
                            <option value="3">Structural Design</option>
                            <option value="4">Interior Design</option>
                            <option value="5">Demolition</option>
                            <option value="6">Weld</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input className="form-control" type="number" id="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        error={formik.errors.price && true} readOnly />
                </div>
                <input type="submit" value="Create Contract" className="btn btn-lg btn-primary float-left" />

            </Form>
            {created ?
                <>
                    <PaypalCheckoutButton order={contractData} contract={contractID} className="float-rigth" />
                    <div className="alert alert-success" role="alert">
                        Contract Created!
                </div>
                </>
                : null
            }
        </>
    );
}
function initialValues(worker, service) {
    return {
        detail: "",
        workerID: worker.id,
        serviceID: service.categoryID,
        price: service.price,
    };
}


function setOrder(worker, service){
    const order = {
        customer: worker.name,
        total: service.price,
        items: [
            {
                sku: service.id,
                name: service.detail,
                price: service.price,
                quantity: 1,
                currency: 'USD'
            },
        ],
    };
    return order;
}