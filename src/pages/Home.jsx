import { useEffect, useState } from "react";
import axios from "../services/api";
import ModalDetalhes from "../components/Modals/ModalDetalhes";
import ModalAdicionar from "../components/modals/ModalAdicionar";
import ModalExcluir from "../components/Modals/ModalExcluir";
import ModalEditar from "../components/Modals/ModalEditar";
import { Trash2, Plus, Edit, Search } from "lucide-react";
import Logo from "../assets/svgs/Logo.svg";

export default function Home() {
  const [plantas, setPlantas] = useState([]);
  const [modal, setModal] = useState({ criar: false, excluir: false, editar: false });
  const [idSelecionado, setIdSelecionado] = useState(null);
  const [plantaSelecionada, setPlantaSelecionada] = useState(null);
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Ícone de plantas" className="w-8 h-8" />
            <h1 className="text-3xl font-bold text-[#2c3e2a]">Lista de Plantas</h1>
          </div>
          <button
            className="bg-[#3a5a40] hover:bg-[#2d4734] text-white px-5 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-md w-full sm:w-auto justify-center"
            onClick={() => abrirModal("criar")}
          >
            <Plus size={20} />
            <span>Adicionar plantas</span>
          </button>
        </div>

        {/* Barra de pesquisa */}
        <div className="flex items-center gap-2 mb-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Pesquisar planta..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3a5a40]"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

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
              <div
                key={planta.id}
                className="grid grid-cols-12 items-center p-4 hover:bg-[#f8f9fa] transition-colors cursor-pointer"
                onClick={() => setIdSelecionado(planta.id)}
              >
                <div className="col-span-4 flex gap-4 items-center">
                  <img
                    src={`data:image/jpeg;base64,${planta.imagemBase64}`}
                    alt={planta.nomePopular}
                    className="w-16 h-16 rounded-lg object-cover border border-[#e5e7eb]"
                  />
                  <div>
                    <span className="font-medium text-[#2d3a2a]">{planta.nomePopular}</span>
                    <span className="block text-sm text-[#4a5c4a] italic sm:hidden">{planta.nomeCientifico}</span>
                  </div>
                </div>
                <div className="col-span-3 text-[#4a5c4a] italic hidden sm:block">{planta.nomeCientifico}</div>
                <div className="col-span-3 text-[#4a5c4a]">{planta.rega}</div>
                <div className="col-span-2 flex justify-end gap-4 pr-2">
                  <button
                    className="p-2 text-[#588157] hover:text-[#3a5a40] hover:bg-[#e9f5e6] rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPlantaSelecionada(planta);
                      abrirModal("editar");
                    }}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    className="p-2 text-[#e76f51] hover:text-[#d6452a] hover:bg-[#fcecea] rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPlantaSelecionada(planta);
                      abrirModal("excluir");
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3 mt-4">
          {plantasFiltradas.map((planta) => (
            <div
              key={planta.id}
              className="bg-white rounded-lg shadow-sm p-4 hover:bg-[#f8f9fa] transition-colors cursor-pointer"
              onClick={() => setIdSelecionado(planta.id)}
            >
              <div className="flex gap-3 items-start">
                <img
                  src={`data:image/jpeg;base64,${planta.imagemBase64}`}
                  alt={planta.nomePopular}
                  className="w-16 h-16 rounded-lg object-cover border border-[#e5e7eb]"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-[#2d3a2a]">{planta.nomePopular}</h3>
                      <p className="text-sm text-[#4a5c4a] italic">{planta.nomeCientifico}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="p-1 text-[#588157] hover:text-[#3a5a40] hover:bg-[#e9f5e6] rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlantaSelecionada(planta);
                          abrirModal("editar");
                        }}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="p-1 text-[#e76f51] hover:text-[#d6452a] hover:bg-[#fcecea] rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlantaSelecionada(planta);
                          abrirModal("excluir");
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-[#4a5c4a]">
                    <p><span className="font-medium">Rega:</span> {planta.rega}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modais */}
        {idSelecionado && <ModalDetalhes id={idSelecionado} onClose={() => setIdSelecionado(null)} />}
        {modal.criar && <ModalAdicionar onClose={() => fecharModal("criar")} onSubmit={handleCriarPlanta} />}
        {modal.editar && <ModalEditar onClose={() => fecharModal("editar")} onSubmit={handleEditarPlanta} planta={plantaSelecionada} />}
        {modal.excluir && <ModalExcluir onClose={() => fecharModal("excluir")} onConfirm={confirmarExclusao} />}
      </div>
    </div>
  );
}
