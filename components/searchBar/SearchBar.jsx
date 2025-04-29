import { Search } from "lucide-react";

export default function SearchBar({ busca, setBusca }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Pesquisar planta..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3a5a40]"
        />
        <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
      </div>
    </div>
  );
}
