import { SEARCH_UPDATE_INPUT, SEARCH_UPDATE_SUGGESTIONS } from './actions';


const initialState = {
    input: '',
    suggestions: []
}

export default function search(state = initialState, action) {
  switch (action.type) {
    case SEARCH_UPDATE_INPUT:
      return {
          ...state,
          input: action.payload
      }
    case SEARCH_UPDATE_SUGGESTIONS:
      return {
          ...state,
          suggestions: action.payload
      }
    default:
      return state;
  }
}
