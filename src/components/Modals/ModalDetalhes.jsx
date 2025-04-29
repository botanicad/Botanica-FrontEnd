import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ModalDetalhes({ planta, onClose }) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-3xl max-h-[90vh] flex flex-col"
        >
          {/* Botão Fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
          >
            <X size={24} className="text-gray-600" />
          </button>

          {/* Container principal */}
          <div className="flex flex-col sm:flex-row h-full">
            {/* Imagem */}
            <img
              src={`data:image/jpeg;base64,${planta.imagemBase64}`}
              alt={planta.nomePopular}
              className="w-full sm:w-1/3 object-cover h-60 sm:h-auto"
            />

            {/* Conteúdo */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-gray-900">{planta.nomePopular}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
                <div>
                  <p className="font-semibold">Nome Científico</p>
                  <p className="text-gray-500">{planta.nomeCientifico}</p>
                </div>
                <div>
                  <p className="font-semibold">Irrigação</p>
                  <p className="text-gray-500">{planta.rega}</p>
                </div>
                <div>
                  <p className="font-semibold">Iluminação</p>
                  <p className="text-gray-500">{planta.luz}</p>
                </div>
              </div>

              {/* História */}
              {planta.historiaPlanta && (
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <p className="font-semibold text-gray-900 mb-2">História</p>
                  <p className="text-gray-600 leading-relaxed text-justify break-words">
                    {planta.historiaPlanta}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
