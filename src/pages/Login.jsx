import { faAt, faCompass, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import useLocalStorage from '../hooks/useLocalStorage';

const Login = () => {
  const { localStorageValues, setLocalValue } =
    useLocalStorage('authenticated');
  const [typeIsPassword, setTypeisPassword] = useState(true);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  const formInputData = [
    ['Email:', 'email', faAt, 'text'],
    ['Password:', 'password', faEye],
  ];

  const submit = async (data) => {
    try {
      const { data: token } = await axios.post(
        'http://localhost:5000/api/v1/auth/login',
        data,
        { headers: { 'Content-Type': 'application/json' } },
      );
      setLocalValue(token);
      navigate('/');
    } catch (err) {
      setError('login', {
        type: 'login',
        message: 'Either your email and/or password is wrong',
      });
    }
  };

  if (user && localStorageValues)
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
          <div className="mx-4 mt-10 flex max-w-xl flex-col md:ml-8 md:mt-12 md:h-full lg:ml-12  lg:w-7/12">
            <h1 className='mb-2 font-["Rubik"] text-xl md:mb-3 md:text-2xl'>
              HELLO AGAIN!
            </h1>
            <p className="mb-2 text-sm md:mb-4 md:text-base">
              Welcome valued customer! LOG IN to access your list of bookings
              and to also book future flights or edit existing ones.
            </p>
            {errors.login && (
              <p className="my-4 text-xs text-red-600 md:text-sm">
                {errors.login.message}
              </p>
            )}
            <form
              className={`flex h-full flex-col gap-8 ${
                errors.login ? `mt-0` : `mt-4`
              }`}
              onSubmit={handleSubmit(submit)}>
              {formInputData.map(([title, inputName, icon, type], index) => (
                <div className="col-span-2 flex flex-col" key={index}>
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
                      className="w-full bg-transparent py-1 text-black md:py-0 md:text-lg"
                      type={
                        !type ? (typeIsPassword ? 'password' : 'text') : type
                      }
                      {...register(inputName, {
                        required: 'This field is required',
                        onChange: () => clearErrors(['login', inputName]),
                      })}
                    />
                    <FontAwesomeIcon
                      className={`ml-4 text-2xl ${
                        icon === faEye ? `text-amber-300` : `text-black`
                      }`}
                      icon={icon}
                      onClick={() =>
                        !type && setTypeisPassword((prev) => !prev)
                      }
                    />
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4 md:mt-auto md:mb-6 lg:gap-12">
                <Link
                  className="flex justify-center bg-[#2B8E9B]/30 py-4 transition-colors ease-in-out hover:bg-[#2B8E9B]/50 md:p-4"
                  to="/">
                  RETURN HOME
                </Link>
                <button className="flex justify-center bg-amber-200 py-4 text-center transition-colors ease-in-out hover:bg-amber-300 md:p-4">
                  LOG IN
                </button>
              </div>
            </form>
          </div>
          <h1 className="mt-auto max-w-xl border-t-2 border-dashed border-white pt-4  text-center md:text-lg lg:ml-12 lg:w-7/12">
            Don’t have an existing account?{' '}
            <span>
              <Link
                to="/register"
                className="inline h-fit border-amber-200 text-amber-200 transition-all duration-300 ease-in-out hover:border-b-4">
                SIGN UP
              </Link>
            </span>{' '}
            now for free!
          </h1>
        </div>
      </div>
    </>
  );
};

export default Login;
