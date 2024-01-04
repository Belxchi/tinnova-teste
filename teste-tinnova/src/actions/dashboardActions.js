export const buscarDados = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3000/dashboard", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro na solicitação dos dados dashboard");
      }

      const dados = await response.json();
      dispatch({
        type: "DASHBOARD_SUCCESS",
        payload: dados,
      });
    } catch (error) {
      dispatch({
        type: "BUSCAR_PRODUTORES_ERRO",
        payload: error.message,
      });
    }
  };
};
