const initialState = {
  produtores: [], // Lista de produtores rurais
};

const produtorReducer = (state = initialState, action) => {
  switch (action.type) {
    // BUSCAR PRODUTOR
    case "BUSCAR_PRODUTORES_SUCESSO":
      return {
        ...state,
        produtores: action.payload, // Atualiza a lista de produtores
      };

    // Caso para tratar erro na busca de produtores
    case "BUSCAR_PRODUTORES_ERRO":
      // Trate o erro conforme necessário
      return {
        ...state,
        // exemplo: adicionar uma mensagem de erro ao estado
        erro: action.payload,
      };

    // ADICIONAR PRODUTOR
    case "ADICIONAR_PRODUTOR_SUCESSO":
      // Adiciona um novo produtor à lista
      return {
        ...state,
        produtores: [...state.produtores, action.payload],
      };

    case "ADICIONAR_PRODUTOR_ERRO":
      return console.log("Erro ao adicionar produtor");

    // EDITAR PRODUTOR
    case "EDITAR_PRODUTOR_SUCESSO":
      return {
        ...state,
        produtores: state.produtores.map((produtor) =>
          produtor.id === action.payload.id ? action.payload : produtor
        ),
      };

    case "EDITAR_PRODUTOR_ERRO":
      return console.log("Erro ao editar produtor");

    // EXCLUIR PRODUTOR
    case "EXCLUIR_PRODUTOR_SUCESSO":
      return {
        ...state,
        produtores: state.produtores.filter(
          (produtor) => produtor.id !== action.payload
        ),
      };

    // Caso para validar CPF/CNPJ, se necessário
    // case 'VALIDAR_CPF_CNPJ':
    //   ...

    default:
      return state;
  }
};

export default produtorReducer;
