import gql from "graphql-tag";


export const CREATE_CONTRACT = gql`
  mutation createContract($input: ContractInput){
  createContract(input: $input){
    id
  }
}
`;
export const GET_USER_CONTRACTS = gql`
  mutation getUserContracts($username: String){
    getUserContracts(username: $username){
    id
    userID
    clientID
    serviceID
    detail
    price
    stateID
  }
}
`;
export const GET_CONTRACT = gql`
  mutation getContract($id: ID){
    getContract(id: $id){
    id
    userID
    clientID
    serviceID
    detail
    price
    stateID
  }
}
`;

export const UPDATE_CONTRACT = gql`
  mutation updateContract($id: ID, $input: ContractInput){
  createContract(id: $id, input: $input){
    id
    userID
    clientID
    serviceID
    detail
    price
    stateID
  }
}
`;

export const REMOVE_CONTRACT = gql`
  mutation removeContract($id: ID){
    removeContract(id: $id){
    id
  }
}
`;