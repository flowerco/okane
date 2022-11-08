import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchCategories,
  selectCats,
  changeClicked,
} from '../../redux/catSlice';
import { Loading } from '../widgets/Loading';
import { Error } from '../widgets/Error';
import { useEffect, useRef } from 'react';
import { CategoryTotals } from '../../values/customTypes';
import CategoryCard from '../widgets/CategoryCard';
import moment from 'moment';
import { DragEvent } from 'react';
import '../../styles/category-screen.css';

function CategoriesScreen() {
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const categoryState = useAppSelector(selectCats);
  const categoryTotals = categoryState.totals;
  const categoryTransaction = categoryState.transactions;
  const clickedCategory = categoryState.clicked;
  const status = categoryState.status;
  const categoryError = categoryState.error;
  const month = new Date(2022, 9, 1).toLocaleDateString('en-GB', {
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
  }, [status, dispatch]);

  const handleClick = (cat_name: string) => {
    dispatch(changeClicked(cat_name));
  };

  const dragStarted = (e: DragEvent<HTMLDivElement>, merchant_id: string) => {
    e.dataTransfer.setData('merchant_id', merchant_id);
    if (ref.current !== null) {
      ref.current.style.cursor = 'grabbing';
    }
  };

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'failed') {
    return <Error error={categoryError} />;
  }

  const dragEnd = () => {
    if (ref.current !== null) {
      ref.current.style.cursor = 'grab';
      ref.current.classList.remove('enablehover:hover');
    }
  };

  return (
    <div className="h-[100%]">
      <div className="">
        <h1 className="font-bold adjustFontTitle uppercase text-white mb-4 text-center ">
          Spending Breakdown - {month}
        </h1>
        <div className="flex flex-nowrap overflow-scroll w-11/12 mx-auto ">
          {/* <div className="px-3 grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-1"> */}
          {categoryTotals.map((category: CategoryTotals, index: number) => {
            return (
              <CategoryCard
                key={index}
                category={category}
                clickFunction={handleClick}
                clicked={clickedCategory}
              />
            );
          })}
        </div>
      </div>
      <div className="h-[60%] w-11/12 overflow-y-scroll mx-auto">
        <div className=" rounded-md adjustFont  mt-4">
          <div className="grid grid-cols-[_40%_40%_20%] border-b-4 bg-indigo-200 border-gray-600">
            <div className="justify-self-start  text-black px-3 font-extrabold ">
              Merchant
            </div>
            <div className="justify-self-center  text-black px-3 font-extrabold">
              Date
            </div>
            <div className="justify-self-end px-1 text-black font-extrabold">
              Price
            </div>
          </div>
          {categoryTransaction
            .filter((trans) => trans.category_name === clickedCategory)
            .slice()
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((filteredTrans, index) => {
              const uniqueId =
                '' +
                index +
                filteredTrans.category_name +
                filteredTrans.merchant_name;
              return (
                <div key={uniqueId} className="  p-2 ">
                  <div
                    draggable
                    ref={ref}
                    onDragStart={(e) =>
                      dragStarted(e, String(filteredTrans.merchant_id))
                    }
                    onDragEnd={() => dragEnd()}
                    className={`${uniqueId} grid grid-cols-[_40%_40%_20%] justify-start cursor-grab bg-indigo-200  text-gray-700 hover:text-teal-400 hover:bg-teal-100 rounded-md px-2 py-1 `}>
                    {/* <span className="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>  POTENTIAL IMAGE */}
                    <div className="flex-grow font-medium px-1 text-lg justify-self-start">
                      {filteredTrans.merchant_name}
                    </div>
                    <div className="flex-grow text-lg  font-normal text-black-500 justify-self-center">
                      {filterDate(filteredTrans.date)}
                    </div>
                    <div className="text-md font-normal text-gray-500 tracking-wide justify-self-end">
                      £{filteredTrans.price}
                    </div>
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
