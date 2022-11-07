import { CategoryTotals } from '../../values/customTypes';
import { DragEvent, useState } from 'react';
import { updateCategory } from '../../api/CategoryService';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  changeStatusToIdle,
  leftTarget,
  enterTarget,
  changeClicked,
} from '../../redux/catSlice';
import { RootState } from '../../redux/store';
import '../../styles/category-screen.css';

function CategoryCard({
  category,
  clickFunction,
  clicked,
}: {
  category: CategoryTotals;
  clickFunction: (cat_name: string) => void;
  clicked: string;
}) {
  
  const dispatch = useAppDispatch();

  const hoverState = useAppSelector(
    (state: RootState) => state.categories.hovered
  );

  const onDragOver = (e: DragEvent<HTMLDivElement>, category_name: string) => {
    if (category_name !== clicked) e.preventDefault();
  };

  const onDragEnter = (e: DragEvent<HTMLDivElement>, cat_name: string) => {
    if (hoverState !== cat_name) {
      dispatch(enterTarget(cat_name));
    }
  };
  const onDragLeave = (e: DragEvent<HTMLDivElement>, cat_name: string) => {
    e.stopPropagation();
    e.preventDefault();

    dispatch(leftTarget());
  };

  const onDrop = async (
    e: DragEvent<HTMLDivElement>,
    category_id: string,
    cat_name: string
  ) => {
    let merchant_id_event = e.dataTransfer.getData('merchant_id');
    let newCategory_id = Number(category_id);
    const merchant_id = Number(merchant_id_event);
    // dispatch redux action that changes category of the transaction
    const data = { merchant_id, newCategory_id };
    await updateCategory(data);
    
    dispatch(changeStatusToIdle());
    dispatch(changeClicked(cat_name));
    dispatch(leftTarget());
  };

  return (
    <div
      key={category.category_name}
      onDragOver={(e) => onDragOver(e, String(category.category_name))}
      onDragEnter={(e) => onDragEnter(e, category.category_name)}
      onDragLeave={(e) => onDragLeave(e, category.category_name)}
      onDrop={(e) =>
        onDrop(e, String(category.category_id), category.category_name)
      }
      className={`flex-1 p-1 mt-5 py-6 mx-2 mb-4  rounded-lg border shadow-md text-center cursor-pointer  sm:max-w-none hover:scale-100 ${
        category.category_name === clicked && 'bg-teal-400'
      } ${category.category_name}`}
      style={
        category.category_name === hoverState &&
        category.category_name !== clicked
          ? { scale: '1.1' }
          : {}
      }
      onClick={() => {
        clickFunction(category.category_name);
      }}>
      <h5 className="pointer-events-none adjustFont text-xl font-bold tracking-tight ">
        {category.category_name}
      </h5>
      <p className=" pointer-events-none font-normal ">
        {' '}
        £{category.category_total}
      </p>
    </div>
  );
}

export default CategoryCard;
