export const initialState = {logs: []}

export const reducer = (state, action) => {
  switch (action.type) {
    case "add_log":
      return { logs: [...state.logs, { ...action.payload }] }
    default:
      return state;
  }
}