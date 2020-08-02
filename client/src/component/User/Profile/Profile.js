import React, { useState } from "react";
import { Grid, Image, Button } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import userAuth from "../../../hooks/useAuth";
// import UserNotFound from "../../UserNotFound";
import AvatarForm from "../AvatarForm";
import ImageNoFound from "../../../assets/png/avatar.png";
import "./Profile.scss";
import ProfileForm from './ProfileForm';
import Modal from 'react-modal';

export default function Profile(props) {
  const { username } = props;
  const { auth } = userAuth();
  const [showModal, setshowModal] = useState(false);
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { username },
  });

  if (loading) return null;
  if (error) return <h1>user Profilenot found</h1>;
  const { getUser } = data;
  const onOpen = () => {
    setshowModal(true);
    console.log('open? ' + showModal);
  };

  return (
    <>
      <Grid className="profile">
        <Grid.Column width={5} className="profile__left">
          <Image
            src={getUser.avatar ? getUser.avatar : ImageNoFound}
            avatar
            onClick={() => onOpen()}
          />

        </Grid.Column>
        <Grid.Column width={5} className="profile__left">
          <ProfileForm username={auth.username} />
        </Grid.Column>

      </Grid>
      <Modal isOpen={showModal} onRequestClose={() => setshowModal(false)}>
        <h2>Cargar Foto Contract</h2>
        <div>
          <AvatarForm auth={auth} />
          <Button onClick={() => setshowModal(false)} className="btn btn-lg btn-secondary float-right">Close</Button>
        </div>
      </Modal>
    </>
  );
}
