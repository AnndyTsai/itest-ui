export default {
    commitUpdateCaptcha({commit}, newCaptcha){
        commit('updateCaptcha', newCaptcha);
    },
    commitUpdateCurrentUser({commit}, user){
        commit('updateCurrentUser', user);
    }
}
