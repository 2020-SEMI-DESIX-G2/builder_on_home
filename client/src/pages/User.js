import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { size } from "lodash";
import { useQuery } from "@apollo/client";
import Profile from "../component/User/Profile";

export default function User() {
  const { username } = useParams();
  // const { data, loading, startPolling, stopPolling } = useQuery(
  //   GET_PUBLICATIONS,
  //   {
  //     variables: { username },
  //   }
  // );

  // useEffect(() => {
  //   startPolling(1000);
  //   return () => {
  //     startPolling();
  //   };
  // }, [startPolling, stopPolling]);

  // if (loading) return null;
  // const { getPublications } = data;

  return (
    <>
      {/* <Profile username={username} totalPublications={size(getPublications)} /> */}
      <Profile username={username} />

      {/* <Publications getPublications={getPublications} /> */}
    </>
  );
}