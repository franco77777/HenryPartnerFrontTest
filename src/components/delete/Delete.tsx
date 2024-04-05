import axios from "axios";
import { useAppDispatch } from "../../utils/cfg";
import { getProducts } from "../../redux/productsSlice";
import { Product } from "../../utils/interfaces";

type Props = {
  productId: Product;
};

const Delete = (props: Props) => {
  const dispatch = useAppDispatch();
  const deleteProduct = async () => {
    const { data } = await axios.delete(
      `https://henry-partner-back-test.vercel.app/api/products/${props.productId._id}`
    );
    console.log("product deleted", data);
    dispatch(getProducts());
  };
  return (
    <>
      <button
        onClick={() => deleteProduct()}
        type="button"
        className="py-[calc(2px+0.2vw)] px-[calc(6px+0.2vw)] mb-[calc(1px+1vw)] text-white relative bg-red-500 hover:bg-red-600  pointer-events-auto  rounded-md      "
      >
        Delete
      </button>
    </>
  );
};
export default Delete;
