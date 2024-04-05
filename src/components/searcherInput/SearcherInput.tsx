import { useState } from "react";
import "./searcherInput.css";
import axios from "axios";
import { useAppDispatch } from "../../utils/cfg";
import { setCurrentProduct } from "../../redux/productsSlice";
const SearcherInput = () => {
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const searching = async () => {
    const { data } = await axios(
      `http://localhost:3000/api/products/filter/${search}`
    );
    dispatch(setCurrentProduct(data));
  };
  return (
    <>
      <form className="max-w-md mx-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={searching}
            type="search"
            id="default-search"
            className="block w-full p-[calc(0.5vw)] ps-10 text-[calc(8px+1vw)] text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
            required
          />
          <button
            type="submit"
            className="centered text-white absolute  bg-blue-700 hover:bg-blue-800  rounded-md text-[calc(8px+1vw)] py-[calc(2px+0.2vw)] px-[calc(6px+0.2vw)]  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
    </>
  );
};

export default SearcherInput;
