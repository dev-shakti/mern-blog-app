import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "./components/layout/MainLayout"
import Homepage from "./pages/Homepage"


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
           <Route index element={<Homepage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
