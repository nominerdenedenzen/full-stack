import Card from "./Card";

const Menu = () => {
  const foodItems = [1, 2, 3, 4, 5, 6];

  return (
    <div className="py-12 px-6 md:px-20 min-h-screen">
      <div className="flex flex-col gap-6">
        <h2 className="font-semibold text-white text-[20px]">Appetizers</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {foodItems.map((item, index) => (
            <Card key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
