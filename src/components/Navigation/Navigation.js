import React, {useEffect} from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass } from "@fortawesome/free-solid-svg-icons"
import NavigationLogic from './NavigationLogic'
import Footer from '../Footer/Footer'
import BookingUI from '../BookingUI/BookingUI'
import EachDestinationUI from '../EachDestinationUI'
import LoadingComponent from '../LoadingComponent'
import { SuccessfulComponent, FailedComponent } from '../ResultComponent'
import { useGlobalContext } from '../../context'

const Nav = () => {
  const {dropdown, mobileMenu, buttonIcon, navPosition, webLinkDesign, openMenu, showMenu, ref, scrollUp} = NavigationLogic()
  const {user} = useGlobalContext()
  const authenticationToken = localStorage.getItem("authenticated")

  useEffect(() => {
    showMenu();
  }, []);

  return (
    <div className='flex flex-col' ref={ref}>
      <div className="flex w-full bg-black/40 px-6 pb-8 pt-10 lg:px-12 lg:py-8 xl:py-8 xl:px-20 justify-between fixed top-0 z-10">
        <div className="flex items-center">
          <FontAwesomeIcon className='text-white text-5xl md:text-6xl lg:text-5xl mr-2' icon={faCompass} />
          <div className=" flex-col w-40 md:w-fit">
            <h1 className=' text-2xl md:text-3xl lg:text-xl text-white -mb-1'>TRAVELOGA</h1>
            <h1 className=' text-sm md:text-base lg:text-sm text-white '>Experience Philippines, Love Philippines</h1>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col lg:w-1/2 justify-around">
          <div className={`${mobileMenu} flex items-center justify-center w-16 h-14 rounded-2xl bg-amber-200`} onClick={() => openMenu()}>
            <FontAwesomeIcon className="text-3xl transition-all duration-300 ease-in-out" icon={buttonIcon} />
          </div>
          
          <div className='flex lg:w-full items-center'>
            <div className={` ${navPosition} w-[90%] mx-auto lg:mx-0 md:w-[94%] lg:w-full h-fit flex flex-col lg:flex-row justify-around lg:justify-between items-center bg-white lg:bg-transparent right-0 top-24 lg:top-0 text-xl lg:text-base xl:text-xl transition transform origin-top-right inset-x-0`} style={{ transition: 'all 0.5s ease-out', scale: dropdown === "block" ? '1' : '0' }}>
              {[
                ["/", "Home"], ["/offers", "Offers"], ["/destinations", "Destinations"], ["/about-us", "About Us"]
              ].map(([link, title], index) => (
                <NavLink to={link} key={index} className="lg:text-white py-4 lg:py-0 hover:border-b-4 border-transparent lg:border-amber-200 text-center transition-all duration-150 ease-in-out" style={({ isActive }) => {return {color: isActive ? '#fde68a':'', borderBottom: isActive && webLinkDesign ? `4px solid #fde68a`: ``}}} onClick={()=>scrollUp()}>{title}</NavLink>
              ))}
              <NavLink to={authenticationToken && user ? "/personal-account" : "/login"} className=' lg:bg-amber-200 lg:hover:bg-amber-300 py-4 lg:px-4 lg:py-3 hover:text-white text-center rounded-3xl transition-all  duration-300 ease-in-out' style={({ isActive }) => {return {color: isActive && !webLinkDesign ? '#fde68a':''}}} onClick={()=>scrollUp()}>{user && authenticationToken ? `${user.firstname}'s Bookings`: `LOGIN / SIGNUP`}</NavLink>
            </div>
          </div>
        </div>
        
        
      </div>
    
    <BookingUI />
    <EachDestinationUI />
    <LoadingComponent />
    <SuccessfulComponent />
    <FailedComponent />
    <Outlet />
    <Footer />
    
    </div>
  )
}

export default Nav