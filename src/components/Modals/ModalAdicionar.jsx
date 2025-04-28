import { useState } from "react";
import { X } from "lucide-react";
import SimboloImagem from "../../assets/svgs/SimboloImagem.svg";

export default function ModalAdicionar({ onClose, onSubmit }) {
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    nomePopular: "",
    nomeCientifico: "",
    historiaPlanta: "",
    rega: "",
    luz: ""
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!imagem) {
      alert("Por favor, selecione uma imagem.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      onSubmit({ ...form, imagemBase64: base64String });
      onClose();
    };
    reader.readAsDataURL(imagem);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-4 w-full max-w-2xl relative border border-gray-100">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Fechar"
        >
          <X size={24} className="text-gray-600 hover:text-gray-900" />
        </button>

        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">
          Adicione uma espécie de planta
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <label className="border-2 border-dashed border-gray-300 w-full md:w-32 h-32 flex flex-col justify-center items-center rounded-lg cursor-pointer shrink-0 shadow-sm bg-gray-50">
            {preview ? (
              <img src={preview} alt="Prévia" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <>
                <img src={SimboloImagem} alt="Ícone" className="w-8 h-8 mb-2" />
                <p className="text-center text-xs text-gray-500 font-medium">Adicionar imagem</p>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>

          <div className="flex-1 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["nomePopular", "nomeCientifico", "rega", "luz"].map((field, idx) => (
                <div key={idx}>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                  <input
                    name={field}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-2 py-1 text-gray-800 shadow-sm focus:ring-1 focus:ring-[#344E41] focus:border-[#344E41] transition"
                    placeholder={`Digite o ${field}`}
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">História</label>
              <textarea
                name="historiaPlanta"
                onChange={handleChange}
                className="w-full h-20 border border-gray-300 rounded-lg px-2 py-1 text-gray-800 shadow-sm focus:ring-1 focus:ring-[#344E41] focus:border-[#344E41] resize-none transition"
                placeholder="Conte a história desta planta..."
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center md:justify-end">
          <button
            onClick={handleSubmit}
            className="bg-[#344E41] text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-[#2C3E36] transition"
          >
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
}
