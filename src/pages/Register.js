import axios from 'axios'
import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'
import LoadingComponent from '../components/LoadingComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faAt, faEye, faUser } from "@fortawesome/free-solid-svg-icons"

const Register = () => {
  const [typeIsPassword, setTypeisPassword] = useState(true)
  const {setIsLoading} = useGlobalContext()
  const navigate = useNavigate()
  const {register, watch, handleSubmit, formState: {errors}} = useForm({
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
    try {
      const userData = await axios.post(
        "http://localhost:5000/api/v1/auth/register", 
        data,
        { headers: { 'Content-Type': 'application/json' }})
      setIsLoading(false)
      navigate("/login")
    } catch (err) {
      console.log(err)
    }
    
  }

  return (
    <>
    <div className='flex w-full h-screen bg-cover bg-no-repeat bg=center text-white font-["Spinnaker"] bg-[url("https://images.pexels.com/photos/4673637/pexels-photo-4673637.jpeg?cs=srgb&dl=pexels-rye-bon-4673637.jpg&fm=jpg")]'>
      <div className="flex flex-col md:w-full bg-gradient-to-r from-black/70 via-black/50 py-8 lg:py-6 px-6 lg:px-8">
        <div className="flex items-center">
          <FontAwesomeIcon className='text-5xl lg:text-4xl mr-2' icon={faCompass} />
          <div className=" flex-col w-40 md:w-fit font-['Spinnaker'] lg:ml-2">
            <h1 className=' text-2xl md:text-3xl lg:text-xl -mb-1'>TRAVELOGA</h1>
            <h1 className=' text-sm md:text-base lg:text-sm'>Experience Philippines, Love Philippines</h1>
          </div>
        </div>
        <div className="flex flex-col mx-4 lg:ml-12 mt-16 lg:mt-8 lg:w-7/12">
          <h1 className='font-["Rubik"] text-2xl mb-1'>CREATING A NEW ACCOUNT</h1>
          <p className='mb-8 lg:text-xs'>Already have an account? <span><Link to="/login" className='text-amber-200 inline h-fit'>LOG IN</Link></span></p>
          <form className="flex flex-col lg:grid lg:grid-cols-2 gap-4" onSubmit={handleSubmit(submit)}>
            {formInputData.map(({title, inputName, icon, type, maxLength}, index)=>(
              <label className={`lg:text-sm ${index > 1 && `col-span-2`}`} key={index}>{title}<br />
                {errors[inputName] && <p className='text-red-600 text-sm my-1'>{errors[inputName].message}</p>}
                <div className="flex bg-[#2B8E9B]/50 p-4 lg:p-3 rounded-lg mt-2 lg:mt-3 items-center">
                  <input className='w-full bg-transparent text-lg lg:text-base' type={!type ? typeIsPassword ? "password" : "text" : type} {...register(`${inputName}`, 
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
                  <FontAwesomeIcon className="text-2xl ml-4" icon={icon} onClick={()=>!type && setTypeisPassword(prev=>!prev)}/>
                </div>
              </label>
            ))}
            <div className="grid grid-cols-2 lg:col-span-2 gap-4 lg:gap-12 mt-4 lg:mt-6">
              <Link className="flex p-4 bg-[#2B8E9B]/30 justify-center items-center" to="/">RETURN HOME</Link>
              <button className="flex bg-amber-200 p-4 justify-center items-center">CREATE ACCOUNT</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <LoadingComponent />
    </>
  )
}

export default Register