import { Edit2Icon } from "lucide-react";

const Dishcard = (food) => {
  return (
    <div className="bg-white max-w-sm w-full rounded-3xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col">
        <div className="relative aspect-4/3 mb-4 overflow-hidden rounded-2xl">
          <img
            src="/food.png"
            alt="Food item"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          />
          <button className="absolute bottom-3 right-3 bg-white rounded-full p-2.5 shadow-lg hover:bg-gray-50 transition-colors active:scale-95 duration-200">
            <Edit2Icon className="w-5 h-5 text-red-500 stroke-[2.5]" />
          </button>
        </div>

        <div className="flex flex-col gap-1.5 px-0.5">
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-bold text-[22px] leading-tight text-[#EF4444] tracking-tight">
              {food.name}
            </h3>
            <h4 className="text-black font-bold text-[18px] leading-tight pt-0.5">
              ${food.price}
            </h4>
          </div>
          <p className="font-normal text-[14px] leading-relaxed text-gray-600">
            {food.ingredients}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Dishcard;
