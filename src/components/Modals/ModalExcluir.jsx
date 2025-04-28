import { X, Trash2 } from "lucide-react";

export default function ModalExcluir({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl w-[400px] h-[274px] p-6 flex flex-col justify-between relative">
        
        <button className="absolute top-4 right-4" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center mt-4">
          <div className="bg-red-100 rounded-full p-3 mb-4">
            <Trash2 size={28} className="text-red-500" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Deletar planta</h2>
          <p className="text-gray-500 text-sm">
            Você tem certeza que deseja excluir essa planta?
            <br />
            Essa ação é irreversível.
          </p>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            className="flex-1 py-2 border border-gray-300 rounded-xl text-gray-700 font-semibold"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="flex-1 py-2 bg-red-500 text-white rounded-xl font-semibold"
            onClick={onConfirm}
          >
            Deletar
          </button>
        </div>

      </div>
    </div>
  );
}
