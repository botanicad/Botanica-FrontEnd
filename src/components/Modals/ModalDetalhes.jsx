import { useEffect, useState } from "react";
import axios from "../../services/api";
import { X } from "lucide-react";

export default function ModalDetalhes({ id, onClose }) {
  const [planta, setPlanta] = useState(null);

  useEffect(() => {
    axios.get(`/flora/${id}`)
      .then(res => setPlanta(res.data))
      .catch(err => console.error("Erro ao buscar planta", err));
  }, [id]);

  if (!planta) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full relative mx-4 border border-gray-100">
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={24} className="text-gray-600 hover:text-gray-900" />
        </button>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Imagem */}
          <div className="flex-shrink-0">
            <img 
              src={`data:image/jpeg;base64,${planta.imagemBase64}`} 
              alt={planta.nomePopular} 
              className="w-full md:w-48 h-48 rounded-lg object-cover border border-gray-200 shadow-sm" 
            />
          </div>
          
          {/* Informações */}
          <div className="flex-1">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{planta.nomePopular}</h2>
              <p className="text-gray-600 italic">{planta.nomeCientifico}</p>
            </div>
            
            {/* Grid de detalhes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="block text-sm font-semibold text-gray-500 mb-1">Irrigação</span>
                <p className="text-gray-800">{planta.rega}</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="block text-sm font-semibold text-gray-500 mb-1">Iluminação</span>
                <p className="text-gray-800">{planta.luz}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* História */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">História</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 leading-relaxed">{planta.historiaPlanta}</p>
          </div>
        </div>
      </div>
    </div>
  );
}