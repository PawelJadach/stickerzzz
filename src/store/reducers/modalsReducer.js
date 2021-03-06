const initState = {
    registerModal: false,
    loginModal: false,
    registerNotification: false,
    registerNotificationText: '',
    addPostModal: false,
    editProfileModal: false,
    mode: '',
}

const modalsReducer = (state = initState, action) => {
    //console.log(action.type)
switch (action.type) {
    case 'REGISTER_MODAL_SWITCH':
      //console.log(action.payload);
      return {
        ...state,
        registerModal: action.payload
      }
    case 'LOGIN_MODAL_SWITCH':
      //console.log('reducer');
        return {
        ...state,
        loginModal:  !state.loginModal
      }
    case 'REGISTER_NOTIFICATION_SWITCH':
    //console.log(action)
    return {
        ...state,
        registerNotification: action.payload,
        registerNotificationText: action.text,
    }
    case 'ADD_POST_MODAL_SWITCH':
    return {
        ...state,
        addPostModal: action.payload
    }
    case 'EDIT_PROFILE_MODAL_SWITCH':
    return {
        ...state,
        editProfileModal: action.payload
    }
    
    case 'CHANGE_MODE': {
      return {
        ...state,
        mode: action.payload,
      };
    }
    default:
      return state
  }
};

export default modalsReducer;