import { LOGIN_URL } from '../utils/contanst';
import axios from 'axios'

export const LogoutAndDeleteToken = () => {
  axios.get(`${LOGIN_URL}/logout`)
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
}
