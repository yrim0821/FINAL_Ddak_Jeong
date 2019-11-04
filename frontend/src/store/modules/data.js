import api from '../../api'

// initial state
const state = {
  // shape: [{ id, title, genres, viewCnt, rating }]
  userInfo: null,
  userPage: true, 
  postList: [],
  user: null,
}

// getter
const getters = {
  test: state => state.user
}

// actions
const actions = {
  async signUp({ commit }, params) {
    console.log("enter addMember!!")
    await api.signUp(params)
  },
  async checkLogin({ commit }, params) {
    console.log("enter checkLogin!!")
    return await api.checkLogin(params).then((result) => {
      var resp = result.data
      if(resp.is_authenticated){
        var user={
          username: resp.username,
          name: resp.name,
          favorite: resp.favorite,
          lastestView: resp.lastestView,
          token: resp.token,
          is_staff: resp.is_staff,
        }
        commit('setUser', user)
        localStorage.setItem("token", state.user.token)
        return true
      }else{
        return false
      }
    });
  },
  async logoutUser({ commit }) {
    await api.logoutUser(state.user.username).then(() => {
      localStorage.removeItem("token");
      commit('setUser', null);
    })
  },
  async updateLatestView({commit}, params){
    console.log("enter updateLatestView!!")
    return await api.updateLatestView(params)
  },
  async checkPassword({commit}, params) {
    console.log("enter checkPassword!!")
    console.log(params)
    return await api.checkPassword(params)
  },
  async getUserInfo({commit}) {
    var username = state.user.username
    const userInfo = await api.getUserInfo(username)
    commit('setUserInfo', userInfo)
  },
  async getLatestView({commit}) {
    console.log("getLatestView")
    return await api.getLatestView().then((result) => {
      return result
    })
  },
  async editUser({commit}, params) {
    console.log(params)
    return await api.editUser(params)
  },
  async deleteUser({commit}, params) {
    console.log(params)
    return await api.deleteUser(params)
  },
  async getSession({ commit }, param) {
    console.log("getSession")
    return await api.getSession(param).then((result) => {
      if (result.data.is_authenticated) {
        commit('setUser', {
          username: result.data.username,
          name: result.data.name,
          favorite: result.data.favorite,
          lastestView: result.data.lastestView,
          token: result.data.token,
          is_staff: result.data.is_staff,
        })
      } else {
        localStorage.removeItem('token');
        commit('setUser', null);
      }
      return result.data.is_authenticated;
    });
  },

  async chatUser({ commit }, param){
    {
      console.log("chatUser")
      return await api.getSession(param).then((result) => {
        if (result.data.is_authenticated) {
          // commit('setUser', {
          //   username: result.data.username,
          //   name: result.data.name,
          //   favorite: result.data.favorite,
          //   token: result.data.token,
          //   is_staff: result.data.is_staff,
          // })
          const info = {
            email : result.data.username,
            name : result.data.name
          }
          return info
        } else {
          localStorage.removeItem('token');
          commit('setUser', null);
        }
        return result.data.is_authenticated;
      });
    }
  },


  async getAllUsers() {
    return await api.getAllUsers()
  },

  async getAllNotices(){
    return await api.getAllNotices()
  },

  async noticeWrite({commit}, params){
    await api.noticeWrite(params)
  },

  async noticeCommentWrite({commit}, params){
    await api.noticeCommentWrite(params)
  },

  async boardCommentWrite({commit}, params){
    await api.boardCommentWrite(params)
  },

  async getNoticeComments({commit}, params){
    return await api.getNoticeComments(params)
  },

  async getBoardComments({commit}, params){
    return await api.getBoardComments(params)
  },

  async getAllBoards(){
    var a = await api.getAllBoards()
    return a
  },

  async boardWrite({commit}, params){
    console.log('store board')
    console.log(params)
    await api.boardWrite(params)
  },

  async getBoardDetail({commit}, params){
    const resp = await api.getBoardDetail(params)
    return resp.data
    // commit('setSummary', summary)
  },

  async getNoticeDetail({commit}, params){
    const resp = await api.getNoticeDetail(params)
    return resp.data
    // commit('setSummary', summary)
  },

  async noticeUpdate({commit}, params){
    console.log(params)
    await api.updateNotice(params)
  },

  async boardUpdate({commit}, params){
    console.log(params)
    await api.updateBoard(params)
  },

  async deleteNotice({commit}, params){
    await api.deleteNotice(params)
  },

  async deleteBoard({commit}, params){
    await api.deleteBoard(params)
  },

  async deleteBoardComment({commit}, params){
    await api.deleteBoardComment(params)
  },

  async deleteNoticeComment({commit}, params){
    await api.deleteNoticeComment(params)
  },

  async editBoardComment({commit}, params){
    await api.editBoardComment(params)
  },

  async editNoticeComment({commit}, params){
    await api.editNoticeComment(params)
  },

  async getService({commit}, params){
    return await api.getService(params)
  },
  
  async policySearch({commit}, params){
    return await api.policySearch(params)
  }
}

// mutations
const mutations = {
  printUserInfo(state, user) {
    state.userInfo = user.map(m => m)
  },
  setUser(state, user) {
    state.user = user
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}