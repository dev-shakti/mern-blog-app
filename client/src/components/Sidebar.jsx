import { Calendar, Home, Inbox, MessageSquare, User2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import getEnv from "@/helpers/getEnv";
import { useSelector } from "react-redux";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Categories",
    url: "/category",
    icon: Inbox,
  },
  {
    title: "Blogs",
    url: "/blogs",
    icon: Calendar,
  },
  {
    title: "Comments",
    url: "/comments",
    icon: MessageSquare,
  },
  {
    title: "Users",
    url: "/user-detail",
    icon: User2,
  },
];
const AppSidebar = () => {
  const { data: categoryData } = useFetch(
    `${getEnv("VITE_BASE_URL")}/category/get`,{
      method: "GET",
      credentials: "include", 
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

 const {user,isLoggedIn}=useSelector((state) =>state.auth);

   // Define menu items based on user role
   const filteredItems = items.filter((item) => {
    if (!isLoggedIn) {
      return item.title === "Home"; // ✅ Show only "Home" if not logged in
    } 
    if (user?.role === "admin") {
      return ["Home", "Users", "Categories","Blogs"].includes(item.title);
    }
    return ["Home", "Blogs", "Comments"].includes(item.title);
  });

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-semibold mb-6">Bytes<span className="text-violet-500">Blog </span></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="text-muted-foreground">
                      <item.icon />
                      <span >{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-foreground text-lg">Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categoryData &&
              categoryData.categories &&
              categoryData.categories.length > 0
                ? categoryData.categories.map((cat) => (
                    <SidebarMenuItem key={cat?._id}>
                      <SidebarMenuButton asChild>
                        <Link to={`/blog/category/${cat?._id}/${cat?.name}`} className="text-muted-foreground">
                          <span>{cat?.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                : null}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
