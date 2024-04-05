"use client";

import { FloatingLabel, Pagination } from "flowbite-react";
import { useState } from "react";

export default function PaginationComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsQuantity, setProductsQuantity] = useState("");

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const setProductQuantity = () => {
    console.log("soy quantiy", productsQuantity);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex gap-2 h-[30px] min-w-min ">
        <div className="text-gray-500 text-lg">Quantity</div>
        <input
          type="text"
          className="w-10 rounded border border-gray-300 p-2"
          onChange={(e) => setProductsQuantity(e.target.value)}
          onKeyUp={setProductQuantity}
        />
      </div>
      <div className=" overflow-x-auto ">
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
