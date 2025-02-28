import React from "react";
import { Button } from "./ui/button";
import SearchBox from "./SearchBox";
import { LogInIcon } from "lucide-react";

const Navbar = ({ children }) => {
  return (
    <nav className="p-4 flex justify-between items-center min-h-14 border-b bg-white">
      {children}
      <SearchBox />

      <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 px-4 py-2 cursor-pointer">
        <LogInIcon className="w-6 h-6" />
        Sign in
      </Button>
    </nav>
  );
};

export default Navbar;
