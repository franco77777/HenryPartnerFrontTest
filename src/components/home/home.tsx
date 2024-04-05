import { useEffect, useState } from "react";
import { textGreyLight } from "../../utils/css";
import "./home.css";
import { useAppDispatch, useAppSelector } from "../../utils/cfg";
import { getProducts, getWelcome } from "../../redux/productsSlice";
import Component from "../modal/modal";
import Delete from "../delete/Delete";
import ModifyButtom from "../modifyButtom/ModifyButtom";
import { Product } from "../../utils/interfaces";
import SearcherInput from "../searcherInput/SearcherInput";

const Home = () => {
  // const [toogle, setToogle] = useState<boolean>();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);

  const productInit = {
    _id: "",
    name: "",
    quantity: 0,
    createdAt: "",
    updatedAt: "",
    __v: 0,
  };
  const [productSelected, setProductSelected] = useState<Product>(productInit);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getWelcome());
  }, []);

  const handleToogle = (e: Product) => {
    const item = document.getElementById(e._id);

    const hasClase2 = item?.classList.contains("toogle");
    hasClase2
      ? item?.classList.remove("toogle")
      : item?.classList.add("toogle");
    //console.log(hasClase2);
    const crossButton = document.getElementById("-" + e._id);
    const crossAnimation = crossButton.querySelectorAll("span");
    for (const element of crossAnimation) {
      const rotationExist = element.classList.contains("rotate");
      if (rotationExist) {
        const animationExist = element.classList.contains("rotate2");
        animationExist
          ? element.classList.remove("rotate2")
          : element.classList.add("rotate2");
      } else {
        const sencondAnimation = element.classList.contains("getOffCross");
        sencondAnimation
          ? element.classList.remove("getOffCross")
          : element.classList.add("getOffCross");
      }
      console.log("soy id product", e);

      setProductSelected(e);
    }
    //console.log("soy animation", crossAnimation);

    //setToogle(!toogle);
  };
  return (
    <>
      <div
        className={`border-4 border-[${textGreyLight}] mt-[2vw] font-semibold p-[calc(8px+1.5vw)]`}
      >
        <div className="m-[1vw] flex flex-col gap-[calc(5px+0.5vw)] ">
          <span
            className={` text-[${textGreyLight}] text-[calc(8px+2vw)] px-[calc(4px+1vw)] `}
          >
            Products
          </span>
          <Component />
          <SearcherInput />
          <ul className="flex flex-col gap-[calc(5px+0.5vw)] ">
            {/* <li id="nombre" onClick={handleToogle} className="toogle">
            soy la lista
          </li> */}
            {products?.map((a) => {
              return (
                <li
                  key={a._id}
                  className={`text-[${textGreyLight}] text-[calc(8px+1.5vw)]   `}
                >
                  <div className={`bg-[#f2f5f7] px-[calc(6px+1vw)]`}>
                    <div
                      onClick={() => handleToogle(a)}
                      className="flex justify-between items-center cursor-pointer "
                    >
                      <div>{a.name}</div>
                      <button
                        //onClick={() => setShowSideBar()}
                        id={"-" + a._id}
                        className={`transition-transform duration-500  relative w-[calc(6px+3vw)] h-[calc(6px+3vw)]  ease-in-out rounded-full border-0 overflow-hidden
                      } `}
                      >
                        <span className=" rounded-md w-[calc(7px+2vw)] bg-[#788896] absolute h-[calc(2px+0.5vw)] sm:h-[4px] md:h-[5px] lg:h-[7px] xl:h-[8px] 2xl:h-[10px]  child rotate transition-transform duration-500"></span>
                        <span className=" rounded-md w-[calc(7px+2vw)] bg-[#788896]  absolute h-[calc(2px+0.5vw)]   sm:h-[4px] md:h-[5px] lg:h-[7px] xl:h-[8px] 2xl:h-[10px] child transition-transform duration-500"></span>
                      </button>
                    </div>
                  </div>

                  <div className={`duration-500  unableToogle `} id={a._id}>
                    <div
                      className={`border-4 border-[${textGreyLight}] mt-[calc(2px+1vw)] px-[calc(2px+1vw)]`}
                    >
                      <div>quantity: {a.quantity}</div>
                      <div className="mr-0 ml-auto w-min gap-2 flex">
                        <ModifyButtom product={productSelected} />
                        <Delete productId={productSelected} />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Home;
