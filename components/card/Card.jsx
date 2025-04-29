import { Edit, Trash2 } from "lucide-react";

export default function PlantCard({ planta, onEditar, onExcluir, onDetalhes }) {
  return (
    <div
      className="grid grid-cols-12 items-center p-4 hover:bg-[#f8f9fa] transition-colors cursor-pointer"
      onClick={onDetalhes}
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
            onEditar();
          }}
        >
          <Edit size={18} />
        </button>
        <button
          className="p-2 text-[#e76f51] hover:text-[#d6452a] hover:bg-[#fcecea] rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            onExcluir();
          }}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
