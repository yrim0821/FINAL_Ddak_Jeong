import axios from 'axios'

const apiUrl = '/api'

export default {
  searchMovies(params) {
    return axios.get(`${apiUrl}/movies/`, {
      params,
    })
  },
  signUp(params) {
    return axios.post(`${apiUrl}/auth/signup/`, {
      user: params,
    })
  },
  getAllUsers() {
    return axios.get(`${apiUrl}/auth/allUsers/`).then((result) => {
      return result.data
    });
  },

  getallnotices(){
    return axios.get(`${apiUrl}/allnotices/`).then((result) => {
      return result.data
    });
  },

  noticewrite(params){
    return axios.post(`${apiUrl}/notice/`, {
      params,
    })
  },

  getallboards() {
    return axios.get(`${apiUrl}/allboards/`).then((result) => {
      return result.data
    });
  },

  updatenotice(params){
    axios.post(`${apiUrl}/noticeDetail/`, {
      params
    })
  },

  updateboard(params){
    axios.post(`${apiUrl}/boardDetail/`, {
      params
    })
  },

  boardwrite(params){
    console.log('api index.js')
    return axios.post(`${apiUrl}/board/`, {
      params,
    })
  },

  getboarddetail(params) {
    console.log('api폴더 getboarddetail')
    return axios.get(`${apiUrl}/boardDetail/`, {
        params
    })
  },
  
  getnoticedetail(params) {
    console.log('api폴더 getnoticedetail')
    return axios.get(`${apiUrl}/noticeDetail/`, {
        params
    })
  },

  deletenotice(params) {
    console.log('삭제옵니까?')
    console.log(params)
    return axios.delete(`${apiUrl}/noticeDetail/`, 
    { params})
  },

  deleteboard(params) {
    return axios.delete(`${apiUrl}/boardDetail/`, 
    { params})
  },
}