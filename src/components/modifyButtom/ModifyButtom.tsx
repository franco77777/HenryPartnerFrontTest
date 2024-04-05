import axios from "axios";
import { Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { Product } from "../../utils/interfaces";
import { useAppDispatch } from "../../utils/cfg";
import { getProducts } from "../../redux/productsSlice";

type Props = {
  product: Product;
};
const ModifyButtom = (props: Props) => {
  //const [openModal, setOpenModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const dispatch = useAppDispatch();

  function onCloseModal() {
    setOpenModal(false);
    setName("");
  }
  const saveChanges = async () => {
    const productUpdate = {
      name,
      quantity,
    };
    const { data } = await axios.put(
      `https://henry-partner-back-test.vercel.app/api/products/${props.product._id}`,
      productUpdate
    );
    console.log(data);

    dispatch(getProducts());
  };
  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        type="button"
        className="pointer-events-auto focus:outline-none text-white bg-blue-500 hover:bg-blue-600  rounded-md  py-[calc(2px+0.2vw)] px-[calc(6px+0.2vw)] mb-[calc(1px+1vw)] dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Modify
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
                placeholder={props.product.name}
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
                placeholder={props.product.quantity + ""}
                onChange={(event) => setQuantity(event.target.value)}
                required
              />
            </div>
            <div className="flex justify-between"></div>
            <div className="w-full ">
              <button
                onClick={() => {
                  saveChanges();
                  setOpenModal(!openModal);
                }}
                type="button"
                className="focus:outline-none text-white bg-green-500 hover:bg-green-600  rounded-md  px-[calc(2px+0.5vw)] py-[calc(2px+0.5vw)] mb-[calc(2px+0.5vw)] dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Save Changes
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ModifyButtom;
