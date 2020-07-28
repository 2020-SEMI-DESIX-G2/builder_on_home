import React, { useState, useCallback } from "react";
import { Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import AuthContext from '../../context/auth-context';
export default function Profile(props) {
    // const { setShowModal, auth } = props;
    const [loading, setLoading] = useState(false);
  
    const [updateAvatar] = useMutation(UPDATE_AVATAR);
  
    const onDrop = useCallback(async (acceptedFile) => {
      const file = acceptedFile[0];
  
      try {
        const result = await updateAvatar({ variables: { file } });
        console.log(result);
        const { data } = result;
  
        if (!data.updateAvatar.status) {
          toast.warning("Error al actualizar el avatar");
          setLoading(false);
        } else {
            console.log(data.updateAvatar.status);
        }
      } catch (error) {
        console.log(error);
      }
    }, []);
  
    const { getRootProps, getInputProps } = useDropzone({
      accept: "image/jpeg, image/png",
      noKeyboard: true,
      multiple: false,
      onDrop,
    });
  
    return (
      <div className="avatar-form">
        <Button {...getRootProps()} loading={loading}>
          Cargar una foto
        </Button>
        <input {...getInputProps()} />
      </div>
    );
}