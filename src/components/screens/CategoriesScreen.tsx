import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchCategories, selectCats } from '../../redux/catSlice';
import { useEffect, useState } from 'react';
import { CategoryTotals } from '../../values/customTypes';
import CategoryCard from '../widgets/CategoryCard';
function CategoriesScreen() {
  const dispatch = useAppDispatch();
  const categoryState = useAppSelector(selectCats);
  const categoryTotals = categoryState.totals;
  const categoryTransaction = categoryState.transactions;
  const status = categoryState.status;
  const categoryError = categoryState.error;
  const month = new Date().toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });

  const [clicked, setClicked] = useState<string>('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
    // may need to add to state for this to work
    // if (status === 'succeeded') setClicked(categoryTotals[0].category_name);
  }, []);

  const handleClick = (cat_name: string) => {
    setClicked(cat_name);
  };

  return (
    <>
      <h1 className="font-bold text-3xl uppercase text-white mb-4 text-center ">
        Spending Breakdown - {month}
      </h1>
      <div className="flex flex-wrap justify-center">
        {categoryTotals.map((category: CategoryTotals, index: number) => {
          return (
            <>
              <CategoryCard
                category={category}
                clickFunction={handleClick}
                clicked={clicked}
              />
            </>
          );
        })}
      </div>
      {/* TODO add types to maps */}
      <div className="bg-white mx-3 rounded-md">
        {categoryTransaction
          .filter((trans) => trans.category_name === clicked)
          .map((filteredTrans, index) => {
            return (
              <>
                <div
                  key={index}
                  className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2"
                >
                  <span className="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
                  <div className="flex-grow font-medium px-2">
                    {filteredTrans.merchant_name}
                  </div>
                  <div className="text-sm font-normal text-gray-500 tracking-wide">
                    £{filteredTrans.price}
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}

export default CategoriesScreen;
