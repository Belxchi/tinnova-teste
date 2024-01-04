import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import ProdutorForm from "./components/ProdutorForm";
import store from "./store";
import ProdutorTable from "./components/ProdutorTable";
import Dashboard from "./components/Dashboard"; // Importe seu componente Dashboard
import { Button } from "@tremor/react";

function App() {
  const [produtorParaEditar, setProdutorParaEditar] = useState(null);

  const handleEditarProdutor = (produtor) => {
    setProdutorParaEditar(produtor);
  };

  const resetProdutorParaEditar = () => {
    setProdutorParaEditar(null);
  };

  const irParaODashboard = () => {
    window.location.href = "/dashboard";
  };

  const irParaAHome = () => {
    window.location.href = "/";
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col items-center w-screen h-screen">
          <nav className="flex gap-5">
            <Button onClick={irParaAHome} className="mt-10">
              Home
            </Button>
            <Button onClick={irParaODashboard} className="mt-10">
              Dashboard
            </Button>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex flex-col gap-4 mt-10">
                  {produtorParaEditar ? (
                    <ProdutorForm
                      onEditarProdutor={produtorParaEditar}
                      onReset={resetProdutorParaEditar}
                    />
                  ) : (
                    <ProdutorForm onReset={resetProdutorParaEditar} />
                  )}
                  <ProdutorTable onEditarProdutor={handleEditarProdutor} />
                </div>
              }
            />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Adicione mais rotas conforme necessário */}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
