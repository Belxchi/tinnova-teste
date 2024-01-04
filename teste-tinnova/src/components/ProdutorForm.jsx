import { useEffect, useState } from "react";
import {
  Button,
  MultiSelect,
  MultiSelectItem,
  Select,
  SelectItem,
  TextInput,
} from "@tremor/react";
import {
  UserIcon,
  IdentificationIcon,
  CalculatorIcon,
  HomeIcon,
  OfficeBuildingIcon,
  MapIcon,
  ViewListIcon
} from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { adicionarProdutor, editarProdutor } from "../actions/produtorActions";
import { validar } from "../utils/validarCPFouCNPJ";
import { validarAreas } from "../utils/validarArea";
import { estados } from "../utils/estados";

const ProdutorForm = ({ onEditarProdutor, onReset }) => {
  // editar
  const [modoEdicao, setModoEdicao] = useState(false);

  const dispatch = useDispatch();
  // Estados individuais para cada campo
  const [id, setId] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [nome, setNome] = useState("");
  const [nomeFazenda, setNomeFazenda] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [areaTotal, setAreaTotal] = useState("");
  const [areaAgricultavel, setAreaAgricultavel] = useState("");
  const [areaVegetacao, setAreaVegetacao] = useState("");
  const [cultura, setCultura] = useState([]);

  const produtores = useSelector((state) => state.produtor.produtores);

  useEffect(() => {
    if (onEditarProdutor) {
      setModoEdicao(true);
      // Configura os estados do formulário com os dados do produtor
      setId(onEditarProdutor.id);
      setCpfCnpj(onEditarProdutor.cpfCnpj);
      setNome(onEditarProdutor.nome);
      setNomeFazenda(onEditarProdutor.nomeFazenda);
      setCidade(onEditarProdutor.cidade);
      setEstado(onEditarProdutor.estado);
      setAreaTotal(onEditarProdutor.areaTotal);
      setAreaAgricultavel(onEditarProdutor.areaAgricultavel);
      setAreaVegetacao(onEditarProdutor.areaVegetacao);
      setCultura(onEditarProdutor.cultura);
    }
  }, [onEditarProdutor]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let produtorDados = {
      cpfCnpj,
      nome,
      nomeFazenda,
      cidade,
      estado,
      areaTotal,
      areaAgricultavel,
      areaVegetacao,
      cultura,
    };

    if (onEditarProdutor) {
      produtorDados.id = id;
    }

    let areaAprovada = validarAreas(
      produtorDados.areaTotal,
      produtorDados.areaAgricultavel,
      produtorDados.areaVegetacao
    );

    if (!areaAprovada)
      return alert(
        "A soma de área agrícultável e vegetação, não deverá ser maior que a área total da fazenda"
      );

    if (areaAprovada) {
      if (modoEdicao) {
        // Despacha a ação de editar
        dispatch(editarProdutor(produtorDados.id, produtorDados));
        resetForm();
        onReset();
        window.location.reload()
      } else {
        // Despacha a ação de adicionar
        dispatch(adicionarProdutor(produtorDados));
        resetForm();
        onReset();
      }
    }
  };

  const validarCpfOuCnpj = (cpf) => {
    let cpfOuCnpjValido = validar(cpf);

    if (!cpfOuCnpjValido) {
      return alert("cpf ou cnpj invalido ❌");
    } else {
      return alert("Cpf ou CNPJ valido ✅");
    }
  };

  const resetForm = () => {
    setCpfCnpj("");
    setNome("");
    setNomeFazenda("");
    setCidade("");
    setEstado("");
    setAreaTotal("");
    setAreaAgricultavel("");
    setAreaVegetacao("");
    setCultura([]);
    setId(0);
  };

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-xl mb-4 text-black">
        {onEditarProdutor ? "Editar" : "Criar"} produtor
      </h1>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        {onEditarProdutor && (
          <TextInput
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled
          />
        )}
        <TextInput
          icon={IdentificationIcon}
          placeholder="CPF ou CNPJ"
          value={cpfCnpj}
          onChange={(e) => setCpfCnpj(e.target.value)}
          onBlur={(e) => validarCpfOuCnpj(e.target.value)}
        />
        <TextInput
          icon={UserIcon}
          placeholder="Nome do produtor"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextInput
          icon={HomeIcon}
          placeholder="Nome da fazenda"
          value={nomeFazenda}
          onChange={(e) => setNomeFazenda(e.target.value)}
        />
        <TextInput
          icon={OfficeBuildingIcon}
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />
        <Select
          value={estado}
          onValueChange={setEstado}
          placeholder="Estado"
          icon={MapIcon}
        >
          {estados.map((estad) => (
            <SelectItem value={estad.sigla}>{estad.nome}</SelectItem>
          ))}
        </Select>
        <TextInput
          icon={CalculatorIcon}
          placeholder="Área total em hectares da fazenda"
          value={areaTotal}
          onChange={(e) => setAreaTotal(e.target.value)}
        />
        <TextInput
          icon={CalculatorIcon}
          placeholder="Área agricultável em hectares"
          value={areaAgricultavel}
          onChange={(e) => setAreaAgricultavel(e.target.value)}
        />
        <TextInput
          icon={CalculatorIcon}
          placeholder="Área de vegetação em hectares"
          value={areaVegetacao}
          onChange={(e) => setAreaVegetacao(e.target.value)}
        />
        <MultiSelect value={cultura} onValueChange={setCultura} icon={ViewListIcon}>
          <MultiSelectItem value="soja">Soja</MultiSelectItem>
          <MultiSelectItem value="milho">Milho</MultiSelectItem>
          <MultiSelectItem value="algodao">Algodão</MultiSelectItem>
          <MultiSelectItem value="cafe">Café</MultiSelectItem>
          <MultiSelectItem value="cana_de_acucar">
            Cana de Açúcar
          </MultiSelectItem>
        </MultiSelect>
        <Button type="submit">Enviar</Button>
      </form>
    </div>
  );
};

export default ProdutorForm;
