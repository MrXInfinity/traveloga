import axios from 'axios'
import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faAt, faEye, faUser } from "@fortawesome/free-solid-svg-icons"
import TransitionComponent from '../components/TransitionWrapper'

const Register = () => {
  const [typeIsPassword, setTypeisPassword] = useState(true)
  const {setIsLoading, setTransitionOpen} = useGlobalContext()
  const navigate = useNavigate()
  const {register, handleSubmit, formState: {errors}} = useForm({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  })

  const formInputData = [
  {
    title: "First Name:",
    inputName: "firstname",
    icon: faUser,
    type: "text",
  },
  {
    title: "Last Name:",
    inputName: "lastname",
    icon: faUser,
    type: "text",
  },
  {
    title: "Email:",
    inputName: "email",
    icon: faAt,
    type: "email",
    maxLength: 25,
  },
  {
    title: "Password:",
    inputName: "password",
    icon: faEye,
    type: "",
  }
  ]

  const submit = async data => {
    setIsLoading(true)
    setTransitionOpen(true)
    try {
      const userData = await axios.post(
        "https://traveloga-api.onrender.com/api/v1/auth/register", 
        data,
        { headers: { 'Content-Type': 'application/json' }})
      setIsLoading(false)
      setTransitionOpen(false)
      navigate("/login")
    } catch (err) {
      setIsLoading(false)
      setTransitionOpen(false)
    }
    
  }

  return (
    <>
    <div className='flex w-full h-[93vd] md:h-screen bg-cover bg-no-repeat bg=center text-white font-["Spinnaker"] bg-[url("https://images.pexels.com/photos/4673637/pexels-photo-4673637.jpeg?cs=srgb&dl=pexels-rye-bon-4673637.jpg&fm=jpg")]'>
      <div className="flex flex-col md:w-full bg-gradient-to-r from-black/70 via-black/50 py-8 lg:py-6 px-6 lg:px-8">
        <div className="flex md:items-center">
        <FontAwesomeIcon className='text-white mt-2 md:mt-0 text-2xl mr-4 lg:mr-2' icon={faCompass} />
        <div className=" flex-col w-40 md:w-fit">
          <h1 className=' text-xl text-white -mb-1'>TRAVELOGA</h1>
          <h1 className=' text-xs text-white '>Experience Philippines, Love Philippines</h1>
        </div>
      </div>
        <div className="flex flex-col mx-4 lg:ml-12 mt-10 lg:mt-8 lg:w-7/12 h-full">
          <h1 className='font-["Rubik"] text-xl md:text-2xl mb-1'>CREATING A NEW ACCOUNT</h1>
          <p className='text-sm md:text-base mb-6'>Already have an account? <span><Link to="/login" className='text-amber-200 hover:border-b-2 border-amber-200 inline h-fit transition-all duration-300 ease-in-out'>LOG IN</Link></span></p>
          <form className="flex flex-col lg:grid lg:grid-cols-2 gap-4 h-full" onSubmit={handleSubmit(submit)}>
            {formInputData.map(({title, inputName, icon, type, maxLength}, index)=>(
              <div className="grid grid-cols-2 grid-flow-row" key={index}>
                <label className={`md:text-lg ${index > 1 && `lg:col-span-2`}`} >{title}</label>
                {errors[inputName] && <p className='text-red-600 text-sm text-center'>{errors[inputName].message}</p>}
                  <div className="flex col-span-2 bg-white px-4 py-2 rounded-lg mt-2 lg:mt-3 items-center">
                    <input className='w-full bg-transparent md:text-lg lg:text-base py-1 text-black' type={!type ? typeIsPassword ? "password" : "text" : type} {...register(inputName, 
                      {required: `This field is required.`, 
                      minLength: {
                        value: 2,
                        message: "Add more characters."
                      },
                      maxLength: {
                        value: maxLength | 15,
                        message: "Too much characters."
                      }
                      })}/>
                    <FontAwesomeIcon className={`text-2xl ml-4 ${icon === faEye ? `text-amber-200`: `text-black`}`} icon={icon} onClick={()=>!type && setTypeisPassword(prev=>!prev)}/>
                  </div>
              
              </div>
            ))}
            <div className="grid grid-cols-2 lg:col-span-2 gap-4 lg:gap-12 mt-4 md:mt-auto">
              <Link className="flex py-4 px-2 md:p-4 bg-[#2B8E9B]/30 hover:bg-[#2B8E9B]/50 justify-center items-center transition-all ease-in-out" to="/">RETURN HOME</Link>
              <button className="flex bg-amber-200 hover:bg-amber-300 py-4 px-2 md:p-4 justify-center items-center transition-all ease-in-out">CREATE ACCOUNT</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <TransitionComponent />
    </>
  )
}

export default Register