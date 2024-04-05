"use client";

import axios from "axios";
import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
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
    console.log("soy product", doc);
  }, []);
  console.log("soy product2", doc);

  const onPageChange = async (page: number) => {
    dispatch(setCurrentPage(page));
    const { data } = await axios(
      `http://localhost:3000/api/products/pagination?limit=${productsQuantity}&page=${page}&name=${searcher}`
    );
    console.log("soy data", data);
    dispatch(setCurrentProduct(data));
  };

  const setProductQuantity = async () => {
    const { data } = await axios(
      `http://localhost:3000/api/products/pagination?limit=${productsQuantity}&page=${currentPage}&name=${searcher}`
    );
    console.log("soy data", data);
    dispatch(setCurrentProduct(data));
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex gap-2 h-[30px] min-w-min ">
        <div className="text-gray-500 text-lg">Quantity</div>
        <input
          type="text"
          className="w-10 rounded border border-gray-300 p-2"
          onChange={(e) => dispatch(setCurrentQuantity(e.target.value))}
          onKeyUp={setProductQuantity}
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
