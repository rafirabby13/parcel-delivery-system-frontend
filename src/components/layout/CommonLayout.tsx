/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ReactNode } from "react"
import Navbar from "./Navbar"
import { Footer } from "./Footer"
import Navbar2 from "../shared/Navbar2"

interface IProps {
    children: ReactNode
}
const CommonLayout = ({children}: IProps) => {
  return (
    <div className='min-h-screen flex flex-col  '>
            {/* <Navbar/> */}
            <Navbar2/>
            <div className="mb-24"></div>
            <div className='grow-1'>{children}</div>
            <Footer />
        </div>
  )
}

export default CommonLayout
