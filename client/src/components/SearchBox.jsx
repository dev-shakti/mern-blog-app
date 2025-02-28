import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
const SearchBox = () => {
  return (
    <div className="p-2 rounded-lg flex items-center gap-2 border border-gray-300 max-w-[600px] w-[80%]">
      <Input
        className="p-2 outline-none border-none text-gray-600 text-base placeholder:text-gray-400"
        placeholder="Search blog here"
      />
      <SearchIcon className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-600 transition ease-in-out duration-300" />
    </div>
  );
};

export default SearchBox;
