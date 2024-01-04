const initialState = {
  dashboard: [],
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    // BUSCAR PRODUTOR
    case "DASHBOARD_SUCCESS":
      return {
        ...state,
        dashboard: action.payload,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
