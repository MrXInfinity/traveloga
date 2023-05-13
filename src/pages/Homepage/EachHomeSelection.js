import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useGlobalContext } from '../../context';

const Selection = ({ info, leftPosition }) => {
  const { setDestinationUI, setTransitionOpen } = useGlobalContext();
  const destinationToggleUI = (id) => {
    setDestinationUI({
      id: id,
      open: true,
    });
    setTransitionOpen(true);
  };

  if (info.length > 0) {
    return (
      <>
        <div className="flex overflow-auto overscroll-none">
          <div
            className="relative flex w-fit gap-10 pb-2 transition-all delay-150 duration-500 ease-in-out lg:snap-none lg:px-2"
            style={{ left: `${-leftPosition * 35}rem` }}>
            {info.map(({ title, image, location, _id }) => (
              <div
                className="button_transition flex w-[22rem] flex-col shadow-lg transition-all last:mr-6 hover:shadow-md hover:shadow-black sm:w-[400px] md:w-[522px] md:last:mr-0 "
                key={_id}
                onClick={() => destinationToggleUI(_id)}>
                <img
                  src={image}
                  alt={title}
                  className="aspect-video h-full object-cover object-center  "
                />
                <div className="flex items-center justify-between py-3 px-4">
                  <h1 className=" md:text-lg lg:text-xl ">{title}</h1>
                  <div className="flex items-center gap-2 text-sm text-black/70 md:text-base lg:text-black/70">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <h1>{location}</h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="flex h-80 w-[22rem] animate-pulse flex-col overflow-hidden shadow-lg sm:w-[400px] md:w-[522px] ">
        <div className=" aspect-video h-[90%] bg-slate-200" />
        <div className="flex h-[15%] w-full items-center justify-between gap-20 p-4">
          <div className="h-full w-2/3 bg-slate-200" />
          <div className="flex h-full w-1/3 gap-2">
            <div className="h-full w-1/4 bg-slate-200" />
            <div className="h-full w-3/4 bg-slate-200 " />
          </div>
        </div>
      </div>
    );
  }
};

export default Selection;
