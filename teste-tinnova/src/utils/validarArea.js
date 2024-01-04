export function validarAreas(areaTotal, areaAgricultavel, areaVegetacao) {
  // Convertendo para números, caso sejam strings
  const total = Number(areaTotal);
  const agricultavel = Number(areaAgricultavel);
  const vegetacao = Number(areaVegetacao);

  // Verificando se algum dos valores não é um número
  if (isNaN(total) || isNaN(agricultavel) || isNaN(vegetacao)) {
    return false; // Retorna falso se algum valor não for um número
  }

  // Verifica se a soma de áreas agrícolas e de vegetação não ultrapassa a área total
  if (agricultavel + vegetacao <= total) {
    return true; // Validação bem-sucedida
  } else {
    return false; // Validação falhou
  }
}
