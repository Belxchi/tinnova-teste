import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { buscarProdutores, excluirProdutor } from "../actions/produtorActions";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";

const ProdutorTable = ({ onEditarProdutor }) => {
  const dispatch = useDispatch();
  const produtores = useSelector((state) => state.produtor.produtores);

  useEffect(() => {
    dispatch(buscarProdutores());
  }, [dispatch]);

  const handleDelete = (produtorId) => {
    dispatch(excluirProdutor(produtorId));
  };

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-xl mb-4 text-black">Listar produtor</h1>
      <Card className="overflow-auto max-h-[400px]">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>CPF/CNPJ</TableHeaderCell>
              <TableHeaderCell>Nome</TableHeaderCell>
              <TableHeaderCell>Fazenda</TableHeaderCell>
              <TableHeaderCell>Cidade</TableHeaderCell>
              <TableHeaderCell>Estado</TableHeaderCell>
              <TableHeaderCell>Área Total</TableHeaderCell>
              <TableHeaderCell>Área Agricultável</TableHeaderCell>
              <TableHeaderCell>Área de Vegetação</TableHeaderCell>
              <TableHeaderCell>Cultura</TableHeaderCell>
              <TableHeaderCell>Ações</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtores.map((produtor) => (
              <TableRow key={produtor.id}>
                <TableCell>{produtor.cpfCnpj}</TableCell>
                <TableCell>{produtor.nome}</TableCell>
                <TableCell>{produtor.nomeFazenda}</TableCell>
                <TableCell>{produtor.cidade}</TableCell>
                <TableCell>{produtor.estado}</TableCell>
                <TableCell>{produtor.areaTotal}</TableCell>
                <TableCell>{produtor.areaAgricultavel}</TableCell>
                <TableCell>{produtor.areaVegetacao}</TableCell>
                <TableCell>{typeof(produtor.cultura) === 'object' ? produtor.cultura.join(', ') : produtor.cultura}</TableCell>
                <TableCell className="flex gap-1">
                  <Button
                    icon={PencilIcon}
                    onClick={() => onEditarProdutor(produtor)}
                    className="h-5 w-5"
                  />
                  <Button
                    icon={TrashIcon}
                    onClick={() => handleDelete(produtor.id)}
                    className="h-5 w-5"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ProdutorTable;
