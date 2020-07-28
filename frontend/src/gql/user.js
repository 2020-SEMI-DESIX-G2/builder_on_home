import gql from "graphql-tag";


export const UPDATE_AVATAR = gql`
mutation UpdateAvatar($file: Upload){
    UpdateAvatar(file:$file){
      filename
    }
  }`;