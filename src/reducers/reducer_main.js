// import { GET_BLIPS, GET_BLIP } from '../actions/index';
//
// const INITIAL_STATE = { all: [] }
//
// export default function(state = {}, action) {
//   switch(action.type) {
//     case GET_BLIPS:
//     return { ...state, all: action.payload } };
//     case GET_BLIP:
//     console.log("Payload of a single blip plus its details: ", action.payload);
//     return { ...state, [action.payload.name]: action.payload }
//   }
//   return state;
// }

import { GET_BLIPS, GET_TWEETS } from '../actions/index';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_BLIPS:
    return {
      ...state,
      ["blips"]: action.payload
    };
    case GET_TWEETS:
    return {
      ...state,
      ["tweets"]: action.payload
    };
  }
  return state;
}
