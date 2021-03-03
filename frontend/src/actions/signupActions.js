import {DB} from '../constants/DB'
import axios from 'axios'
export const userSignupRequest = (userData) =>{
    return dispatch => {
        return axios.post(`${DB}/signup`, userData);
    }
}