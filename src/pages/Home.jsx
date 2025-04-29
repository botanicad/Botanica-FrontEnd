import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "../services/api";
import Header from "../components/header/Header";
import SearchBar from "../components/searchBar/SearchBar";
import PlantCard from "../components/card/Card";
import MobilePlantCard from "../components/card/MobileCard";  
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
      toast.error("Erro ao carregar plantas!");
    } finally {
      setLoading(false);
    }
  };

  const handleCriarPlanta = async (formData) => {
    try {
      await axios.post("/flora", formData);
      fecharModal("criar");
      buscarPlantas();
      toast.success("Planta adicionada com sucesso!");
    } catch (err) {
      console.error("Erro ao criar planta", err);
      toast.error("Erro ao adicionar planta.");
    }
  };

  const handleEditarPlanta = async (formData) => {
    try {
      await axios.put(`/flora/${plantaSelecionada.id}`, formData);
      fecharModal("editar");
      buscarPlantas();
      toast.success("Planta editada com sucesso!");
    } catch (err) {
      console.error("Erro ao editar planta", err);
      toast.error("Erro ao editar planta.");
    }
  };

  const confirmarExclusao = async () => {
    try {
      await axios.delete(`/flora/${plantaSelecionada.id}`);
      fecharModal("excluir");
      buscarPlantas();
      toast.success("Planta excluída com sucesso!");
    } catch (err) {
      console.error("Erro ao excluir planta", err);
      toast.error("Erro ao excluir planta.");
    }
  };

  const plantasFiltradas = plantas.filter((planta) =>
    planta.nomePopular.toLowerCase().includes(busca.toLowerCase()) ||
    planta.nomeCientifico.toLowerCase().includes(busca.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#f8f9fa]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="flex justify-center items-center bg-[#3a5a40] rounded-full p-6 shadow-lg"
        >
          <Leaf size={48} className="text-white" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", repeatType: "reverse" }}
          className="mt-6 text-[#3a5a40] text-lg font-semibold"
        >
          Carregando suas plantas...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-[#f8f9fa] min-h-screen">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#344E41",
            color: "#fff",
            borderRadius: "12px",
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px",
            padding: "12px 20px",
          },
          success: {
            iconTheme: {
              primary: "#A3B18A",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#e63946",
              secondary: "#fff",
            },
          },
        }}
      />

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
