import React from "react"
import { useFormContext } from "react-hook-form"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from "@fortawesome/free-solid-svg-icons"

const FlightypeAndRegionComponent = ({ flights, flightType, flightTypeClick, regionsCategory, regionsCategoryClick, bookingRef }) => {
    const { register, formState: {errors}} = useFormContext()
    
    return (
        <div className="flex flex-col col-span-6 lg:col-span-8 lg:order-first">
            <div className="flex items-center mb-1 text-lg">
                <h2>TYPE OF FLIGHT AND REGION</h2>
                <FontAwesomeIcon icon={faGlobe} className="text-[#2B8E9B] ml-2" />
            </div>
            <p className='text-sm mb-1 break-words text-black/90'>Choose a flight type, (DOMESTIC/INTERNATIONAL), and pick which region your coming.</p>
            {errors.flightType && errors.regionsCategory ? <p className="text-red-600 text-xs">Fields (FlightType & Region Category) are required...</p>
            : errors.flightType ? <p className="text-red-600 text-xs">Field (FlightType) is required...</p> : errors.regionsCategory ? <p className="text-red-600 text-xs">Field (Regions Category) is required...</p>
            : ``}     
            <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col">
                    <label className='absolute z-10 text-xs pl-1 pt-1 lg:pl-3'>FLIGHT TYPE</label>
                    <select className={`${flightType ? `ring-amber-300`: `ring-black/[0.6]`} relative h-20 lg:h-16 lg:pt-4 lg:pl-2 group-active:bg-white rounded-lg ring-1 shadow-md text-xl`} {...register("flightType", {required: "Flight Type", onChange: (e) => flightTypeClick(e.currentTarget.value)})}>
                        <option className="text-sm" value="" >___</option>
                        <option className="text-sm" value="domestic">Domestic</option>
                        <option className="text-sm" value="international">International</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className='absolute z-10 text-xs pl-1 lg:pl-3 pt-1'>REGION</label>
                    <select className={`${regionsCategory ? `ring-amber-300` : `ring-black/[0.6]`}  relative h-20 lg:h-16 lg:pt-4 lg:pl-2 group-active:bg-white rounded-lg ring-1 shadow-md text-xl`} {...register("regionsCategory", {required: "Region Category",onChange: (e)=>regionsCategoryClick(e.currentTarget.value)})}>
                        <option className="text-sm" value="" >___</option>
                        {flightType && flights[flightType].map(({ region, location }, index) => (
                        <optgroup className="text-base" key={index} label={region}>
                        {Object.keys(location).map((eachProvince, index) =>
                        <option className="text-sm" key={index} value={eachProvince}>{eachProvince}</option>
                        )}
                        </optgroup>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}


export default FlightypeAndRegionComponent