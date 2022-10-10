import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"

const EachTestimony = ({eachReview}) => {

    const [message, setMessage] = useState("This is the message...")
    const [picture, setPicture] = useState("https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=957&q=80")
    const [user, setUser] = useState("User")

    useEffect(()=>{

      if(eachReview){
        setMessage(eachReview.message)
        setPicture(eachReview.picture)
        setUser(eachReview.name)
        }
    }, [eachReview])
      
    
    if(!eachReview) {
        return (<div>There are no reviews...</div>)
    }
  
    return (
    <div>
        <p>{message}</p>
            <div className="flex">
              {picture==="" 
              ? <FontAwesomeIcon className="sm:text-7xl" icon={faCircleUser} /> 
              : <img src={picture} alt="" />}
                
                <h1>{user}</h1>
            </div>
    </div>
  )
}

export default EachTestimony