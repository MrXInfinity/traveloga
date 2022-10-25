import React, {useState, useEffect, useContext, createContext} from 'react'
const AppContext = createContext()

const AppProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [isFailed, setIsFailed] = useState(false)
    const [isSignInRequired, setIsSignInRequired] = useState(false)
    const [isAccountEditOpen,  setIsAccountEditOpen] = useState(false)
    const [transitionOpen, setTransitionOpen] = useState(false)
    const [user, setUser] = useState(null)
    
    const [bookingUI, setBookingUI] = useState({
        id: "",
        open: false
    })

    const [destinationUI, setDestinationUI] = useState({
        id: "",
        open: false,
    })

    const userSignIn = (userInfo, token) => {
      setUser(userInfo)
      localStorage.setItem("authenticated", token);
      console.log(userInfo, token)
    }

    const userSignOut = () => {
      setUser(null)
      localStorage.clear()
    }

    useEffect (()=>{
      if (!user) {
        localStorage.clear()
      }
    }, [user])

    const value = {
      isLoading,
      setIsLoading,
      user, 
      setUser,
      userSignIn,
      userSignOut,
      bookingUI,
      setBookingUI,
      destinationUI,
      setDestinationUI,
      isSuccessful,
      setIsSuccessful,
      isFailed,
      setIsFailed,
      isSignInRequired,
      setIsSignInRequired,
      transitionOpen,
      setTransitionOpen,
      isAccountEditOpen,
      setIsAccountEditOpen
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