import React, {Fragment, useState, useLayoutEffect, useRef} from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Transition, Menu } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faBars, faXmark } from "@fortawesome/free-solid-svg-icons"
import TransitionComponent from './TransitionWrapper'
import Footer from './Footer/Footer'
import { useGlobalContext } from '../context'

const Nav = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const {user} = useGlobalContext()
  const authenticationToken = localStorage.getItem("authenticated")
  const navRef = useRef(null)

  const scrollUp = () => {
    navRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  const navLayoutChanger = () => {
    if (window.innerWidth < 768) return setShowMobileMenu(true);
    setShowMobileMenu(false)
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', navLayoutChanger);
    navLayoutChanger()
    return () => window.removeEventListener('resize', navLayoutChanger);
  }, []);

  return (
    <div className='flex flex-col' ref={navRef}>
      <div className="flex w-full bg-black/40 px-5 py-6 lg:px-12 lg:py-6 justify-between items-center fixed top-0 z-10">
        <div className="flex md:items-center">
          <FontAwesomeIcon className='text-white mt-2 md:mt-0 text-2xl mr-4 lg:mr-2' icon={faCompass} />
          <div className=" flex-col w-40 md:w-4o lg:w-fit">
            <h1 className=' text-xl sm:text-lg md:text-xl text-white -mb-1'>TRAVELOGA</h1>
            <h1 className=' text-xs text-white '>Experience Philippines, Love Philippines</h1>
          </div>
        </div>

        {showMobileMenu ? (
        <Menu as="div" className="justify-around relative inline-block">
          {({open})=> (
            <>
              <div>
                <Menu.Button className="flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-200">
                  <FontAwesomeIcon className="text-3xl transition-all duration-300 ease-in-out" icon={open ? faXmark : faBars} />
                </Menu.Button>
              </div>
              <Transition as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className='flex absolute w-fit mx-auto h-fit items-center right-0 origin-top-right'>
                    <div className="  flex flex-col justify-around items-center bg-white text-lg w-full " >
                    {[["/", "Home"], ["/offers", "Offers"], ["/destinations", "Destinations"], ["/about-us", "About Us"]].map(([link, title], index) => (
                      <Menu.Item onClick={()=>scrollUp()} key={index}>
                        <NavLink to={link} className="w-full md:text-white py-4 px-6 border-transparent text-center" style={({ isActive }) => {return {color: isActive ? '#fde68a':''}}}>{title}</NavLink>
                      </Menu.Item>
                    ))}
                    <Menu.Item onClick={()=>scrollUp()}>
                      <NavLink to={authenticationToken && user ? "/personal-account" : "/login"} className='  py-2 px-2 lg:px-4 lg:py-3 hover:text-amber-200 text-center text-sm rounded-3xl transition-colors ease-in-out' style={({ isActive }) => {return {color: isActive ? '#fde68a':''}}}>{user && authenticationToken ? `${user.firstname}'s Bookings`: `LOGIN / SIGNUP`}</NavLink>
                    </Menu.Item>
                    </div>
                  </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
        ): (
        <div className=" mx-0 w-fit lg:w-1/2 h-fit flex flex-row gap-2 justify-between items-center right-0 text-base">
        {[["/", "Home"], ["/offers", "Offers"], ["/destinations", "Destinations"], ["/about-us", "About Us"]].map(([link, title], index) => (
          <NavLink to={link} key={index} className="w-fit text-white hover:border-b-4 hover:border-amber-200 text-center transition-all ease-in-out" style={({ isActive }) => {return {color: isActive ? '#fde68a':'', borderBottom: isActive ? `4px solid #fde68a`: ``}}} onClick={()=>scrollUp()}>{title}</NavLink>
        ))}
          <NavLink to={authenticationToken && user ? "/personal-account" : "/login"} className=' bg-amber-200 hover:bg-amber-300 py-2 px-2 lg:px-4 lg:py-3 hover:text-white text-center text-sm rounded-3xl transition-colors ease-in-out ' style={({ isActive }) => {return {backgroundColor: isActive && '#fcd34d', color: isActive && "white"}}} onClick={()=>scrollUp()}>{user && authenticationToken ? `${user.firstname}'s Bookings`: `LOGIN / SIGNUP`}</NavLink>
        </div>
        )}
        
      </div>
    <Outlet />
    <Footer />
    <TransitionComponent />
    </div>
  )
}

export default Nav

/*
<div className="flex md:flex-row flex-col md:w-fit lg:w-1/2 justify-around">
          <div className={`${mobileMenu} flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-200`} onClick={() => openMenu()}>
            <FontAwesomeIcon className="text-3xl transition-all duration-300 ease-in-out" icon={buttonIcon} />
          </div>
          
          <div className='flex md:w-full items-center'>
            <div className={` ${navPosition} w-[90%] mx-auto md:mx-0 sm:w-[94%] md:w-full h-fit flex flex-col md:flex-row md:gap-2 justify-around md:justify-between items-center bg-white md:bg-transparent right-0 top-24 md:top-0 text-lg md:text-base transition-all ease-out duration-500 md:transition-none transform origin-top-right inset-x-0`} style={{scale: dropdown === "block" ? '1' : '0' }}>
              {[
                ["/", "Home"], ["/offers", "Offers"], ["/destinations", "Destinations"], ["/about-us", "About Us"]
              ].map(([link, title], index) => (
                <NavLink to={link} key={index} className="w-full md:w-fit md:text-white py-4 md:py-0 hover:border-b-4 border-transparent md:border-amber-200 text-center transition-all ease-in-out" style={({ isActive }) => {return {color: isActive ? '#fde68a':'', borderBottom: isActive && webLinkDesign ? `4px solid #fde68a`: ``}}} onClick={()=>scrollUp()}>{title}</NavLink>
              ))}
              <NavLink to={authenticationToken && user ? "/personal-account" : "/login"} className=' md:bg-amber-200 md:hover:bg-amber-300 py-4 md:py-2 md:px-2 lg:px-4 lg:py-3 hover:text-white text-center md:text-sm rounded-3xl transition-colors ease-in-out' style={({ isActive }) => {return {color: isActive && !webLinkDesign ? '#fde68a':''}}} onClick={()=>scrollUp()}>{user && authenticationToken ? `${user.firstname}'s Bookings`: `LOGIN / SIGNUP`}</NavLink>
            </div>
          </div>
        </div>
*/