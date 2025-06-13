import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const SearchBox = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const location = useLocation();
  const navigate = useNavigate();

  function handleInputChange(e) {
    const value = e.target.value;
    setSearchInput(value);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput.trim()) {
        navigate(`/blog/search?q=${searchInput}`);
      } else if (
        location.pathname === "/blog/search" && query
      ) {
        navigate("/", { replace: true });
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInput, navigate, location.pathname,query]);

  return (
    <div className="p-2 rounded-lg flex items-center gap-2 border border-border w-[60%] lg:w-[80%]">
      <Input
        value={searchInput}
        onChange={handleInputChange}
        name="search"
        className=" outline-none border-none text-muted-foreground text-base placeholder:text-muted-foreground/30"
        placeholder="Search blog here"
      />
      <SearchIcon className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-600 transition ease-in-out duration-300" />
    </div>
  );
};

export default SearchBox;
