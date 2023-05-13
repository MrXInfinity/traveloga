import { faBars, faCompass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useRef } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useGlobalContext } from '../context.js';
import Footer from './Footer/Footer';
import TransitionComponent from './TransitionWrapper';

const Nav = () => {
  const { user } = useGlobalContext();
  const authenticationToken = localStorage.getItem('authenticated');
  const navRef = useRef(null);

  const navItems = [
    ['/', 'Home'],
    ['/offers', 'Offers'],
    ['/destinations', 'Destinations'],
    ['/about-us', 'About Us'],
  ];

  const scrollUp = () => {
    navRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col" ref={navRef}>
      <div className="flex w-full bg-black/40 px-5 pt-5 pb-6 lg:px-12 lg:py-6 justify-between items-center fixed top-0 z-10">
        <div className="flex gap-2 items-center ">
          <FontAwesomeIcon
            className="text-white mt-2 md:mt-0 text-3xl "
            icon={faCompass}
          />
          <div className="flex flex-col w-40 md:w-4o lg:w-fit">
            <h1 className="text-lg text-white lg:text-xl font-Rubik">
              TRAVELOGA
            </h1>
            <h1 className="text-xs whitespace-nowrap text-white ">
              Experiencing Philippines
            </h1>
          </div>
        </div>

        <div className="flex">
          <Menu as="div" className=" md:hidden">
            {({ open }) => (
              <>
                <div>
                  <Menu.Button className="flex items-center justify-center w-14 h-14">
                    <FontAwesomeIcon
                      className="text-3xl transition-all duration-300 ease-in-out text-amber-200"
                      icon={open ? faXmark : faBars}
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-150"
                  enterFrom="transform opacity-0 -translate-y-1"
                  enterTo="transform opacity-100 translate-y-0"
                  leave="transition ease-in duration-150 "
                  leaveFrom="transform opacity-100 translate-y-0"
                  leaveTo="transform opacity-0 -translate-y-1">
                  <Menu.Items className="flex absolute items-center right-0 mt-6">
                    <div className="  flex flex-col justify-around items-center bg-white text-lg ">
                      {navItems.map(([link, title], index) => (
                        <Menu.Item onClick={() => scrollUp()} key={index}>
                          <NavLink
                            to={link}
                            className="w-full py-4 px-6 border-transparent md:text-white"
                            style={({ isActive }) => {
                              return { color: isActive ? '#fbbf24' : '' };
                            }}>
                            {title}
                          </NavLink>
                        </Menu.Item>
                      ))}
                      <Menu.Item onClick={() => scrollUp()}>
                        <NavLink
                          to={
                            authenticationToken && user
                              ? '/personal-account'
                              : '/login'
                          }
                          className=" hover:text-amber-200 py-4 px-6"
                          style={({ isActive }) => {
                            return { color: isActive ? '#fbbf24' : '' };
                          }}>
                          {user && authenticationToken
                            ? `${user.firstname}'s Bookings`
                            : `Login / Signup`}
                        </NavLink>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>

          <div className="hidden mx-0 w-fit lg:w-1/2 h-fit md:flex flex-row gap-2 justify-between items-center right-0 text-base">
            {navItems.map(([link, title], index) => (
              <NavLink
                to={link}
                key={index}
                className="w-fit text-white hover:border-b-4 hover:border-amber-300 text-center transition-all ease-in-out"
                style={({ isActive }) => {
                  return {
                    color: isActive ? '#fde68a' : '',
                    borderBottom: isActive ? `4px solid #fde68a` : ``,
                  };
                }}
                onClick={() => scrollUp()}>
                {title}
              </NavLink>
            ))}
            <NavLink
              to={authenticationToken && user ? '/personal-account' : '/login'}
              className=" bg-amber-200 hover:bg-amber-300 py-2 px-2 lg:px-4 lg:py-3 hover:text-white text-center text-sm rounded-3xl transition-colors ease-in-out "
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive && '#fcd34d',
                  color: isActive && 'white',
                };
              }}
              onClick={() => scrollUp()}>
              {user && authenticationToken
                ? `${user.firstname}'s Bookings`
                : `LOGIN / SIGNUP`}
            </NavLink>
          </div>
        </div>
      </div>
      <Outlet />
      <Footer />
      <TransitionComponent />
    </div>
  );
};

export default Nav;
