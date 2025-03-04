import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "./components/layout/MainLayout"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
           <Route index element={<Homepage/>}/>
           <Route path="/profile" element={<Profile/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
