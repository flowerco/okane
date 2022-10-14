import { CategoryTotals } from '../../values/customTypes';
import './categoryScreen.css';
import { DragEvent } from 'react';
interface CardProps {
  category: CategoryTotals;
}

const onDragOver = (e: DragEvent<HTMLDivElement>, category_id: string) => {
  e.preventDefault();
  console.log('currently on', category_id);
};

const onDrop = async (e: DragEvent<HTMLDivElement>, category_id: string) => {
  console.log('Dropped on:', category_id);
  let merchant_id_event = e.dataTransfer.getData('merchant_id');
  let newCategory_id = Number(category_id);
  const merchant_id = Number(merchant_id_event);
  console.log('merchant_id ', merchant_id);
  console.log('newCategoryID:', newCategory_id);
  // dispatch redux action that changes category of the transaction
  const data = { merchant_id, newCategory_id };
  console.log(JSON.stringify(data));
  const result = await fetch(
    `http://localhost:${process.env.REACT_APP_PORT}/category`,
    {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());
  console.log('result from call is', result);
};

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
      onDragOver={(e) => onDragOver(e, String(category.category_id))}
      onDrop={(e) => onDrop(e, String(category.category_id))}
      className={`flex-1 p-1 py-6 mx-2 mb-4 bg-white rounded-lg border shadow-md text-center cursor-pointer  sm:max-w-none
     hover:scale-100
      ${category.category_name === clicked && 'bg-teal-400'}`}
      onClick={() => {
        clickFunction(category.category_name);
      }}>
      <h5 className="adjustFont text-xl font-bold tracking-tight text-gray-900">
        {category.category_name}
      </h5>
      <p className="font-normal text-gray-700"> £{category.category_total}</p>
    </div>
  );
}

export default CategoryCard;
