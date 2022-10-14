import { CategoryTotals } from '../../values/customTypes';

interface CardProps {
  category: CategoryTotals;
}

function CategoryCard({
  category,
  clickFunction,
  clicked,
}: {
  category: CategoryTotals;
  clickFunction: (cat_name: string) => void;
  clicked: string;
}) {
  return (
    <div
      className={`flex-1 p-1 py-6 mx-2 mb-4 bg-white rounded-lg border  shadow-md text-center overflow-scroll min-w-[30%] sm:min-w-[30%] max-w-[400px] cursor-pointer
      sm:hover:scale-105 hover:scale-110
      ${category.category_name === clicked && 'bg-teal-400'}`}
      onClick={() => {
        clickFunction(category.category_name);
      }}
    >
      <h5 className=" text-xl font-bold tracking-tight text-gray-900">
        {category.category_name}
      </h5>
      <p className="font-normal text-gray-700"> £{category.category_total}</p>
    </div>
  );
}

export default CategoryCard;
