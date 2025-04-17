import axios from 'axios'
const axiosBar = axios.create({
  baseURL: 'https://fakestoreapi.com',
})
export default axiosBar
