import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchCategories, selectCats, changeClicked } from '../../redux/catSlice';
import { useEffect, useRef, useState } from 'react';
import { CategoryTotals } from '../../values/customTypes';
import CategoryCard from '../widgets/CategoryCard';
import moment from 'moment';
import { DragEvent } from 'react';
import '../widgets/categoryScreen.css';

function CategoriesScreen() {
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const categoryState = useAppSelector(selectCats);
  const categoryTotals = categoryState.totals;
  const categoryTransaction = categoryState.transactions;
  const clickedCategory = categoryState.clicked;
  const status = categoryState.status;
  const categoryError = categoryState.error;
  const month = new Date().toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });
  const filterDate = (date: string) => {
    return moment(date).format('dddd Do');
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
    // may need to add to state for this to work
    // if (status === 'succeeded') setClicked(categoryTotals[0].category_name);
  }, [status, dispatch]);

  const handleClick = (cat_name: string) => {
    // setClicked(cat_name);
    dispatch(changeClicked(cat_name));
  };

  const dragStarted = (e: DragEvent<HTMLDivElement>, merchant_id: string) => {
    console.log('Drag has started:', merchant_id);
    e.dataTransfer.setData('merchant_id', merchant_id);
    if (ref.current !== null) ref.current.style.cursor = 'grabbing';
  };

  const dragEnd = () => {
    if (ref.current !== null) ref.current.style.cursor = 'grab';
  };

  return (
    <div className="h-[100%]">
      <div className="">
        <h1 className="font-bold adjustFontTitle uppercase text-white mb-4 text-center ">Spending Breakdown - {month}</h1>
        <div className="flex flex-nowrap overflow-scroll w-11/12 mx-auto ">
          {/* <div className="px-3 grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-1"> */}
          {categoryTotals.map((category: CategoryTotals, index: number) => {
            return (
              <>
                <CategoryCard key={index} category={category} clickFunction={handleClick} clicked={clickedCategory} />
              </>
            );
          })}
        </div>
      </div>
      {/* TODO put overflow scroll on transactions */}
      <div className="h-[60%]">
        <div className="bg-white rounded-md adjustFont w-11/12 mx-auto mt-4">
          <div className="grid grid-cols-[_40%_40%_20%] border-b-4 ">
            <div className="justify-self-start px-3 font-extrabold">Merchant</div>
            <div className="justify-self-center px-3 font-extrabold">Date</div>
            <div className="justify-self-end px-1 font-extrabold">Price</div>
          </div>
          {categoryTransaction
            .filter((trans) => trans.category_name === clickedCategory)
            .slice()
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((filteredTrans, index) => {
              const uniqueId = '' + index + filteredTrans.date + filteredTrans.merchant_id;
              return (
                <div className=" bg-slate-700  p-2 ">
                  <div
                    draggable
                    ref={ref}
                    onDragStart={(e) => dragStarted(e, String(filteredTrans.merchant_id))}
                    onDragEnd={() => dragEnd()}
                    key={uniqueId}
                    className="grid grid-cols-[_40%_40%_20%] justify-start cursor-grab bg-white text-gray-700 hover:text-teal-400 hover:bg-teal-100 rounded-md px-2 py-1 ">
                    {/* <span className="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>  POTENTIAL IMAGE */}
                    <div className="flex-grow font-medium px-1 text-lg justify-self-start">{filteredTrans.merchant_name}</div>
                    <div className="flex-grow text-lg font-normal text-black-500 justify-self-center">{filterDate(filteredTrans.date)}</div>
                    <div className="text-md font-normal text-gray-500 tracking-wide justify-self-end">£{filteredTrans.price}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default CategoriesScreen;
