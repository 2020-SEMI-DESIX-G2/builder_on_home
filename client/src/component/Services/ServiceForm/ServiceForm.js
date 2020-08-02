import React, { useState } from "react";
import { Form, Button, Select } from "semantic-ui-react";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { CREATE_SERVICE } from "../../../gql/service";
import userAuth from "../../../hooks/useAuth";

export default function ServiceForm(props) {
    const [created, setcreated] = useState(false);
    const { auth } = userAuth();
    const [createService] = useMutation(CREATE_SERVICE);
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            name: Yup.string().required("Titulo de servicio requerido"),
            categoryID: Yup.string(),
            description: Yup.string()
                .required("La descripcion es obligatoria"),
            price: Yup.number()
                .required("El precio es necesario"),
        }),
        onSubmit: async (formData) => {
            console.log('Formik data' + formData);
            try {
                const newService = formData;

                await createService({
                    variables: {
                        username: auth.username,
                        input: newService,
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
                    <label htmlFor="name">Service Name</label>
                    <input className="form-control" type="text" id="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.errors.name && true} />
                </div>
                <div className="form-group row">
                    <div className="col-8">
                        <select id="categoryID" name="categoryID" className="custom-select"
                            value={formik.values.categoryID}
                            onChange={formik.handleChange}
                            error={formik.errors.categoryID && true}>
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
                    <label htmlFor="description">Service Description</label>
                    <input className="form-control" type="text" id="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.errors.description && true} />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input className="form-control" type="number" id="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        error={formik.errors.price && true} />
                </div>
                <input type="submit" value="Crear" className="btn btn-lg btn-primary float-left"/>
            </Form>
            {created ?
                <div class="alert alert-success" role="alert">
                    Service Created!
                </div>
                : null
            }
        </>
    );
}
function initialValues() {
    return {
        name: "",
        categoryID: "",
        description: "",
        price: 0,
    };
}