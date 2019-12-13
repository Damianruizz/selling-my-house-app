const initialState = {
  tasks: []
};

const RealStateReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_TASK':
      return Object.assign({}, state, { tasks: state.tasks.concat(action.payload) });
    default:
      return state;
  }
}

export default RealStateReducer;