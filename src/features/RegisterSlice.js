export function registerReducer(state = registerInitialState, action) {
  switch (action.type) {
    case "Email":
      return { ...state, email: action.payload };
    case "Password":
      return { ...state, password: action.payload };
    case "Name":
      return { ...state, name: action.payload };
    case "Surename":
      return { ...state, surename: action.payload };
    case "Bio":
      return { ...state, bio: action.payload };
    case "Image":
      return { ...state, image: action.payload };
  }
  return state;
}

export const registerInitialState = {
  email: "",
  password: "",
  name: "",
  surename: "",
  image: "",
  bio: "",
};

export function selectEmail(state) {
  return state.register.email;
}

export function selectPassword(state) {
  return state.register.password;
}

export function selectName(state) {
  return state.register.name;
}

export function selectSurename(state) {
  return state.register.surename;
}

export function selectBio(state) {
  return state.register.bio;
}

export function selectImage(state) {
  return state.register.image;
}
