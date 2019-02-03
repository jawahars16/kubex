const meta = (state = {}, action) => {
  switch (action.type) {

    case 'META':
      return { ...state, resource: action.payload }

    default:
      return state;
  }
}

export default meta;