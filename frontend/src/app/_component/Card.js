import { Plus } from "lucide-react";

const Card = () => {
  return (
    <div className="bg-white max-w-99.25 p-3 rounded-2xl">
      <div className="flex flex-col">
        <div className="relative mb-5">
          <img
            src="/food.png"
            alt="Food item"
            className="w-full rounded-xl max-h-52.5 object-cover"
          />
          <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition">
            <Plus className="w-4 h-4 text-red-500" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-[24px] text-[#EF4444]">
              Sunshine Stackers
            </h3>
            <h4 className="text-black font-semibold text-[18px]">$12.99</h4>
          </div>
          <p className="font-normal text-[14px] text-black">
            Fluffy pancakes stacked with fruits, cream, syrup, and powdered
            sugar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
