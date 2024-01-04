import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, DonutChart, Title, Metric, Text } from "@tremor/react";
import { buscarDados } from "../actions/dashboardActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state.dashboard.dashboard);

  useEffect(() => {
    dispatch(buscarDados());
  }, [dispatch]);

  return (
    <div className="w-screen mt-5 flex gap-5 items-center justify-center">
      <div className="flex flex-col gap-5">
        <Card
          className="max-w-[200px]"
          decoration="top"
          decorationColor="indigo"
        >
          <Text>Total de fazendas em quantidade</Text>
          <Metric>{dashboard.totalFazendas}</Metric>
        </Card>
        <Card
          className="max-w-[200px]"
          decoration="top"
          decorationColor="indigo"
        >
          <Text>Total de fazendas em hectares (área total)</Text>
          <Metric>{dashboard.totalHectares}</Metric>
        </Card>
      </div>
      <Card className="max-w-[200px] h-full">
        <Title>Estado</Title>
        <DonutChart
          className="mt-6"
          data={dashboard.fazendasPorEstado}
          category="valor"
          index="nome"
        />
      </Card>
      <Card className="max-w-[200px] h-full">
        <Title>Cultura</Title>
        <DonutChart
          className="mt-6"
          data={dashboard.fazendasPorCultura}
          category="valor"
          index="nome"
        />
      </Card>
      <Card className="max-w-[200px] h-full">
        <Title>Uso de solo</Title>
        <DonutChart
          className="mt-6"
          data={dashboard.usoSolo}
          category="valor"
          index="nome"
        />
      </Card>
    </div>
  );
};

export default Dashboard;
