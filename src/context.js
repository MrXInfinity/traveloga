import axios from "axios";
import React, {useState, useEffect, useContext, createContext} from 'react'
const AppContext = createContext()

const AppProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [isFailed, setIsFailed] = useState(false)
    const [isSignInRequired, setIsSignInRequired] = useState(false)
    const [user, setUser] = useState(null)
    const [bookingUI, setBookingUI] = useState({
        id: "",
        open: false
    })
    console.log(user)
    const [destinationUI, setDestinationUI] = useState({
        id: "",
        open: false,
    })

    const userSignIn = (userInfo, token) => {
      setUser(userInfo)
      localStorage.setItem("authenticated", token);
      console.log(token)
    }

    const userSignOut = () => {
      setUser(null)
      localStorage.clear()
    }

    const destinationToggleUI = (id) => {
        if (id) {
            setDestinationUI({
            id: id, 
            open: !destinationUI.open})
            return
    }
        setDestinationUI({
            id: "", 
            open: !destinationUI.open
        })
    }

    const bookingToggleUI = (id) => {
        if (destinationUI.open) {
          setDestinationUI({
            ...destinationUI,
            open: false
          })
        }
        if (id) {
            setBookingUI({
            id: id, 
            open: !bookingUI.open})
            return
    }
        setBookingUI({
            id: "", 
            open: !bookingUI.open
        })
    }

    const value = {
      isLoading,
      setIsLoading,
      user, 
      setUser,
      userSignIn,
      userSignOut,
      bookingUI,
      destinationUI,
      destinationToggleUI,
      bookingToggleUI,
      isSuccessful,
      setIsSuccessful,
      isFailed,
      setIsFailed,
      isSignInRequired,
      setIsSignInRequired,
      bookingUI,
      setBookingUI
    }
    

  return (
    <AppContext.Provider {...{value}}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export default AppProvider