import React from 'react'
import { Outlet } from 'react-router-dom'

export const Header = () => {
  return (
    <>
      <header className='app-header'>
          <h1>Բարի գալուստ <span>քվեարկությունների հարթակ</span></h1>
      </header>
      <Outlet/>
    </>
  )
}
