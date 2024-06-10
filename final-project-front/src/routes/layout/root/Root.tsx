import { Outlet } from "react-router-dom"
import Header from "../../../components/layoutElements/Header"
import Footer from "../../../components/layoutElements/Footer"

const Root = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <main className="flex-1">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default Root