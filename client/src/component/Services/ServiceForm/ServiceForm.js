import React from "react";
import { Form, Button, Select } from "semantic-ui-react";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { CREATE_SERVICE } from "../../../gql/service";
import userAuth from "../../../hooks/useAuth";

export default function ServiceForm(props) {
    const { setShowLogin } = props;
    const { auth } = userAuth();
    const [createService] = useMutation(CREATE_SERVICE);
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            name: Yup.string().required("Titulo de servicio requerido"),
            description: Yup.string()
                .required("La descripcion es obligatoria"),
            price: Yup.number()
                .required("El precio es necesario"),
        }),
        onSubmit: async (formData) => {
            console.log('Formik data' + formData);
            try {
                const newService = formData;
                delete newService.repeatPassword;

                await createService({
                    variables: {
                        username: auth.username,
                        input: newService,
                    },
                });
                toast.success("Servicio registrado correctamente");
                setShowLogin(true);
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
                    <input className="form-control" type="text" id="name" />
                </div>
                <div className="form-group row">
                    <div className="col-8">
                        <select id="categoryID" name="categoryID" className="custom-select">
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
                    <input className="form-control" type="text" id="description" />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input className="form-control" type="text" id="price" />
                </div>
                <Button type="submit" className="btn-submit btn-success">
                    Crear Servicio
                </Button>
            </Form>
        </>
    );
}
function initialValues() {
    return {
        name: "",
        description: "",
        price: 0,
    };
}

// input ContractInput {
//     userID: String!,
//     clientID: String!,
//     serviceID: String!,
//     detail: String,
//     price: Float,
//   }