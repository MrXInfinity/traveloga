import {
  faAt,
  faCompass,
  faEye,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';

const Register = () => {
  const [typeIsPassword, setTypeisPassword] = useState(true);
  const {
    user,
    userSignIn: userSignUp,
    openSuccessSnackbar,
    openFailedSnackbar,
  } = useGlobalContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const formInputData = [
    {
      title: 'First Name:',
      inputName: 'firstname',
      icon: faUser,
      type: 'text',
    },
    {
      title: 'Last Name:',
      inputName: 'lastname',
      icon: faUser,
      type: 'text',
    },
    {
      title: 'Email:',
      inputName: 'email',
      icon: faAt,
      type: 'email',
      maxLength: 25,
    },
    {
      title: 'Password:',
      inputName: 'password',
      icon: faEye,
      type: '',
    },
  ];

  const submit = async (data) => {
    try {
      const {
        data: { token, message },
      } = await axios.post('http://localhost:5000/api/v1/auth/register', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      userSignUp(token);
      openSuccessSnackbar(message);
      navigate('/');
    } catch (err) {
      console.log(err);
      openFailedSnackbar(err.response.data.msg);
    }
  };

  if (user)
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-8 ">
        <h1 className="text-2xl font-semibold text-red-600">
          This Page is Unaccessible
        </h1>
        <Link
          to="/"
          className="transition-color rounded-md bg-amber-200 px-4 py-3 text-white duration-200 ease-in-out hover:bg-amber-300">
          Return to HomePage
        </Link>
      </div>
    );

  return (
    <>
      <div
        className="flex h-[93vh] w-full bg-cover bg-center bg-no-repeat text-white md:h-screen"
        style={{ backgroundImage: `url("/images/login-register-pic.avif")` }}>
        <div className="flex w-full flex-col bg-gradient-to-r from-black/80 via-black/70 to-black/30 py-8 px-6 md:via-black/70 md:to-black/10 lg:from-black/70 lg:via-black/70 lg:to-transparent lg:py-6 lg:px-8">
          <div className="flex md:items-center">
            <FontAwesomeIcon
              className="mt-2 mr-4 text-2xl text-white md:mt-0 lg:mr-2"
              icon={faCompass}
            />
            <div className=" w-40 flex-col md:w-fit">
              <h1 className=" -mb-1 text-xl text-white">TRAVELOGA</h1>
              <h1 className=" text-xs text-white ">
                Experience Philippines, Love Philippines
              </h1>
            </div>
          </div>
          <div className="mx-4 mt-10 flex h-full max-w-xl flex-col md:ml-8 md:mt-12 lg:ml-12 lg:w-7/12 lg:max-w-2xl">
            <h1 className='mb-2 font-["Rubik"] text-xl md:mb-3 md:text-2xl'>
              CREATING A NEW ACCOUNT
            </h1>
            <p className="mb-6 text-sm md:mb-8 md:text-base">
              Already have an account?{' '}
              <span>
                <Link
                  to="/login"
                  className="inline h-fit border-amber-200 text-amber-200 transition-all duration-300 ease-in-out hover:border-b-2">
                  LOG IN
                </Link>
              </span>
            </p>
            <form
              className="flex h-full max-w-xl flex-col gap-4 md:grid md:max-w-2xl md:grid-flow-row md:grid-cols-2"
              onSubmit={handleSubmit(submit)}>
              {formInputData.map(
                ({ title, inputName, icon, type, maxLength }, index) => (
                  <div
                    className={`col-span-2 flex flex-col first:col-span-1 ${
                      inputName === 'lastname' && `col-span-1`
                    }`}
                    key={index}>
                    <div className="flex items-center justify-between">
                      <label className="md:text-lg">{title}</label>
                      {errors[inputName] && (
                        <p className="text-right text-sm text-red-600">
                          {errors[inputName].message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-2 mt-2 flex items-center rounded-lg bg-white px-4 py-2 lg:mt-3">
                      <input
                        className="w-full bg-transparent py-1 text-black md:py-0 md:text-lg lg:text-base"
                        type={
                          !type ? (typeIsPassword ? 'password' : 'text') : type
                        }
                        {...register(inputName, {
                          required: `This field is required.`,
                          minLength: {
                            value: 2,
                            message: 'Add more characters.',
                          },
                          maxLength: {
                            value: maxLength | 15,
                            message: 'Too much characters.',
                          },
                        })}
                      />
                      <FontAwesomeIcon
                        className={`ml-4 text-2xl ${
                          icon === faEye ? `text-amber-200` : `text-black`
                        }`}
                        icon={icon}
                        onClick={() =>
                          !type && setTypeisPassword((prev) => !prev)
                        }
                      />
                    </div>
                  </div>
                ),
              )}
              <div className="mt-4 grid grid-cols-2 gap-4 md:col-span-2 md:mb-4 md:self-end lg:gap-12">
                <Link
                  className="flex items-center justify-center bg-[#2B8E9B]/30 py-4 px-2 text-center transition-all ease-in-out hover:bg-[#2B8E9B]/50 md:p-4"
                  to="/">
                  RETURN HOME
                </Link>
                <button className="flex items-center justify-center bg-amber-200 py-4 px-2 transition-all ease-in-out hover:bg-amber-300 md:p-4">
                  CREATE ACCOUNT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
