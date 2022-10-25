import axios from 'axios'
import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { useGlobalContext } from '../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from "@fortawesome/free-solid-svg-icons"

const EditAccountComponent = () => {

    const {unregister, setValue, watch, handleSubmit, formState: {errors}} = useForm()
    console.log(watch())
    const formInputData = [
    {
        title: "First name",
        inputName: "firstname",
        type: "text",
    },
    {
        title: "Last name",
        inputName: "lastname",
        type: "text",
    },
    {
        title: "Email",
        inputName: "email",
        type: "email",
        maxLength: 25,
    },
    {
        title: "Password",
        inputName: "password",
        icon: true,
        type: ""
    },
    {
        title: "Current password",
        inputName: "currentPassword",
        icon: true,
        type: ""
    }
    ]

    const {user} = useGlobalContext()
    const authenticationToken = localStorage.getItem("authenticated")
    const [formInputState, setFormInputState] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        currentPassword: ""
    })
    console.log(formInputState)
    const [typeisPassword, setTypeIsPassword] = useState({
        password: true,
        currentPassword: true
    })
    const checkInputValue = (inputName, value) => {
        setValue(inputName, value)
        if (!value) unregister(inputName)
    }


    const formSubmit = async data => {
        try {
            const {data: {user: userData}} = await axios.patch(
                `https://traveloga-api.onrender.com/api/v1/users/${user.userId}`,
                data,
                { headers: { 'Authorization': `Bearer ${authenticationToken}` }}
            )
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <form className='bg-white px-8 py-8 w-screen' onSubmit={handleSubmit(formSubmit)}>
        <h1 className='text-2xl font-medium mb-8 text-center'>EDIT ACCOUNT INFO</h1>
        <div className="grid grid-cols-1 grid-flow-row gap-4">
            {formInputData.map(({title, inputName, type, icon, maxLength}, index)=> (
                <div className="flex flex-col" key={index}>
                    <label className='text-xl'>{title}</label>
                    {errors[inputName] && <p className='text-red-600 text-sm my-1'>{errors[inputName].message}</p>}
                    <div className="flex justify-center items-center border-2 border-solid border-black/50">
                        <input className="w-full px-4 py-2" type={!type ? typeisPassword[inputName] ? `password` : `text` : type} onChange={(e)=>checkInputValue(inputName, e.currentTarget.value)}/>
                    {icon && <FontAwesomeIcon className="text-2xl mx-4" icon={faEye} onClick={()=>setTypeIsPassword({...typeisPassword, [inputName]: !typeisPassword[inputName]})}/>}
                    </div>
                </div>
            ))}
        </div>
        <div className="grid grid-cols-2 grid-flow-row gap-6 mt-6">
            <button className='bg-amber-200 hover:bg-amber-300 transition-color duration-300 ease-in-out py-4' >Close</button>
            <button className='bg-amber-200 hover:bg-amber-300 transition-color duration-300 ease-in-out py-4' type="submit">Submit</button>
        </div>
    </form>
  )
}

export default EditAccountComponent