import gql from "graphql-tag";

export const CREATE_CONTRACT = gql`
  mutation createContract($username: String, $input: ContractInput){
  createContract(username: $username, input: $input){
    id
  }
}
`;
export const GET_USER_CONTRACTS = gql`
  mutation getUserContracts($username: String){
    getUserContracts(username: $username){
    id
    workerID
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
    workerID
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
    workerID
    clientID
    serviceID
    detail
    price
    stateID
  }
}
`;
export const UPDATE_CONTRACT_PAY = gql`
  mutation updateContractPay($id:ID, $input: ContractPayInput){
    updateContractPay(id: $id, input:$input){
      id
      payment
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