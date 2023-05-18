import emailjs from '@emailjs/browser';
import {
  faFacebookF,
  faInstagram,
  faPinterestP,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faCompass, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGlobalContext } from '../context.js';

const Footer = () => {
  return (
    <>
      <TopFooter />
      <BottomFooter />
    </>
  );
};

const TopFooter = () => {
  const { openSuccessSnackbar, openFailedSnackbar } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm({
    email: '',
  });

  const formSubmit = async (formData) => {
    setIsLoading(true);

    try {
      const { data: message } = await axios.post(
        'https://traveloga-api.onrender.com/api/v1/subscription',
        formData,
        { headers: { 'Content-Type': 'application/json' } },
      );
      await emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        formData,
        process.env.REACT_APP_PUBLIC_KEY,
      );
      setIsLoading(false);
      openSuccessSnackbar(message);
    } catch (err) {
      setIsLoading(false);
      openFailedSnackbar(err.response.data.msg);
      console.log(err);
    }
  };

  return (
    <section className="bg-[#34abbb] py-6 text-white md:py-12 xl:py-16 ">
      <div className="sm:3/4 mx-auto flex w-4/5 flex-col text-center lg:w-3/4">
        <p className="md:text-lg lg:text-xl ">
          TRAVEL. As much as you can. As far as you can. As long as you can.{' '}
          <br className="hidden lg:block" />
          Life's not meant to be lived in one place.
        </p>
        <h1 className="mt-2 md:text-lg lg:mt-4 lg:text-xl">Martin Moodie</h1>
        <p className="mt-4  text-xs lg:mt-6">
          Subscribe now to be aware of our future promos and possible changes to
          our services
        </p>
        <form
          className="mt-4 flex w-full items-center justify-between bg-white px-2 py-1 text-black md:mx-auto md:px-6 md:py-2 lg:w-3/4"
          onSubmit={handleSubmit(formSubmit)}>
          <input
            className="w-3/4 bg-transparent py-0 text-sm md:py-0 md:text-base lg:mr-4 lg:w-4/5"
            type="email"
            {...register('email')}
          />
          <button
            type="submit"
            disbled={isLoading}
            className="flex items-center bg-amber-200 py-2 px-4 transition-colors duration-300 ease-in-out hover:bg-amber-300 hover:text-white md:py-1 md:px-6">
            <h1 className="hidden sm:block">SUBMIT</h1>
            <FontAwesomeIcon
              className="text-lg sm:hidden"
              icon={faPaperPlane}
            />
          </button>
        </form>
      </div>
    </section>
  );
};

const BottomFooter = () => {
  const { openSuccessSnackbar, openFailedSnackbar } = useGlobalContext();
  const { register, handleSubmit } = useForm({
    name: '',
    subject: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const formSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const { data: message } = await axios.post(
        'https://traveloga-api.onrender.com/api/v1/message',
        formData,
        { headers: { 'Content-Type': 'application/json' } },
      );
      setIsLoading(false);
      openSuccessSnackbar(message);
    } catch (err) {
      setIsLoading(false);
      openFailedSnackbar(err.response.data.msg);
    }
  };

  return (
    <section className="mx-auto flex w-full flex-col items-center bg-[#2B8E9B] py-8 md:flex-row-reverse md:items-start lg:px-14 lg:py-8">
      <form
        className="lg:md-0 flex w-4/5 flex-col md:w-full md:pl-4 lg:w-2/3 xl:pl-8"
        onSubmit={handleSubmit(formSubmit)}>
        <div className="mb-4 grid h-full grid-flow-col grid-rows-4 gap-4 lg:grid-rows-3 ">
          {[
            ['text', 'Name', 'name'],
            ['email', 'Email', 'email'],
            ['text', 'Subject', 'subject'],
            ['paragraph', 'Message', 'message'],
          ].map(([type, placeholder, inputName], index) => (
            <input
              className="border-2 border-white bg-transparent p-4 transition duration-300 ease-in-out placeholder:italic placeholder:text-slate-400 hover:border-amber-200 last:lg:row-span-3"
              {...register(inputName)}
              type={type}
              placeholder={placeholder}
              key={index}
            />
          ))}
        </div>
        <button
          className="translation-all text-amber-200 duration-300 ease-in-out hover:text-amber-300 md:text-right"
          type="submit"
          disabled={isLoading}>
          Submit
        </button>
      </form>
      <div className="mt-6 flex w-4/5 flex-col items-center md:mt-0 md:items-start lg:w-1/3">
        <div className="flex lg:items-center">
          <FontAwesomeIcon
            className="mt-1 mr-2 text-2xl text-white md:text-3xl"
            icon={faCompass}
          />
          <div className="w-40 flex-col text-white md:w-fit">
            <h1 className="-mb-1">TRAVELOGA</h1>
            <h1 className="text-xs">
              Experience Philippines, Love Philippines
            </h1>
          </div>
        </div>
        <div className="mt-6 flex flex-col text-center md:mt-3 md:text-left">
          {[
            '500 Terry Francois Street',
            'San Francisco, CA 94158',
            'info@mysite.com',
            'Tel: 123-456-7890',
            'Fax: 123-456-7890',
            'Copymark: TRAVELOGA 2022. by: Johann Isaiah Mendoza',
          ].map((text, index) => (
            <h1 className="text-sm text-[#004852] lg:text-base" key={index}>
              {text}
            </h1>
          ))}
        </div>
        <div className="mx-auto mt-6 flex text-3xl text-white md:mx-0 lg:mt-3">
          {[
            [faPinterestP, 'https://www.pinterest.ph/'],
            [faInstagram, 'https://www.instagram.com/'],
            [faTwitter, 'https://twitter.com/'],
            [faFacebookF, 'https://www.facebook.com/'],
          ].map(([icon, link], index) => (
            <a
              className="ml-4 transition duration-300 ease-in-out first:ml-0 hover:text-amber-200"
              href={link}
              key={index}>
              <FontAwesomeIcon icon={icon} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Footer;
