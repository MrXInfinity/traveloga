import {useReducer, useCallback} from 'react'
import { initialState, bookingReducer } from './BookingReducer'
import { useForm } from 'react-hook-form'

const useBookingState = () => {
    const [state, dispatch] = useReducer(bookingReducer, initialState)
    const form = useForm({
        defaultValues: {
            travellingFromLocation: "",
            regionsCategory: "",
            travellingFromRegion: "",
            travellingTo: "",
            dateOfLeave: "",
            dateOfReturn: "",
            withHotel: false,
            flightType: "",
            amount: ""
        }
    })

    const {setValue, setError, clearErrors} = form

    const flightTypeClick = (flightType) => {
        dispatch({
            type: "CHANGE_FLIGHTTYPE",
            payload: flightType
        })
        clearErrors(["flightType", "regionsCategory"])
        setValue("regionsCategory", "")
        setValue("travellingFromLocation", "")
        setValue("travellingFromRegion", "")
    }

    const regionsCategoryClick = (region) => {
        dispatch({
            type: "SET_LOCATIONFILTER",
            payload: region
        })
        clearErrors("regionsCategory")
        setValue("travellingFromLocation", "")
        setValue("travellingFromRegion", "")
    }

    const eachRegionClick = (eachRegion, location) => {
        if (eachRegion && location) {
            dispatch({
            type: "SET_EACHREGION",
            payload: {
                eachRegion,
                location
            }
        })
        }
        else {
            dispatch({type: "REMOVE_EACHREGION"})
            console.log("hays")
        }
        
        setValue("travellingFromRegion", eachRegion)
    }

    const withHotelClick = () => {
        dispatch({type: "HOTEL_TOGGLE"})
        setValue("withHotel", !state.withHotel)
    }

    const setDateClick = (label, value) => {
        const localValue = new Date(value)
        if (label === "Leave") {
            if (Math.floor((localValue.getTime()) / 100000) > Math.floor(((Date.now()) + 604800000) / 100000)) {
                setValue("dateOfReturn","")
                clearErrors(["dateOfLeave", "dateOfReturn", "dateOfLeave_selectcorrectdate", "date_selectnewdate"])
                dispatch({
                    type: "LEAVE_BUTTON_CLICK", 
                    payload: localValue
                })
                return
            } 
            setError("dateOfLeave_selectcorrectdate", {type: "Date", message: "Pick a date of leave that's more than a week of the current day."})
            return
        }
        if (label === "Return") {
            if (!state.date.Leave) {
                setError("date_selectnewdate", {type: "Date", message: "Select first the date of your leave."})
                return
            }
            if (Math.floor((localValue.getTime()) / 100000) > Math.floor((Date.now() + 691200000) / 100000) && localValue > state.date.Leave) {
                clearErrors(["dateOfLeave", "dateOfReturn", "dateOfReturn_selectcorrectdate", "date_selectnewdate"])
                dispatch({
                    type: "RETURN_BUTTON_CLICK",
                    payload: localValue
                })
                return
            }
            setError("dateOfReturn_selectcorrectdate", {type: "Date", message: "Pick a date of return that's more than a week of the current day and greater than the date of leave."}) 
            return
        }
        setError("dateChecker", {type: "Date", message: "There is an unexpected error..."})
    }

    const initialAmountSet = ({domestic: {travelIn, travelOut, hotelFee}, international}) => {
        const secondsADay =  1000* 60 * 60 * 24
        const numberOfDays = (state.date.Return - state.date.Leave) / secondsADay

        if (state.flightType === "domestic") {
            dispatch({
                type: "INITIAL_AMOUNT_SET",
                payload: state.withHotel ? (travelIn + travelOut) + (hotelFee*numberOfDays) : (travelIn + travelOut)
            })
            return
        }
        if (state.flightType === "international") {
            const {travelIn, travelOut, hotelFee} = international[state.travellingFromRegion.toLowerCase()]
            dispatch({
                type: "INITIAL_AMOUNT_SET",
                payload: state.withHotel ? (travelIn + travelOut) + (hotelFee*numberOfDays) : (travelIn + travelOut) 
            })
        }
    }

    const discountSet = useCallback((offers) => {
        if (state.flightType) {
            dispatch({
                type: "DISCOUNT_SET",
                payload: offers[state.flightType]
            })
            return
        } 
        dispatch({
            type: "DISCOUNT_REMOVE"
        })
    }, [state.flightType])

    const amountSet = () => {
        if (state.discount > 0) {
        dispatch({
            type: "FINAL_AMOUNT_SET",
            payload: Math.floor(state.initialAmount*(1 - state.discount/100))
        })
        setValue("amount", Math.floor(state.initialAmount*(1 - state.discount/100)))   
        return 
        }
        else {
            dispatch({
            type: "FINAL_AMOUNT_SET",
            payload: state.initialAmount
        })
        setValue("amount", state.initialAmount)
        }
    }
    const open = (title) => {
        setValue("travellingTo", title)
    }
    const close = () => {
        dispatch({type: "CLOSE"})
    }

    const value = {
        form,
        flightType: state.flightType,
        flightTypeClick,
        regionsCategory: state.regionsCategory,
        regionsCategoryClick,
        eachRegion: state.travellingFromRegion,
        eachRegionClick,
        withHotel: state.withHotel,
        withHotelClick,
        dateOfLeave: state.date.Leave,
        dateOfReturn: state.date.Return,
        setDateClick,
        initialAmount: state.initialAmount,
        initialAmountSet,
        discount: state.discount,
        discountSet,
        amount: state.amount,
        amountSet,
        open,
        close
    }

    return value
}

export default useBookingState