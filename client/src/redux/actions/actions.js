import axios from 'axios';
import { GET_ALL_DOGS, GET_DOG_DETAIL, POST_DOG, CLEAR_INFO_POST, GET_ALL_TEMPERAMENTS} from "./actionTypes";

export function getAllDogs(name){
    return async (dispatch)=>{

      try {
            let res = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            dispatch({type: GET_ALL_DOGS, payload: res.data})
                
      } catch (err) {
            console.log(err)
      }
    }
}
export function clearAllDogs(){
      return async (dispatch)=>{
              dispatch({type: GET_ALL_DOGS, payload: []})
      }   
}

export function getDogTemperaments(){
      return async (dispatch)=>{
        try {
              let res = await axios.get(`http://localhost:3001/temperament`)
              dispatch({type: GET_ALL_TEMPERAMENTS, payload: res.data})
                  
        } catch (err) {
              console.log(err)
        }
      }
  }

export function getDogDetail(id){
    return async (dispatch)=>{
      try {
            let res = await axios.get(`http://localhost:3001/dogs/${id}`)
            dispatch({type: GET_DOG_DETAIL, payload: res.data})
                
      } catch (err) {
            console.log(err)
      }
    }
}

export function clearDetail(){
      return async (dispatch)=>{
              dispatch({type: GET_DOG_DETAIL, payload: []})
      }   
}

export function postDog({name, heightMax, heightMin, weightMax, weightMin, lifeSpanMax, lifeSpanMin, image, temperament}){
      return async (dispatch)=>{

            try {
                  let res = await axios.post(`http://localhost:3001/dog`, {
                        name: name,
                        height: `${heightMin} - ${heightMax}`,
                        weight: `${weightMin} - ${weightMax}`,
                        life_span: `${lifeSpanMin} - ${lifeSpanMax} years`,
                        image: image,
                        temperament:temperament
                  })
                  dispatch({type: POST_DOG, payload: res.data})
                        
            } catch (err) {
                  console.log(err)
            }

      }   
}

export function clearInfoPost(){
      return async (dispatch)=>{
              dispatch({type: CLEAR_INFO_POST, payload: ''})
      }   
}