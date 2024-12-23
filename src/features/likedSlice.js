export function likedReducer(state = likedInitialState, action) {
  if (action.type === "Liked") {
    const isLiked = state.liked.includes(action.payload);
    const newLikedState = isLiked
      ? state.liked.filter((id) => id !== action.payload)
      : [...state.liked, action.payload];

    localStorage.setItem(
      "likedState",
      JSON.stringify({ liked: newLikedState })
    );

    return {
      ...state,
      liked: newLikedState,
    };
  }

  return state;
}

export const likedInitialState = {
  liked: [],
};

export function likedSelect(state) {
  return state.liked.liked;
}
