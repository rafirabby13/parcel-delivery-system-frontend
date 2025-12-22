/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ReactNode } from "react"
import {  PublicFooter } from "../shared/layout/PublicFooter"
import PublicNavbar from "../shared/layout/PublicNavbar"
interface IProps {
    children: ReactNode
}
const CommonLayout = ({children}: IProps) => {
  return (
    <div className='min-h-screen flex flex-col  '>
            {/* <Navbar/> */}
            <PublicNavbar/>
            <div className="mb-24"></div>
            <div className='grow-1'>{children}</div>
            <PublicFooter />
        </div>
  )
}

export default CommonLayout
