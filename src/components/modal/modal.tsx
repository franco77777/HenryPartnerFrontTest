"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import "./test.css";
import axios from "axios";
import { useAppDispatch } from "../../utils/cfg";
import { getProducts } from "../../redux/productsSlice";

export default function Component() {
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  function onCloseModal() {
    setOpenModal(false);
    setName("");
  }
  const saveProduct = async () => {
    const product = {
      name,
      quantity,
    };
    const { data } = await axios.post(
      "http://localhost:3000/api/products",
      product
    );
    console.log("product added", data);
    dispatch(getProducts());
  };
  console.log(name, openModal, quantity);

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        type="button"
        className="focus:outline-none text-white bg-green-500 hover:bg-green-600 rounded-md text-[calc(8px+2vw)] py-[calc(2px+0.2vw)] px-[calc(6px+0.2vw)] mb-[calc(1px+1vw)] dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Add Product
      </button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-1">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Product Name" />
              </div>
              <TextInput
                id="email"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Quantity" />
              </div>
              <TextInput
                id="password"
                onChange={(event) => setQuantity(event.target.value)}
                required
              />
            </div>
            <div className="flex justify-between"></div>
            <div className="w-full ">
              <button
                onClick={() => {
                  saveProduct();
                  setOpenModal(!openModal);
                }}
                type="button"
                className="focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Add
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
