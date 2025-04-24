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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-lg w-full relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-700">
          <X size={24} />
        </button>
        <div className="flex gap-4">
          <img src={`data:image/jpeg;base64,${planta.imagemBase64}`} alt={planta.nomePopular} className="w-24 h-24 rounded object-cover" />
          <div>
            <h2 className="text-xl font-semibold">{planta.nomePopular}</h2>
            <div className="grid grid-cols-2 mt-2 gap-y-1">
              <div>
                <span className="font-bold">Nome Científico:</span><br />{planta.nomeCientifico}
              </div>
              <div>
                <span className="font-bold">Irrigação:</span><br />{planta.rega}
              </div>
              <div>
                <span className="font-bold">Iluminacao:</span><br />{planta.luz}
              </div>
              <div>
                <span className="font-bold">Bioma:</span><br />{planta.bioma}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-bold">História</p>
          <p className="text-sm text-gray-600">{planta.historiaPlanta}</p>
        </div>
      </div>
    </div>
  );
}
