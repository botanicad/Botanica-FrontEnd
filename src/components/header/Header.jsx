import Logo from "../../assets/svgs/Logo.svg";
import { Plus } from "lucide-react";

export default function Header({ onAdicionar }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
      <div className="flex items-center gap-3">
        <img src={Logo} alt="Ícone de plantas" className="w-8 h-8" />
        <h1 className="text-3xl font-bold text-[#2c3e2a]">Lista de Plantas</h1>
      </div>
      <button
        className="bg-[#3a5a40] hover:bg-[#2d4734] text-white px-5 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-md w-full sm:w-auto justify-center"
        onClick={onAdicionar}
      >
        <Plus size={20} />
        <span>Adicionar plantas</span>
      </button>
    </div>
  );
}
