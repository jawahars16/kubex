const services = (state = [], action) => {
  switch (action.type) {
    case 'SVC_ADDED':
      return [...state, action.payload];
    case 'SVC_DELETED':
      return state.filter(s => s.meta.name !== action.payload.meta.name);
    case 'SVC_MODIFIED':
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