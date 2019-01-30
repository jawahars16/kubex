const nodes = (state = [], action) => {
  switch (action.type) {

    case 'NODE_ADDED':
      const newNode = action.payload;
      return [...state, newNode];

    case 'NODE_DELETED':
      return state.filter(s => s.name !== action.payload.name);

    case 'NODE_MODIFIED':
      const modifiedNode = action.payload;
      return state.map(node => node.name === action.payload.name ? modifiedNode : node);

    default:
      return state;
  }
}

export default nodes;