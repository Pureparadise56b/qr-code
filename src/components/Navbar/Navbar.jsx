import React from 'react'
import { RiMenuFoldLine } from 'react-icons/ri'
import { RxCross2 } from 'react-icons/rx'
import gsap from 'gsap'

function Navbar() {
  const lists = ['Home', 'Services', 'About Us', 'Contact Us']
  function openPanel() {
    const panel = document.getElementById('panel')
    gsap.to(panel, {
      right: 0,
      duration: 0.7,
      ease: 'power3.out',
    })
    const overlay = document.getElementById('overlay')
    overlay.classList.remove('hidden')
  }

  function closePanel() {
    const panel = document.getElementById('panel')
    gsap.to(panel, {
      right: '-50%',
      duration: 0.7,
      ease: 'power3.out',
    })
    overlay.classList.add('hidden')
  }

  return (
    <div className="w-full sm:py-1 py-10 sm:px-16 px-7 bg-zinc-800 text-white flex items-center justify-between border-b-[1px] border-gray-500 fixed z-50 font-['Gilroy']">
      <h1 className="text-3xl font-bold text-teal-500 tracking-wide">
        PlayLand
      </h1>
      <div className="h-16 items-end gap-9 font-['Gilroy'] font-light hidden sm:flex">
        {lists.map((list, index) => (
          <a
            key={index}
            href="#"
            className="border-b-[1px] hover:text-teal-500 hover:border-teal-700 hover:scale-95 transition-all duration-200 ease-in"
          >
            {list}
          </a>
        ))}
      </div>
      <div
        id="overlay"
        className="absolute z-10 w-full h-screen backdrop-blur top-0 left-0 hidden"
      ></div>
      <div
        id="panel"
        className="absolute z-50 min-h-screen w-1/2 bg-slate-50 top-0 right-[-50%] shadow-lg"
      >
        <RxCross2
          className="text-zinc-900 text-3xl m-3 mb-10"
          onClick={closePanel}
        />

        <div className="flex flex-col gap-10 justify-center items-center">
          {lists.map((list, index) => (
            <a
              key={index}
              href="#"
              className="w-full border-b-[1px] text-zinc-900 text-xl font-normal hover:text-teal-500 hover:border-teal-700 transition-all duration-200 ease-in pl-2"
            >
              {list}
            </a>
          ))}
        </div>
      </div>
      <RiMenuFoldLine
        className="sm:hidden flex text-3xl text-teal-200 cursor-pointer"
        onClick={openPanel}
      />
    </div>
  )
}

export default Navbar
