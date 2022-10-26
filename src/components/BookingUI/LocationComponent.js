import React from 'react'
import { useFormContext } from "react-hook-form"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlane, faTag } from "@fortawesome/free-solid-svg-icons"

const LocationComponent = ({ flights, flightType, title, limitedOffers, regionsCategory, eachRegion, eachRegionClick}) => {
    const { register, formState: {errors}} = useFormContext()
    let localRegion
    let localFlight
    if (flightType && regionsCategory) {
        let flightFinder = flights[flightType].find(({ location }) => Object.hasOwn(location, regionsCategory))
        localRegion = flightFinder["region"]
        localFlight = flightFinder["location"][regionsCategory]
    }

    return (
        <div className="flex flex-col col-span-4 lg:col-span-4 h-fit">
            <h2 className="md:mb-1 md:text-lg">LOCATION</h2>
            <p className='text-xs md:text-sm mb-1'>Pick the location you’re coming from. </p>
            {errors.travellingFromLocation && <p className="text-red-600 text-xs">{errors.travellingFromLocation.message}</p>}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 mt-2">
                <div className="flex flex-col">
                    <label className="absolute z-10 text-xs md:text-sm pl-1 lg:pl-3 pt-1 uppercase">Travelling From:</label>
                    <select disabled={!regionsCategory} className={`${eachRegion ? `ring-amber-300`: ``} h-16 pt-4 lg:pl-2 text-lg md:text-xl truncate ring-black/[0.6] ring-1 rounded-lg`} {...register("travellingFromLocation", {onChange: (e) => eachRegionClick(localRegion, e.currentTarget.value), required: "Choose the location you're coming from"})} >
                        <option className="text-sm" value="">___</option>
                        {
                            localFlight && localFlight.map((eachLocation, index) => (
                                <option className="text-sm" key={index} value={eachLocation}>{eachLocation}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="flex flex-col text-xs h-16 ring-1 ring-black/[0.6] rounded-lg">
                    <h1 className="absolute z-10 text-xs md:text-sm pl-1 lg:pl-3 lpt-1 uppercase">Travelling To:</h1>
                    <div className="flex items-center justify-between pl-1 pr-6 h-16 ">
                        <h2 className="text-lg md:text-xl pt-4 lg:pl-2">{title}</h2>
                        {flightType && limitedOffers[flightType] > 0 && <FontAwesomeIcon icon={faTag} className="text-2xl lg:text-3xl text-[#2B8E9B]" />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LocationComponent