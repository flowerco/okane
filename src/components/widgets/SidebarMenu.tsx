import { useState } from "react"
import { useAppSelector } from "../../redux/hooks"

export const SidebarMenu = () => {

  const screenState = useAppSelector(state => state.screen);

  return (
    <>
      <div className={`h-[100vh] w-[50vw] absolute bg-blue-700 mt-8 ${screenState.sidebarOpen ? 'inline' : 'hidden'}`}>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </>
  )

}