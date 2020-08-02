import gql from "graphql-tag";


export const REGISTER = gql`
  mutation register($input: UserInput) {
    register(input: $input) {
      id
      name
      username
      email
      createAt
    }
  }
`;

export const LOGIN = gql`
mutation login($input: LoginInput){
  login(input: $input) {
    token
  }
}
`;

export const GET_USER = gql`
  query getUser($id: ID, $username: String) {
    getUser(id: $id, username: $username) {
      id
      username
      email
      type
      avatar
      name
      siteWeb
      direction
      phone_number
      description
    }
  }
`;

export const UPDATE_AVATAR = gql`
  mutation updateAvatar($file: Upload) {
    updateAvatar(file: $file) {
      status
      urlAvatar
    }
  }
`;

export const DELETE_AVATAR = gql`
  mutation deleteAvatar {
    deleteAvatar
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($username: String, $input: UserUpdateInput){
  updateUser(username: $username, input: $input){
    name
    username
    email
    siteWeb
    description
    direction
    phone_number 
  }
}
`;

export const SEARCH = gql`
  query search($search: String) {
    search(search: $search) {
      name
      username
      avatar
    }
  }
`;

export const GET_CONTRACTS = gql`
  query search($search: String) {
    search(search: $search) {
      name
      username
      avatar
    }
  }
`;
