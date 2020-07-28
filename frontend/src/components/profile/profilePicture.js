import React, { useState, useCallback } from "react";
import { Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import AuthContext from '../../context/auth-context';
import { UPDATE_AVATAR } from '../../gql/user';
import formData from "form-data";
import fs from "fs";
export default function ProfilePage(props) {
  // const { setShowModal, auth } = props;
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFile) => {
    const image = acceptedFile[0];

    const query = `
    mutation uploadImage($image: Upload!) {
      uploadImage(image: $image)
    }
  `;
    // The operation contains the mutation itself as "query"
    // and the variables that are associated with the arguments
    // The file variable is null because we can only pass text
    // in operation variables
    const operation = {
      query,
      variables: {
        image: null
      }
    };
    // This map is used to associate the file saved in the body
    // of the request under "0" with the operation variable "variables.file"
    const map = {
      "0": ["variables.image"]
    };
    // This is the body of the request
    // the FormData constructor builds a multipart/form-data request body
    // Here we add the operation, map, and file to upload
    const body = new FormData();
    body.append("operations", JSON.stringify(operation));
    body.append("map", JSON.stringify(map));
    body.append(0, image);
    console.log(body);
    // Create the options of our POST request
    const opts = {
      method: "POST",
      body
    };
    // Send the fetch request to the API
    // Parse the response as json and obtain the resulting data
    const { data } = await fetch("http://localhost:8000/graphql", opts).then(
      res => res.json()
    );
    

  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  return (
    <div className="avatar-form">
      <Button {...getRootProps()} >
        Cargar una foto
        </Button>
      <input {...getInputProps()} />
    </div>
  );
}
// import React, { Component } from 'react';
// import formData from "form-data";
// import fs from "fs";
// import { useMutation } from "@apollo/client";
// import axios from 'axios';
// import Spinner from '../../components/spinner/Spinner';
// import AuthContext from '../../context/auth-context';
// import { UPDATE_AVATAR } from '../../gql/user';

// class ProfilePage extends Component {
//     state = {
//         creating: false,
//         userInfo: [],
//         isLoading: false,
//         selectedService: null
//     };
//     static contextType = AuthContext;

//     constructor(props) {
//         super(props);
//         this.imageEl = React.createRef();
//     }
//     submitHandler = async event =>{
//         event.preventDefault();
//         const [UpdateAvatar] = useMutation(UPDATE_AVATAR);
//         const image = this.imageEl.current.value;
//         try {
//             const result = await UpdateAvatar({variables: { image }});
//             console.log(result);
//         }catch(error){

//         }
//         // const image = this.imageEl.current.value;
//         // // if (
//         // //     name.trim().legth === 0 ||
//         // //     phone_number.trim().legth === 0 ||
//         // //     type.trim().legth === 0
//         // // ) {
//         // //     return;
//         // // }


//         // let o = {
//         //     query: `mutation {
//         //         UpdateAvatar(image: $image){
//         //         status
//         //         url
//         //         }
//         //     }`,
//         //     variables: {
//         //         image: image
//         //     }
//         // }
//         // console.log(o);
//         // let map = {
//         //     '0': ['variables.image']
//         // }

//         // const token = this.context.token;
//         // let fd = new FormData();
//         // fd.append('operations', JSON.stringify(o));
//         // fd.append('map', JSON.stringify(map));
//         // fd.append(0, image);
//         // console.log('Before send');
//         // let res = await axios.post('http://localhost:8000/graphql', fd, {
//         //     headers: {
//         //         'Content-Type': 'application/json',
//         //         'Authorization': 'Bearer ' + token
//         //     }
//         //   });
//         //   console.log(res);
//         // //   expect(res.status).to.be.equal(200);
//         // //   expect(res.data).to.be.jsonSchema(schema)
//         //   console.log(res.status);

//         // console.log(service);
//     };

//     render() {
//         return (
//             <div className="container">
//                 {this.state.isLoading ? (
//                     <Spinner />
//                 ) : (
//                         <div className="col-md-12 center">
//                             <div className="card">
//                                 <div className="card-body">
//                                     <div className="row">
//                                         <div className="col-md-12">
//                                             <form onSubmit={this.submitHandler}>
//                                                 <div className="form-group row">
//                                                     <label htmlFor="image" className="col-4 col-form-label">image*</label>
//                                                     <div className="col-8">
//                                                         <input id="image" name="image" placeholder="Name" defaultValue="" className="form-control" required="required" type="file" ref={this.imageEl} />
//                                                     </div>
//                                                 </div>
//                                                 <div className="form-group row">
//                                                     <div className="offset-4 col-8">
//                                                         <button className="btn btn-lg btn-success" type="submit">Submit</button>
//                                                     </div>
//                                                 </div>
//                                             </form>
//                                         </div>

//                                     </div>

//                                 </div>
//                             </div>
//                         </div>
//                     )}
//             </div>
//         );
//     }
// }

// export default ProfilePage;