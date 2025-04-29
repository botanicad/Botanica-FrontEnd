import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";

export default function MobilePlantCard({ planta, onEditar, onExcluir, onDetalhes }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4"
      onClick={onDetalhes}
    >
      <img
        src={`data:image/jpeg;base64,${planta.imagemBase64}`}
        alt={planta.nomePopular}
        className="w-14 h-14 rounded-lg object-cover border border-gray-200 shrink-0"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-[#344E41] text-base">{planta.nomePopular}</h3>
        <p className="text-sm text-[#6b9080] italic">{planta.nomeCientifico}</p>
        <p className="text-xs text-gray-500 mt-1">{planta.rega}</p>
      </div>
      <div className="flex flex-col gap-1">
        <button
          className="p-1 rounded-full text-[#588157] hover:bg-gray-100 transition"
          onClick={(e) => {
            e.stopPropagation();
            onEditar();
          }}
        >
          <Edit size={18} />
        </button>
        <button
          className="p-1 rounded-full text-[#e76f51] hover:bg-gray-100 transition"
          onClick={(e) => {
            e.stopPropagation();
            onExcluir();
          }}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
}
