const initialState = {
  currentEdit: {}
};

const RealStateReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'EDIT_REAL_ESTATE':
      return Object.assign({}, state, { currentEdit: action.payload });
    default:
      return state;
  }
}

export default RealStateReducer;