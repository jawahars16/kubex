import * as constants from "../common/constants";

const pods = (state = [], action) => {
  switch (action.type) {

    case 'POD_ADDED':
      const newPod = action.payload;
      newPod.state = status[action.payload.status.phase];
      return [...state, newPod];

    case 'POD_DELETED':
      return state.filter(s => s.meta.name !== action.payload.meta.name);

    case 'POD_MODIFIED':
      const modifiedPod = action.payload;
      modifiedPod.state = status[action.payload.status.phase];
      return state.map(pod => pod.meta.name === action.payload.meta.name ? modifiedPod : pod);

    case 'SVC_DELETED':
      return state.filter(pod => pod.service !== action.payload.meta.name);

    case 'EVENT':
      const reason = action.payload.reason;
      const podState = status[reason];

      if (!podState)
        return state;

      return state.map(pod => pod.meta.name === action.payload.involved_object_name ? { ...pod, state: podState } : pod);

    case 'METRICS':
      const usage = {
        cpu: action.payload.cpu,
        memory: action.payload.memory
      };

      return state.map(pod => pod.meta.name === action.payload.pod ? { ...pod, usage } : pod);

    default:
      return state;
  }
}

export default pods;

const status = {
  "Running": constants.RUNNING,
  "FailedScheduling": constants.FAILED,
  "Unhealthy": constants.FAILED,
  "Failed": constants.FAILED,
  "BackOff": constants.FAILED,
  "CrashLoopBackOff": constants.FAILED,
  "Pending": constants.PENDING,
  "Killing": constants.NEGATIVE_PROGRESS,
  "Pulling": constants.POSITIVE_PROGRESS,
  "Scheduled": constants.RUNNING,
  "Started": constants.RUNNING,
};