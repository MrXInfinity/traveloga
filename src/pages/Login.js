import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faAt, faEye } from "@fortawesome/free-solid-svg-icons"
import TransitionComponent from '../components/TransitionWrapper'

const Login = () => {
  const [typeIsPassword, setTypeisPassword] = useState(true)
  const {register, handleSubmit, setError, clearErrors, formState: {errors}} = useForm()
  const {user, userSignIn,  setIsLoading, setTransitionOpen} = useGlobalContext()
  const authenticationToken = localStorage.getItem("authenticated")
  const navigate = useNavigate()

  const formInputData = [
    ["Email:", "email", faAt, "text"], 
    ["Password:", "password", faEye]
  ]

  const submit = async (data) => {
    setIsLoading(true)
    setTransitionOpen(true)
    try {
      const {data: {user, token}} = await axios.post(
        "https://traveloga-api.onrender.com/api/v1/auth/login", 
      data,
      { headers: { 'Content-Type': 'application/json' }})
      userSignIn(user, token)
      setIsLoading(false)
      setTransitionOpen(false)
      navigate("/")

    } catch (err) {
      setIsLoading(false)
      setTransitionOpen(false)
      setError("login", {type: "login", message: "Either your email and/or password is wrong"})
    }
  } 
  
  useEffect(()=>{
    if (user && authenticationToken) {
      navigate("/")
    }
  }, [user, authenticationToken])
  
  return (
  <>
  <div className='flex w-full h-[93vh] md:h-screen bg-cover bg-no-repeat bg-center text-white' style={{backgroundImage: `url("/images/login-register-pic.avif")`}}>
    <div className="flex flex-col w-full bg-gradient-to-r from-black/80 lg:from-black/70 via-black/70 md:via-black/70 lg:via-black/70 to-black/30 md:to-black/10 lg:to-transparent py-8 lg:py-6 px-6 lg:px-8">
      <div className="flex md:items-center">
        <FontAwesomeIcon className='text-white mt-2 md:mt-0 text-2xl mr-4 lg:mr-2' icon={faCompass} />
        <div className=" flex-col w-40 md:w-fit">
          <h1 className=' text-xl text-white -mb-1'>TRAVELOGA</h1>
          <h1 className=' text-xs text-white '>Experience Philippines, Love Philippines</h1>
        </div>
      </div>
      <div className="flex flex-col mx-4 md:ml-8 lg:ml-12 mt-10 md:mt-12 lg:w-7/12 max-w-xl  md:h-full">
        <h1 className='font-["Rubik"] text-xl md:text-2xl mb-2 md:mb-3'>HELLO AGAIN!</h1>
        <p className='text-sm md:text-base mb-2 md:mb-4'>Welcome valued customer! LOG IN to access your list of bookings and to also book future flights or edit existing ones.</p>
        {errors.login && <p className='text-red-600 my-4 text-xs md:text-sm'>{errors.login.message}</p>}
        <form className={`flex flex-col gap-8 h-full ${errors.login ? `mt-0` : `mt-4`}`} onSubmit={handleSubmit(submit)}>
          {formInputData.map(([title, inputName, icon, type], index)=> (
          <div className='flex flex-col col-span-2' key={index}>
            <div className="flex items-center justify-between">
              <label className='md:text-lg' >{title}</label>
              {errors[inputName] && <p className='text-red-600 text-sm text-right'>{errors[inputName].message}</p>}
            </div>            
            <div className="flex col-span-2 bg-white px-4 py-2 rounded-lg mt-2 lg:mt-3 items-center">
              <input className='w-full bg-transparent md:text-lg py-1 md:py-0 text-black' type={!type ? typeIsPassword ? "password" : "text" : type} {...register(inputName, {required: "This field is required", onChange: ()=>clearErrors(["login", inputName])})}/>
              <FontAwesomeIcon className={`text-2xl ml-4 ${icon === faEye ? `text-amber-300` : `text-black`}`} icon={icon} onClick={()=>!type && setTypeisPassword(prev=>!prev)}/>
            </div>
          </div>
          ))}
          <div className="grid grid-cols-2 gap-4 lg:gap-12 md:mt-auto md:mb-6">
            <Link className="flex py-4 md:p-4 bg-[#2B8E9B]/30 hover:bg-[#2B8E9B]/50 justify-center transition-colors ease-in-out" to="/">RETURN HOME</Link>
            <button className="flex bg-amber-200 hover:bg-amber-300 py-4 md:p-4 text-center justify-center transition-colors ease-in-out">LOG IN</button>
          </div>
        </form>
      </div>
      <h1 className="lg:w-7/12 lg:ml-12 pt-4 border-dashed border-t-2 md:text-lg  max-w-xl text-center border-white mt-auto">
        Don’t have an existing account? <span><Link to="/register" className='text-amber-200 inline h-fit hover:border-b-4 border-amber-200 transition-all duration-300 ease-in-out'>SIGN UP</Link></span> now for free!
      </h1>
    </div>
  </div>
  <TransitionComponent />
  </>
  )
}

export default Login