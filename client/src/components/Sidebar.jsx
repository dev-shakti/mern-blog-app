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
    url: "#",
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


  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categoryData &&
              categoryData.categories &&
              categoryData.categories.length > 0
                ? categoryData.categories.map((cat) => (
                    <SidebarMenuItem key={cat?._id}>
                      <SidebarMenuButton asChild>
                        <Link to={`/blog/category/${cat?._id}/${cat?.name}`}>
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
