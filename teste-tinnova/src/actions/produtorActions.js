export const buscarProdutores = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3000/produtores", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro na solicitação dos produtores");
      }

      const produtores = await response.json();
      dispatch({
        type: "BUSCAR_PRODUTORES_SUCESSO",
        payload: produtores,
      });
    } catch (error) {
      dispatch({
        type: "BUSCAR_PRODUTORES_ERRO",
        payload: error.message,
      });
    }
  };
};

export const adicionarProdutor = (produtor) => {
  return async (dispatch) => {
    try {
      debugger
      // Chamada de API
      const response = await fetch("http://localhost:3000/produtores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produtor),
      });

      const data = await response.json();

      // Despache uma ação de sucesso para atualizar o estado com o novo produtor
      dispatch({
        type: "ADICIONAR_PRODUTOR_SUCESSO",
        payload: data,
      });
    } catch (error) {
      // Despache uma ação de erro, se necessário
      dispatch({
        type: "ADICIONAR_PRODUTOR_ERRO",
        payload: error,
      });
    }
  };
};

export const editarProdutor = (produtorId, dadosAtualizados) => {
  debugger;
  return async (dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:3000/produtores/${produtorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosAtualizados),
        }
      );

      const data = await response.json();

      dispatch({
        type: "EDITAR_PRODUTOR_SUCESSO",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "EDITAR_PRODUTOR_ERRO",
        payload: error,
      });
    }
  };
};

export const excluirProdutor = (produtorId) => {
  return async (dispatch) => {
    try {
      await fetch(`http://localhost:3000/produtores/${produtorId}`, {
        method: "DELETE",
      });

      dispatch({
        type: "DELETAR_PRODUTOR_SUCESSO",
      });
      dispatch(buscarProdutores());
    } catch (error) {
      dispatch({
        type: "DELETAR_PRODUTOR_ERROR",
      });
    }
  };
};
