import { CategoryTotals } from '../../values/customTypes';
import './categoryScreen.css';
import { DragEvent } from 'react';
interface CardProps {
  category: CategoryTotals;
}

const onDragOver = (e: DragEvent<HTMLDivElement>, category_id: string) => {
  e.preventDefault();
  console.log('Dragging Over ', category_id);
  // console.log(e.dataTransfer.getData('transactionID'));
};

const onDrop = (e: DragEvent<HTMLDivElement>) => {
  console.log('Dropped');
  let transactionID = e.dataTransfer.getData('merchant_id');
  console.log('transactionID ', transactionID);
  // dispatch redux action that changes category of the transaction
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
      onDrop={(e) => onDrop(e)}
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
