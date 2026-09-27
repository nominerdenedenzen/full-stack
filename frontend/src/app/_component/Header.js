import { ChevronRight, MapPin, ShoppingCart, User } from "lucide-react";

const Header = () => {
  return (
    <div className="bg-black py-3 px-22">
      <div className="flex justify-between">
        <img src="/logo.png" className="h-11 " />
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-white border border-gray-700 px-4 py-1.5 rounded-full text-xs text-gray-300">
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="text-red-500">Delivery address:</span>
            <span className="text-white font-medium">Add Location</span>
            <ChevronRight className="text-gray-400 h-4 w-4" />
          </div>

          <button className="bg-white rounded-full py-2 px-4 text-gray-900">
            <ShoppingCart className="w-4 h-4" />
          </button>
          <button className="bg-[#EF4444] rounded-full py-2 px-4 text-white">
            <User className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
