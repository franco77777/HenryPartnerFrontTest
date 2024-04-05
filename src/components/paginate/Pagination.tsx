"use client";

import axios from "axios";
import { Pagination } from "flowbite-react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/cfg";
import {
  getProducts,
  setCurrentPage,
  setCurrentProduct,
  setCurrentQuantity,
} from "../../redux/productsSlice";

export default function PaginationComponent() {
  // const [currentPage, setCurrentPage] = useState(1);
  // const [productsQuantity, setProductsQuantity] = useState(3);
  const currentPage = useAppSelector((state) => state.products.page);
  const productsQuantity = useAppSelector((state) => state.products.quantity);
  const doc = useAppSelector((state) => state.products.products);
  const searcher = useAppSelector((state) => state.products.searcher);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const onPageChange = async (page: number) => {
    dispatch(setCurrentPage(page));
    if (searcher) {
      const { data } = await axios(
        `https://henry-partner-back-test.vercel.app/api/products/pagination?limit=${productsQuantity}&page=${page}&name=${searcher}`
      );

      dispatch(setCurrentProduct(data));
    } else {
      const { data } = await axios(
        `https://henry-partner-back-test.vercel.app/api/products/pagination?limit=${productsQuantity}&page=${page}`
      );

      dispatch(setCurrentProduct(data));
    }
  };

  const setProductQuantity = async () => {
    if (searcher) {
      const { data } = await axios(
        `https://henry-partner-back-test.vercel.app/api/products/pagination?limit=${productsQuantity}&page=${currentPage}&name=${searcher}`
      );

      data.totalPages < currentPage
        ? dispatch(setCurrentPage(data.totalPages))
        : "";
      dispatch(setCurrentProduct(data));
    } else {
      const { data } = await axios(
        `https://henry-partner-back-test.vercel.app/api/products/pagination?limit=${productsQuantity}&page=${currentPage}`
      );

      data.totalPages < currentPage
        ? dispatch(setCurrentPage(data.totalPages))
        : "";
      dispatch(setCurrentProduct(data));
    }
  };

  const changingCurrentQuantity = (e: string) => {
    dispatch(setCurrentQuantity(parseInt(e)));
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="text-gray-500 text-[calc(8px+1vw)]">
        Total Pages: {doc?.totalPages}
      </div>
      <div className="text-gray-500 text-[calc(8px+1vw)]">
        Total Products: {doc?.totalDocs}
      </div>
      <div className="flex gap-2 h-[30px] min-w-min justify-center items-center ">
        <div className="text-gray-500 text-[calc(8px+1vw)]">Quantity</div>
        <input
          type="text"
          className="w-10 h-8 rounded border border-gray-300 p-2"
          onChange={(e) => changingCurrentQuantity(e.target.value)}
          onKeyUp={() => setProductQuantity()}
        />
      </div>

      <div className=" overflow-x-auto ">
        {doc?.docs && (
          <Pagination
            currentPage={currentPage}
            totalPages={doc.totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
}
