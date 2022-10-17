import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'
import LoadingComponent from '../components/LoadingComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faAt, faEye } from "@fortawesome/free-solid-svg-icons"

const Login = () => {
  const [typeIsPassword, setTypeisPassword] = useState(true)
  const {register, handleSubmit, setError, clearErrors, formState: {errors}} = useForm()
  const {user, userSignIn, setIsLoading} = useGlobalContext()
  const authenticationToken = localStorage.getItem("authenticated")
  const navigate = useNavigate()

  const formInputData = [
    ["Email:", "email", faAt, "text"], 
    ["Password:", "password", faEye]
  ]

  const submit = async (data) => {
    setIsLoading(true)
    try {
      const {data: {user, token}} = await axios.post(
        "http://localhost:5000/api/v1/auth/login", 
      data,
      { headers: { 'Content-Type': 'application/json' }})
      userSignIn(user, token)
      setIsLoading(false)
      navigate("/")
    } catch (err) {
      setIsLoading(false)
      
      if (err.response.data.msg === "Email Incorrect") setError("email", {type: "login", message: "Invalid Credentials"})
      if (err.response.data.msg === "Password Incorrect") setError("password", {type: "login", message: "Invalid Credentials"})
      else setError("login", {type: "login", message: "Either your email and/or password is wrong"})
      console.log(err)
    }
  } 
  
  useEffect(()=>{
    if (user && authenticationToken) {
      navigate("/")
    }
  })
  
  return (
    <>
      <div className='flex w-full h-screen bg-cover bg-no-repeat bg=center text-white font-["Spinnaker"] bg-[url("https://images.pexels.com/photos/4673637/pexels-photo-4673637.jpeg?cs=srgb&dl=pexels-rye-bon-4673637.jpg&fm=jpg")]'>
        <div className="flex flex-col lg:w-full bg-gradient-to-r from-black/70 via-black/50 py-8 lg:py-6 px-6 lg:px-8">
          <div className="flex items-center">
            <FontAwesomeIcon className='text-5xl lg:text-4xl mr-2' icon={faCompass} />
            <div className=" flex-col w-40 md:w-fit font-['Spinnaker'] lg:ml-2">
              <h1 className=' text-2xl md:text-3xl lg:text-xl -mb-1'>TRAVELOGA</h1>
              <h1 className=' text-sm md:text-base lg:text-sm'>Experience Philippines, Love Philippines</h1>
            </div>
          </div>
          <div className="flex flex-col mx-4 lg:ml-12 mt-16 lg:mt-8 lg:w-7/12">
            <h1 className='font-["Rubik"] text-2xl mb-4'>HELLO AGAIN!</h1>
            <p className=' lg:text-xs'>Welcome valued customer! LOG IN to access your list of bookings and to also book future flights or edit existing ones.</p>
            {errors.login && <p className='text-red-600 mt-4'>{errors.login.message}</p>}
            <form className={`flex flex-col gap-8 ${errors.login ? `mt-4` : `mt-8`}`} onSubmit={handleSubmit(submit)}>
            {formInputData.map(([title, inputName, icon, type], index)=> (
              <label className='lg:text-sm' key={index}>{title}<br />
                  {errors[inputName] && <p className='text-red-600 text-sm my-1'>{errors[inputName].message}</p>}
                  <div className="flex bg-[#2B8E9B]/50 p-4 lg:p-3 rounded-lg mt-2 lg:mt-3 items-center">
                    <input className='w-full bg-transparent text-lg lg:text-base' type={!type ? typeIsPassword ? "password" : "text" : type} {...register(inputName, {required: "This field is required", onChange: ()=>clearErrors(["login", inputName])})}/>
                    <FontAwesomeIcon className="text-2xl ml-4" icon={icon} onClick={()=>!type && setTypeisPassword(prev=>!prev)}/>
                  </div>
                </label>
            ))}
              <div className="grid grid-cols-2 gap-4 lg:gap-12 mt-12 lg:mt-6">
                <Link className="flex p-4 bg-[#2B8E9B]/30 justify-center" to="/">RETURN HOME</Link>
                <button className="flex bg-amber-200 p-4 justify-center">LOG IN</button>
              </div>
            </form>
          </div>
          <h1 className="lg:w-7/12 lg:ml-12 p-4 border-dashed border-t-2 text-lg text-center border-white mt-auto">
            Don’t have an existing account? <span><Link to="/register" className='text-amber-200 inline h-fit'>SIGN UP</Link></span> now for free!
          </h1>
        </div>
      </div>
      <LoadingComponent />
    </>
  )
}

export default Login