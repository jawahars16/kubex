export const initializeConnection = (dispatch, path) => {
  var socket = new WebSocket(`ws://localhost:5000/${path}`);
  socket.onopen = _ => console.log('Connected Socket');
  socket.onmessage = e => onMessage(dispatch, e);
}

const onMessage = (dispatch, e) => {
  const obj = JSON.parse(e.data);
  const resource = obj.resource;

  // if (resource.meta && resource.meta.name === 'kubernetes') return;
  console.log(resource);
  dispatch({
    type: obj.action,
    payload: resource
  });
}
