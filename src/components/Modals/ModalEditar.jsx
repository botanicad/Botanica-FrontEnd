import { useState } from "react";
import { X } from "lucide-react";
import SimboloImagem from "../../assets/svgs/SimboloImagem.svg";

export default function ModalEditar({ onClose, onSubmit, planta }) {
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(planta?.imagemBase64 ? `data:image/jpeg;base64,${planta.imagemBase64}` : null);
  const [form, setForm] = useState({
    nomePopular: planta.nomePopular || "",
    nomeCientifico: planta.nomeCientifico || "",
    historiaPlanta: planta.historiaPlanta || "",
    rega: planta.rega || "",
    luz: planta.luz || ""
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-[777px] h-auto relative border border-gray-100 flex flex-col">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <X size={24} className="text-gray-600 hover:text-gray-900" />
        </button>

        <h2 className="text-2xl font-bold text-[#344E41] mb-4 text-center font-poppins">
          Editar espécie de planta
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <label className="border-2 border-dashed border-gray-300 w-full md:w-40 h-40 flex flex-col justify-center items-center rounded-lg cursor-pointer shadow-md bg-gray-50">
            {preview ? (
              <img src={preview} alt="Prévia" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <>
                <img src={SimboloImagem} alt="Ícone" className="w-8 h-8 mb-1" />
                <p className="text-center text-sm text-gray-500 font-medium">Adicionar imagem</p>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>

          <div className="flex-1 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "nomePopular", label: "Nome Popular", placeholder: "Digite o Nome Popular" },
                { name: "nomeCientifico", label: "Nome Científico", placeholder: "Digite o Nome Científico" },
                { name: "rega", label: "Rega", placeholder: "Digite a Rega" },
                { name: "luz", label: "Luz", placeholder: "Digite a Luz" },
              ].map((field, idx) => (
                <div key={idx}>
                  <label className="text-sm font-semibold text-gray-600 mb-1">{field.label}</label>
                  <input
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 shadow-sm focus:ring-2 focus:ring-[#344E41] transition-all"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1">História</label>
              <textarea
                name="historiaPlanta"
                value={form.historiaPlanta}
                onChange={handleChange}
                className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 shadow-sm focus:ring-2 focus:ring-[#344E41] resize-none transition-all"
                placeholder="Conte a história desta planta..."
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center md:justify-end">
          <button
            onClick={handleSubmit}
            className="bg-[#344E41] text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-[#2C3E36] transition-all"
          >
            Atualizar
          </button>
        </div>
      </div>
    </div>
  );
}
