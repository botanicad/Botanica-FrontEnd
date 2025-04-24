import { useState } from "react";
import { X } from "lucide-react";
import axios from "../../services/api";

export default function ModalAdicionar({ onClose, setRefetchTrigger }) {
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    nomePopular: "",
    nomeCientifico: "",
    historiaPlanta: "",
    rega: "",
    luz: "",
    bioma: ""
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!imagem) {
      alert("Por favor, selecione uma imagem.");
      return;
    }
  
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result.split(",")[1]; // remove o prefixo do base64
  
      const dadosComImagem = {
        ...form,
        imagemBase64: base64String,
      };
  
      try {
        await axios.post("/flora", dadosComImagem, {
          headers: { "Content-Type": "application/json" },
        });
        onClose();
        setRefetchTrigger((prev) => prev + 1);
      } catch (err) {
        console.error("Erro ao salvar planta:", err);
      }
    };
  
    reader.readAsDataURL(imagem);
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-[777px] h-[500px] rounded-[15px] p-6 relative shadow-md">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <X className="text-gray-500 hover:text-black" />
        </button>

        <h2 className="text-[35px] font-bold text-[#344E41] font-poppins mb-6">
          Adicione uma espécie de planta
        </h2>

        <div className="flex gap-6">
          {/* Imagem */}
          <label className="border-2 border-dashed border-gray-300 w-[200px] h-[200px] flex flex-col justify-center items-center rounded-[20px] cursor-pointer shrink-0 shadow-sm">
            {preview ? (
              <img src={preview} alt="Prévia" className="w-full h-full object-cover rounded-[20px]" />
            ) : (
              <>
                <img src="src/images/Vector.svg" alt="Ícone" className="w-15 h-15" />
                <p className="text-center text-sm mt-2 text-[#344E41] font-medium font-poppins">
                  Coloque sua imagem aqui
                </p>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>

          {/* Formulário */}
          <div className="flex flex-col gap-4 w-full font-poppins">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-[#344E41] font-bold text-sm mb-1">Nome</label>
                <input
                  name="nomePopular"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 placeholder:text-gray-400 shadow-sm focus:outline-none"
                  placeholder="Ex: samambaia"
                />
              </div>
              <div className="flex-1">
                <label className="block text-[#344E41] font-bold text-sm mb-1">Irrigação</label>
                <input
                  name="rega"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 placeholder:text-gray-400 shadow-sm focus:outline-none"
                  placeholder="Ex: 1 vez por semana"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-[#344E41] font-bold text-sm mb-1">Nome Científico</label>
                <input
                  name="nomeCientifico"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 placeholder:text-gray-400 shadow-sm focus:outline-none"
                  placeholder="Ex: Tracheophyta"
                />
              </div>
              <div className="flex-1">
                <label className="block text-[#344E41] font-bold text-sm mb-1">Iluminação</label>
                <input
                  name="luz"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 placeholder:text-gray-400 shadow-sm focus:outline-none"
                  placeholder="Ex: Luz indireta"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#344E41] font-bold text-sm mb-1">História</label>
              <textarea
                name="historiaPlanta"
                onChange={handleChange}
                className="w-[520px] h-[100px] border border-gray-300 rounded-md px-4 py-2 placeholder:text-gray-400 shadow-sm focus:outline-none resize-none"
                placeholder="Ex: A samambaia é uma planta que..."
              />
            </div>
          </div>
        </div>

        <div className="text-end mt-6">
          <button
            onClick={handleSubmit}
            className="bg-[#344E41] text-white font-bold w-[250px] h-[50px] text-[24px] rounded-md shadow hover:bg-[#2c3e36]"
          >
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
}
