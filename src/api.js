import axios from 'axios';

const request = axios.create({
  baseURL: 'https://api.savetime.net/v1/client'
});

export const getSuggestions = (params) => {
  return request.get('/suggest/item', { params });
}

// export const autoCompleteCountries = (data = {}, { isServer = false }) => {
//   return request.post(`api/autocomplete/countries?key=${getKey(isServer)}`, {
//     prefix: data.value
//   })
// }


export default {
  getSuggestions
}
