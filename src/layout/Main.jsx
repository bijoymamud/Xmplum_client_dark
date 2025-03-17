import { Outlet } from 'react-router-dom'
import Navbar from '../page/Shared/Navbar'

const Main = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Main
