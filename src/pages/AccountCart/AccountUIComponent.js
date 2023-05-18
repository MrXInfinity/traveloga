import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useGlobalContext } from '../../context';

const AccountUIComponent = ({ accountCartRef }) => {
  const { user, userSignOut } = useGlobalContext();

  return (
    <div
      className="mx-auto mt-28 grid h-fit w-full max-w-md grid-flow-row grid-cols-5 items-center justify-center gap-3 bg-[#423F3F] p-4 text-center text-sm sm:w-fit md:ml-4 md:mb-4 md:flex md:gap-6 md:text-base"
      ref={accountCartRef}>
      <h1 className="col-span-2 break-words text-white">
        {user ? `${user.firstname}, ${user.lastname}` : `username`}
      </h1>
      <h1 className="col-span-2 break-all text-justify text-white">
        {user ? user.email : `email`}
      </h1>
      <button
        className="flex h-full flex-col items-center justify-center bg-amber-200 py-4 transition duration-300 ease-in-out hover:bg-amber-300 md:p-2 md:px-4"
        onClick={() => userSignOut()}>
        <FontAwesomeIcon className="text-2xl" icon={faPowerOff} />
      </button>
    </div>
  );
};

export default AccountUIComponent;
