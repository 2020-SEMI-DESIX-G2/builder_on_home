import gql from "graphql-tag";


export const CREATE_SERVICE = gql`
   mutation createService($input:ServiceInput){
  createService(input: $input){
    created
  }
}
`;

export const GET_USER_SERVICES = gql`
  query getServices($username: String){
    getServices(username: $username){
    id
    name
    userID
    categoryID
    description
    price
  }
}
`;

export const GET_SERVICES = gql`
  query getServices($username: String){
  getServices(username: $username){
    id
    name
    userID
    categoryID
    description
    price
  }
}
`;
export const GET_SERVICE = gql`
  query getService($id: ID){
    getService(id: $id){
    id
    name
    userID
    categoryID
    description
    price
  }
}
`;

export const UPDATE_SERVICE = gql`
  mutation updateService($id: ID, $input: ServiceInput){
    updateService(id: $id, input: $input){
    id
    name
    userID
    categoryID
    description
    price
  }
}
`;

export const REMOVE_SERVICE = gql`
  mutation removeService($id: ID){
    removeService(id: $id){
    id
  }
}
`;