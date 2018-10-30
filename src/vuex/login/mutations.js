export default {
    updateCaptcha(state, newCaptcha){
        state.captcha = newCaptcha;
        return true;
    }
}
