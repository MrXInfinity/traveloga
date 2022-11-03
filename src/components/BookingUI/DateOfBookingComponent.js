import React from 'react'
import { useFormContext } from "react-hook-form"

const DateOfBookingComponent = ({dateOfLeave, dateOfReturn, setDateClick}) => {
    const { register, formState: {errors}} = useFormContext()

    return (
        <div className="flex flex-col col-span-6 md:col-span-4">
            <h2 className='md:text-lg md:mb-1'>DATE</h2>
            <p className="text-xs md:text-sm mb-1">Select the date of your return and leave.</p>
            {errors.dateOfLeave && errors.dateOfReturn ? <p className="text-red-600 text-xs">Return & Leave dates must be set.</p>
            : errors.dateOfReturn ? <p className="text-red-600 text-xs">Return dates must be set.</p> : errors.dateOfLeave ? <p className="text-red-600 text-xs">Leave dates must be set.</p>
            : ``}
            {errors.date_selectnewdate && <p className="text-red-600 text-xs">{errors.date_selectnewdate.message}</p>}
            {errors.dateOfLeave_selectcorrectdate && <p className="text-red-600 text-xs">{errors.dateOfLeave_selectcorrectdate.message}</p>}
            {errors.dateOfReturn_selectcorrectdate && <p className="text-red-600 text-xs">{errors.dateOfReturn_selectcorrectdate.message}</p>}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4 mt-2">
            {
                ["Leave", "Return"].map((label, index) => {
                    return (
                        <div className={`flex flex-col  `} key={index}>
                            <h1 className=" absolute z-10 text-xs md:text-sm pl-1 lg:pl-3 pt-1 uppercase">{label}</h1>
                            <input className={`h-16 text-lg md:text-xl ring-1 rounded-lg px-1 pt-4 lg:pl-3 ${dateOfLeave ? `first:ring-amber-300` : `first:ring-black/[0.6]`} ${dateOfReturn ? `last:ring-amber-300` : `last:ring-black/[0.6]`}`} type="date" {...register(`dateOf${label}`, {required: label, onChange: (e)=> setDateClick(label, e.currentTarget.value)})}/>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default DateOfBookingComponent

