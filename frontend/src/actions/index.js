export const initializeConnection = (dispatch, path) => {
  var socket = new WebSocket(`ws://${window.location.host}/${path}`);
  socket.onopen = _ => console.log('Connected Socket');
  socket.onmessage = e => onMessage(dispatch, e);
}

const onMessage = (dispatch, e) => {
  const obj = JSON.parse(e.data);
  const resource = obj.resource;

  dispatch({
    type: obj.action,
    payload: resource
  });
}
