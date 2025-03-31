import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CategoryList from "./pages/CategoryList";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import FilterBlogs from "./components/FilterBlogs";
import SearchResults from "./components/SearchResults";
import UserDetails from "./pages/User";
import CommentPage from "./pages/CommentPage";
import AuthRouteProtection from "./protectRoute/AuthRouteProtection";
import ForAdminOnly from "./protectRoute/ForAdminOnly";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* public routes */}
          <Route index element={<Homepage />} />
          <Route path="/blog/:categoryName/:slug" element={<BlogDetails />} />
          <Route
            path="/blog/category/:categoryId/:categoryName"
            element={<FilterBlogs />}
          />
          <Route path="/blog/search" element={<SearchResults />} />

          {/* protected routes for loggedin user */}
          <Route element={<AuthRouteProtection />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/comments" element={<CommentPage />} />
          </Route>

          {/* protected routes for admin only */}
          <Route element={<ForAdminOnly />}>
            <Route path="/category" element={<CategoryList />} />
            <Route path="/user-detail" element={<UserDetails />} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
