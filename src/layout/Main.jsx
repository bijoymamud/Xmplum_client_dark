import { Outlet } from 'react-router-dom'
import Navbar from '../page/Shared/Navbar'
import Footer from '../page/Shared/Footer'

const Main = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Main
