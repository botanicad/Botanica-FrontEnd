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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-100 transition-all">

        {/* Botão X no mobile */}
        <div className="flex justify-end md:hidden mb-2">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X size={24} className="text-gray-600 hover:text-gray-900" />
          </button>
        </div>

        {/* Botão X no desktop */}
        <button
          onClick={onClose}
          className="hidden md:block absolute right-6 top-6 p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <X size={24} className="text-gray-600 hover:text-gray-900" />
        </button>

        {/* Título */}
        <h2 className="text-2xl font-bold text-[#344E41] mb-6 text-center font-poppins">
          Adicione uma espécie de planta
        </h2>

        {/* Conteúdo da Modal */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Imagem */}
          <div className="md:col-span-2">
            <label className="border-2 border-dashed border-gray-300 w-full aspect-[4/3] flex flex-col justify-center items-center rounded-xl cursor-pointer shadow-md bg-gray-50 hover:bg-gray-100 transition-all duration-300">
              {preview ? (
                <img
                  src={preview}
                  alt="Prévia"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <>
                  <img src={SimboloImagem} alt="Ícone" className="w-10 h-10 mb-2" />
                  <p className="text-center text-sm text-gray-500 font-medium">
                    Coloque sua imagem aqui
                  </p>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>

          {/* Formulário */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Nome</label>
              <input
                name="nomePopular"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#344E41] focus:outline-none"
                placeholder="Exemplo título"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Irrigação</label>
              <input
                name="rega"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#344E41] focus:outline-none"
                placeholder="Exemplo título"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Nome Científico</label>
              <input
                name="nomeCientifico"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#344E41] focus:outline-none"
                placeholder="Exemplo título"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Iluminação</label>
              <input
                name="luz"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#344E41] focus:outline-none"
                placeholder="Exemplo título"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 mb-1 block">História</label>
              <textarea
                name="historiaPlanta"
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm resize-none focus:ring-2 focus:ring-[#344E41] focus:outline-none"
                placeholder="Exemplo título"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end bg-white">
          <button
            onClick={handleSubmit}
            className="bg-[#344E41] text-white font-semibold px-6 py-2 rounded-md shadow-md hover:bg-[#2C3E36] transition-all"
          >
            Publicar
          </button>
        </div>

      </div>
    </div>
  );
}
