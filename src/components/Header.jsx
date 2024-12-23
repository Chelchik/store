import React from 'react'
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className='w-full p-4 flex justify-center items-center border-b-2 border-gray-300 sticky top-0 z-50 bg-white'>
      <nav>
        <ul className='flex gap-4'>
          <li><NavLink to="/" className={({ isActive }) =>
            isActive ? "text-componyColor text-xl transition-all" :
              "text-gray-900 text-xl transition-all hover:text-componyColor"
          }>Home</NavLink></li>

          <li><NavLink to="contact" className={({ isActive }) =>
            isActive ? "text-componyColor text-xl transition-all" :
              "text-gray-900 text-xl transition-all hover:text-componyColor"
          }>Contact</NavLink></li>
          <li><NavLink to="profile" className={({ isActive }) =>
            isActive ? "text-componyColor text-xl transition-all" :
              "text-gray-900 text-xl transition-all hover:text-componyColor"
          }>Profile</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;