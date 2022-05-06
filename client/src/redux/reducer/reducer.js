import {GET_ALL_DOGS, GET_DOG_DETAIL, POST_DOG, CLEAR_INFO_POST, GET_ALL_TEMPERAMENTS} from "../actions/actionTypes.js";

const initialState = {
    dogs: [],
    dogDetail: [],
    dogCreate:'',
    temperaments: []
}

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                dogs: payload
            }
        case GET_DOG_DETAIL:
            return {
                ...state,
                dogDetail: payload
            }
        case POST_DOG:
        return {
            ...state,
            dogCreate: payload
        }
        case CLEAR_INFO_POST:
        return {
            ...state,
            dogCreate: payload
        }
        case GET_ALL_TEMPERAMENTS:
        return {
            ...state,
            temperaments: payload
        }
        default:
            return state;
    }
}