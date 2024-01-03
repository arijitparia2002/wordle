import React from "react";

const Header = () => {
  return (
    <div className="w-full bg-white px-12 flex justify-between">
      <div className=" font-extrabold text-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 my-2 rounded-xl p-1 px-2 ">
        Wordle
      </div>
      <div className="flex items-center">
        {/* <div className="text-gray-500 text-sm mr-4">Sign in</div>
        <div className="text-gray-500 text-sm">Sign up</div> */}
      </div>
    </div>
  );
};

export default Header;
