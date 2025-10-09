import React, { useState } from "react";
const LuckyButton: React.FC = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  return clicked ? (
    <div className="mt-4 flex flex-col items-center justify-center fade-up [&>p]:font-light [&>p]:text-lg [&>p]:text-center">
      <p>Nothing happened. You just clicked a button</p>
      <p>Your curiosity is admirable</p>
      <p>Come back tomorrow, Maybe it will do something</p>
    </div>
  ) : (
    <button onClick={() => setClicked(true)} className="mt-4 text-black dark:text-white cursor-pointer border-black dark:border-white border-1 hover:border-2 transition-all duration-100 font-bold py-2 px-4 rounded">Don't press this</button>
  );
};

export default LuckyButton;
