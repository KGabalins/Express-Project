import { useState } from "react";

type PopupProps = {
  id: string;
  title: string;
  btnText: string;
  children: React.ReactNode;
  closingFunction?: Function;
};

const Popup = (props: PopupProps) => {
  const { id, title, children, btnText, closingFunction } = props;
  const [isActive, setIsActive] = useState(false);

  const toggleDisplay = () => {
    setIsActive(!isActive);
  };

  const handleClose = () => {
    toggleDisplay();
    if (closingFunction) closingFunction();
  };

  return (
    <>
      <div id={`displayBtnDiv-${id}`}>
        <button
          onClick={toggleDisplay}
          className="bg-zinc-700 sm:w-44 text-base text-white rounded-full py-1"
        >
          {btnText}
        </button>
      </div>
      <div
        id={`popup-${id}`}
        className={`fixed shadow-xl transition-all duration-500 px-5 py-3 w-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col bg-neutral-200 ${
          isActive ? " opacity-100 visible place-self-center top-1/2" : "opacity-0 invisible top-[40%]"
        }`}
      >
        <div className="self-end font-bold hover:text-gray-600 active:text-gray-800">
          <button onClick={handleClose}>X</button>
        </div>
        <h2 className="text-center font-bold text-2xl mb-5">{title}</h2>
        {children}
      </div>
    </>
  );
};

export default Popup;
