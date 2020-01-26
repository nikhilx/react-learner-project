import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-afa17.firebaseio.com/'
})

export default instance