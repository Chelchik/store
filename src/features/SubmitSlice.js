export function submitReducer(state = usersArr, action) {
  if (action.type === "Submit") {
    localStorage.setItem("users", JSON.stringify(action.payload));
    localStorage.setItem("isRegistered", true);
    return {
      ...state,
      userInfo: action.payload,
      isRegistered: true,
    };
  } else if (action.type === "Logout") {
    localStorage.removeItem("users");
    localStorage.removeItem("isRegistered");
    return {
      ...state,
      userInfo: null,
      isRegistered: false,
    };
  }
  return state;
}

export const usersArr = {
  userInfo: JSON.parse(localStorage.getItem("users")) || {},
  isRegistered: JSON.parse(localStorage.getItem("isRegistered")),
};

export function selectIsRegistered(state) {
  return state.submit.isRegistered;
}

export function selectuserInfo(state) {
  return state.submit.userInfo;
}
