export default {
    updateCaptcha(state, newCaptcha){
        state.captcha = newCaptcha;
        return true;
    },
    updateCurrentUser(state, user){
        state.currentUser = user;
        return true;
    }
}
