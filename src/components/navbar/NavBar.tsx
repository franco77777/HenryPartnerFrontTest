const NavBar = () => {
  return (
    <>
      <nav className="w-full  font-bold">
        <div className="text-start text-[#788896] text-[calc(10px+2vw)]">
          Seleccionar servicio
        </div>
        <div className="w-full bg-[#d8dee3] h-[calc(8px+0.5vw)] rounded">
          <div
            className="bg-[#1aae9e]  h-full rounded-sm w-[45%] "
            //style={{ width: "45%" }}
          ></div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
