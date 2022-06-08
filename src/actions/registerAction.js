import * as types from   './types';

export function registerRequest(email){
    return{
        type: types.REGISTER_REQUEST,
        email:email
    }
}

export function registerRequestSuccess(response){
    return{
        type: types.REGISTER_SUCCESS,
        response
    }
}
export function registerRequestFailure(error){
  return{
    type: types.REGISTER_FAILED,
    error
  }
}
