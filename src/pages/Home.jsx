import { useEffect, useState } from "react";
import axios from "../services/api";
import ModalDetalhes from "../assets/modals/ModalDetalhes";
import ModalAdicionar from "../assets/modals/ModalAdicionar";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function Home() {
    const [plantas, setPlantas] = useState([]);
    const [idSelecionado, setIdSelecionado] = useState(null);
    const [modalCriarAberto, setModalCriarAberto] = useState(false);
    const [refetchTrigger, setRefetchTrigger] = useState(0);
  
    useEffect(() => {
      buscarPlantas();
    }, [refetchTrigger]);
  
    const buscarPlantas = () => {
      axios
        .get("/flora")
        .then((res) => setPlantas(res.data))
        .catch((err) => console.error("Erro ao buscar plantas", err));
    };
  
    const handleClickPlanta = (e, id) => {
      // Verifica se o clique foi na área do lápis ou lixeira
      if (e.target.closest('.action-buttons')) {
        return; // Se for, não faz nada
      }
      setIdSelecionado(id); // Caso contrário, abre o modal de detalhes
    };
  
    const fecharModal = () => setIdSelecionado(null);
  
    const handleCriarPlanta = async (formData) => {
      try {
        await axios.post("/flora", formData, {
          headers: { "Content-Type": "application/json" },
        });
        setModalCriarAberto(false);
        setRefetchTrigger((prev) => prev + 1);
      } catch (err) {
        console.error("Erro ao criar planta", err);
      }
    };
  
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Lista de Plantas</h1>
          <button
            className="bg-[#344E41] text-white px-4 py-2 rounded flex items-center gap-2"
            onClick={() => setModalCriarAberto(true)}
          >
            <Plus size={18} /> ADICIONAR NOVA PLANTA
          </button>
        </div>
  
        <div className="grid grid-cols-12 font-medium text-sm text-[#708238] border-b pb-2 mb-2">
          <div className="col-span-2">Nome Popular</div>
          <div className="col-span-3">Nome científico</div>
          <div className="col-span-3">Rega</div>
        </div>
  
        {plantas.map((planta) => (
          <div
            key={planta.id}
            className="grid grid-cols-12 items-center bg-white rounded-xl shadow-sm p-3 mb-3 hover:bg-gray-100"
            onClick={(e) => handleClickPlanta(e, planta.id)} // Adiciona onClick ao card inteiro
          >
            <div className="col-span-2 flex items-center gap-2 cursor-pointer">
              <img
                src={`data:image/jpeg;base64,${planta.imagemBase64}`}
                alt={planta.nomePopular}
                className="w-12 h-12 rounded object-cover"
              />
              <span>{planta.nomePopular}</span>
            </div>
            <div className="col-span-3">{planta.nomeCientifico}</div>
            <div className="col-span-3">{planta.rega}</div>
            <div className="col-span-4 flex justify-end gap-4 pr-2 action-buttons"> {/* Adiciona a classe aqui */}
              <Pencil className="text-[#344E41] cursor-pointer" onClick={(e) => { /* abrir modal de edição */ }} />
              <Trash2 className="text-red-500 cursor-pointer" onClick={(e) => { /* abrir modal de confirmação */ }} />
            </div>
          </div>
        ))}
  
        {idSelecionado && <ModalDetalhes id={idSelecionado} onClose={fecharModal} />}
        {modalCriarAberto && (
          <ModalAdicionar
            onClose={() => setModalCriarAberto(false)}
            onSubmit={handleCriarPlanta}
          />
        )}
      </div>
    );
  }
  