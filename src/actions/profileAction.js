import * as types from './types';

export function getProfileUser(data){
    return{
        type: types.GET_PROFILE_USER,
        data: data
    }
}