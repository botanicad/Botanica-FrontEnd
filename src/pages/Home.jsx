import { useEffect, useState } from "react";
import axios from "../services/api";
import Header from "../components/header/Header";
import SearchBar from "../components/searchBar/SearchBar";
import PlantCard from "../components/card/Card";
import MobilePlantCard from "../components/card/MobileCard";  // Importando o MobilePlantCard
import ModalDetalhes from "../components/modals/ModalDetalhes";
import ModalAdicionar from "../components/modals/ModalAdicionar";
import ModalExcluir from "../components/modals/ModalExcluir";
import ModalEditar from "../components/modals/ModalEditar";

export default function Home() {
  const [plantas, setPlantas] = useState([]);
  const [modal, setModal] = useState({ criar: false, excluir: false, editar: false });
  const [plantaSelecionada, setPlantaSelecionada] = useState(null);
  const [plantaDetalhes, setPlantaDetalhes] = useState(null);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  const abrirModal = (tipo) => setModal((prev) => ({ ...prev, [tipo]: true }));
  const fecharModal = (tipo) => setModal((prev) => ({ ...prev, [tipo]: false }));

  useEffect(() => {
    buscarPlantas();
  }, []);

  const buscarPlantas = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/flora");
      setPlantas(res.data);
    } catch (err) {
      console.error("Erro ao buscar plantas", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCriarPlanta = async (formData) => {
    try {
      await axios.post("/flora", formData);
      fecharModal("criar");
      buscarPlantas();
    } catch (err) {
      console.error("Erro ao criar planta", err);
    }
  };

  const handleEditarPlanta = async (formData) => {
    try {
      await axios.put(`/flora/${plantaSelecionada.id}`, formData);
      fecharModal("editar");
      buscarPlantas();
    } catch (err) {
      console.error("Erro ao editar planta", err);
    }
  };

  const confirmarExclusao = async () => {
    try {
      await axios.delete(`/flora/${plantaSelecionada.id}`);
      fecharModal("excluir");
      buscarPlantas();
    } catch (err) {
      console.error("Erro ao excluir planta", err);
    }
  };

  const plantasFiltradas = plantas.filter((planta) =>
    planta.nomePopular.toLowerCase().includes(busca.toLowerCase()) ||
    planta.nomeCientifico.toLowerCase().includes(busca.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3a5a40]"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-[#f8f9fa] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Header onAdicionar={() => abrirModal("criar")} />
        <SearchBar busca={busca} setBusca={setBusca} />

        {/* Desktop Table */}
        <div className="hidden sm:block bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-12 font-medium text-sm text-[#588157] bg-[#f1f7ee] p-4">
            <div className="col-span-4">Nome Popular</div>
            <div className="col-span-3">Nome Científico</div>
            <div className="col-span-3">Rega</div>
            <div className="col-span-2 text-right pr-6">Ações</div>
          </div>

          <div className="divide-y divide-[#e5e7eb]">
            {plantasFiltradas.map((planta) => (
              <PlantCard
                key={planta.id}
                planta={planta}
                onEditar={() => {
                  setPlantaSelecionada(planta);
                  abrirModal("editar");
                }}
                onExcluir={() => {
                  setPlantaSelecionada(planta);
                  abrirModal("excluir");
                }}
                onDetalhes={() => setPlantaDetalhes(planta)}
              />
            ))}
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-4 mt-4">
          {plantasFiltradas.map((planta) => (
            <MobilePlantCard
              key={planta.id}
              planta={planta}
              onEditar={() => {
                setPlantaSelecionada(planta);
                abrirModal("editar");
              }}
              onExcluir={() => {
                setPlantaSelecionada(planta);
                abrirModal("excluir");
              }}
              onDetalhes={() => setPlantaDetalhes(planta)}
            />
          ))}
        </div>

        {/* Modais */}
        {plantaDetalhes && (
          <ModalDetalhes planta={plantaDetalhes} onClose={() => setPlantaDetalhes(null)} />
        )}
        {modal.criar && (
          <ModalAdicionar onClose={() => fecharModal("criar")} onSubmit={handleCriarPlanta} />
        )}
        {modal.editar && (
          <ModalEditar
            onClose={() => fecharModal("editar")}
            onSubmit={handleEditarPlanta}
            planta={plantaSelecionada}
          />
        )}
        {modal.excluir && (
          <ModalExcluir onClose={() => fecharModal("excluir")} onConfirm={confirmarExclusao} />
        )}
      </div>
    </div>
  );
}
