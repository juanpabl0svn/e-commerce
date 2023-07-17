import React from "react";

const Loading = () => {
  return (
    <div className="bg-black w-full h-screen">
      <div className=" fixed top-1/2 left-1/2 h-40 w-60 bg-[#f2f2f2] p-[10px] rounded-[4px] animate-pulse animate-infinite animate-duration-[1500ms] animate-ease-in animate-alternate-reverse"></div>
    </div>
  );
};

export default Loading;
