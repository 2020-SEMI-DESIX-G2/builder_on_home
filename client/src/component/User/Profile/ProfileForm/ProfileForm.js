import React, { useState } from "react";
import { Form, Button, Select } from "semantic-ui-react";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER, GET_USER } from "../../../../gql/user";
import userAuth from "../../../../hooks/useAuth";
import Spinner from '../../../../component/spinner/Spinner';

export default function ProfileForm(props) {
    const [created, setcreated] = useState(false);
    const { auth } = userAuth();
    const username = auth.username;
    const { data } = useQuery(GET_USER, {
        variables: { username },
    });
    const { getUser } = data;


    const [updateProfile] = useMutation(UPDATE_USER);
    const formik = useFormik({
        initialValues: initialValues(getUser),
        validationSchema: Yup.object({
            name: Yup.string().required("Nombre requerido"),
            siteWeb: Yup.string(),
            description: Yup.string(),
            direction: Yup.string(),
            phone_number: Yup.string(),
        }),
        onSubmit: async (formData) => {
            // console.log('Formik data' + formData);
            try {
                const updateUser = formData;

                await updateProfile({
                    variables: {
                        username: props.username,
                        input: updateUser,
                    },
                });
                setcreated(true);
            } catch (error) {
                toast.error(error.message);
                console.log(error);
            }
        },
    });
    return (
        <>
            <Form className="form" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" type="text" id="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.errors.name && true} />
                </div>
                <div className="form-group">
                    <label htmlFor="siteWeb">Web site</label>
                    <input className="form-control" type="text" id="siteWeb"
                        value={formik.values.siteWeb}
                        onChange={formik.handleChange}
                        error={formik.errors.siteWeb && true} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input className="form-control" type="text" id="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.errors.description && true} />
                </div>
                <div className="form-group">
                    <label htmlFor="direction">Direction</label>
                    <input className="form-control" type="text" id="direction"
                        value={formik.values.direction}
                        onChange={formik.handleChange}
                        error={formik.errors.direction && true} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone_number">Phone Number</label>
                    <input className="form-control" type="text" id="phone_number"
                        value={formik.values.phone_number}
                        onChange={formik.handleChange}
                        error={formik.errors.phone_number && true} />
                </div>
                <input type="submit" value="Update" className="btn btn-lg btn-primary float-left" />
            </Form>
            {created ?
                <div className="alert alert-success" role="alert">
                    Profile Update!
                </div>
                : null
            }
        </>
    );
}
function initialValues(user) {
    return {
        name: user.name,
        siteWeb: user.siteWeb,
        description: user.description,
        direction: user.direction,
        phone_number: user.phone_number,
    };
}
