import React, { useState } from "react";
import { Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import useAuth from "../../../hooks/useAuth";
// import ModalUpload from "../../Modal/ModalUpload";
import ImageNoFound from "../../../assets/png/avatar.png";
import "./RightHeader.scss";

export default function RightHeader() {
  const [showModal, setShowModal] = useState(false);
  const { auth } = useAuth();
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username: auth.username },
  });

  if (loading || error) return null;
  const { getUser } = data;

  return (
    <Link to={`/profile/${auth.username}`} className="nav-link">
      <Image className="profile-image img-circle" src={getUser.avatar ? getUser.avatar : ImageNoFound} avatar />
    </Link>
  );
}
