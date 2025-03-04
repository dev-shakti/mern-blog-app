import React from "react";
import { Button } from "./ui/button";
import SearchBox from "./SearchBox";
import { LogInIcon, LogOutIcon, Settings2, User2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getEnv from "@/helpers/getEnv";
import showToast from "@/helpers/showToast";
import { logoutUser } from "@/redux/authSlice";

const Navbar = ({ children }) => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  
  async function handleUserLogout() {
    //api call
    try {
      const response = await fetch(`${getEnv("VITE_BASE_URL")}/auth/logout`, {
        method: "GET",
        headers: {
          credentials: true,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        showToast("error", data.message);
        return;
      }

      dispatch(logoutUser());
      navigate("/");
      showToast("success", data.message);
    } catch (error) {
      console.error("Registration error:", error.message);
      showToast("error", error.message);
    }
  }

  return (
    <nav className="p-4 flex justify-between items-center min-h-14 border-b bg-white">
      {children}
      <SearchBox />
      {!isLoggedIn ? (
        <Link to="/login">
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 px-4 py-2 cursor-pointer">
            <LogInIcon className="w-6 h-6" />
            Sign in
          </Button>
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User2Icon />
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings2 />
              <Link to="">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleUserLogout}>
              <LogOutIcon />
              <Link to="/">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  );
};

export default Navbar;
