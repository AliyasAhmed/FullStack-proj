import React from "react";

function Header() {
  return (
    <header className="flex flex-wrap justify-between items-center bg-white p-4 shadow-md">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search your course"
        className="border rounded-lg px-4 py-2 w-full md:w-1/3 mb-4 md:mb-0"
      />

      {/* Icons and User Info */}
      <div className="flex flex-wrap items-center gap-4 md:gap-6">
        {/* Help Icon */}
        <div className="text-gray-500 cursor-pointer">
          <img src="help.svg" alt="Help" className="w-6 h-6" />
        </div>

        {/* Notification Icon */}
        <div className="text-gray-500 cursor-pointer">
          <img src="notify.svg" alt="Notify" className="w-6 h-6" />
        </div>

        {/* Switch Icon */}
        <div className="text-gray-500 cursor-pointer">
          <img src="sw.svg" alt="Switch" className="w-6 h-6" />
        </div>

        {/* Bell Icon */}
        <div className="text-gray-500 cursor-pointer">
          <img src="bell.svg" alt="Notifications" className="w-6 h-6" />
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="https://img.freepik.com/free-photo/portrait-business-woman-with-enthusiastic-face-expression-smiling-looking-confident-standing-s_1258-88087.jpg"
            alt="User"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="hidden md:inline font-medium">Adeline H. Dancy</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
