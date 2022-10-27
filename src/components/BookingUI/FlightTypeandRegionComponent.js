import React from "react"
import { useFormContext } from "react-hook-form"

const FlightypeAndRegionComponent = ({ flights, flightType, flightTypeClick, regionsCategory, regionsCategoryClick, bookingRef }) => {
    const { register, formState: {errors}} = useFormContext()
    
    return (
        <div className="flex flex-col col-span-6 lg:col-span-8 lg:order-first">
            <h2 className="md:mb-1 md:text-lg">TYPE OF FLIGHT AND REGION</h2>
            <p className='text-xs md:text-sm mb-1 break-words text-black/90'>Choose a flight type, (DOMESTIC/INTERNATIONAL), then pick which region your coming.</p>
            {errors.flightType && errors.regionsCategory ? <p className="text-red-600 text-xs">Fields (FlightType & Region Category) are required...</p>
            : errors.flightType ? <p className="text-red-600 text-xs">Field (FlightType) is required...</p> : errors.regionsCategory ? <p className="text-red-600 text-xs">Field (Regions Category) is required...</p>
            : ``}     
            <div className="grid grid-cols-2 gap-3 md:gap-4 mt-2">
                <div className="flex flex-col">
                    <label className='absolute z-10 text-xs md:text-sm pl-1 pt-1 lg:pl-3'>FLIGHT TYPE</label>
                    <select className={`${flightType ? `ring-amber-300`: `ring-black/[0.6]`} relative h-16 pt-4 g:pl-2 group-active:bg-white rounded-lg ring-1 shadow-md text-lg md:text-xl truncate`} {...register("flightType", {required: "Flight Type", onChange: (e) => flightTypeClick(e.currentTarget.value)})}>
                        <option className="text-sm" value="" >___</option>
                        <option className="text-sm" value="domestic">Domestic</option>
                        <option className="text-sm" value="international">International</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className='absolute z-10 text-xs md:text-sm pl-1 lg:pl-3 pt-1'>REGION</label>
                    <select disabled={!flightType} className={`${regionsCategory ? `ring-amber-300` : `ring-black/[0.6]`} relative h-16 pt-4 lg:pl-2 group-active:bg-white rounded-lg ring-1 shadow-md text-lg md:text-xl truncate`} {...register("regionsCategory", {required: "Region Category",onChange: (e)=>regionsCategoryClick(e.currentTarget.value)})}>
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