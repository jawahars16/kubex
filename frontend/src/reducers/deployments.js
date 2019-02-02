const services = (state = [], action) => {
  switch (action.type) {
    case 'DEP_ADDED':
      return [...state, action.payload];
    case 'DEP_DELETED':
      return state.filter(s => s.meta.name !== action.payload.meta.name);
    case 'DEP_MODIFIED':
      return state.map(s => {
        if (s.meta.name === action.payload.meta.name)
          return action.payload;
        else
          return s;
      });
    default:
      return state;
  }
}

export default services;