'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { FaEnvelope, FaPhoneAlt, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import axios from 'axios';  // 移除未使用的 AxiosError 导入

// 注册 GSAP 插件
if ( typeof window !== 'undefined' )
{
  gsap.registerPlugin( ScrollTrigger );
}

// 定义输入组件的 Props 接口
interface InputFieldProps
{
  value: string;
  onChange: ( e: React.ChangeEvent<HTMLInputElement> ) => void;
  placeholder: string;
  type?: string;
  disabled?: boolean;
}

// Memoized Input 组件
const InputField = React.memo( ( {
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled = false
}: InputFieldProps ) =>
{
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full p-2 mb-4 bg-white dark:bg-black border border-gray-300 dark:border-gray-600 text-black dark:text-white transition-colors duration-300"
    />
  );
} );

InputField.displayName = 'InputField';

// 定义文本区域组件的 Props 接口
interface TextAreaFieldProps
{
  value: string;
  onChange: ( e: React.ChangeEvent<HTMLTextAreaElement> ) => void;
  placeholder: string;
  disabled?: boolean;
}

// Memoized TextArea 组件
const TextAreaField = React.memo( ( {
  value,
  onChange,
  placeholder,
  disabled = false
}: TextAreaFieldProps ) =>
{
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full p-2 mb-4 bg-white dark:bg-black border border-gray-300 dark:border-gray-600 text-black dark:text-white transition-colors duration-300"
    ></textarea>
  );
} );

TextAreaField.displayName = 'TextAreaField';

export default function ContactPage()
{
  const sectionRef = useRef<HTMLElement>( null );

  const [ name, setName ] = useState( '' );
  const [ email, setEmail ] = useState( '' );
  const [ message, setMessage ] = useState( '' );
  const [ status, setStatus ] = useState( '' );
  const [ isLoading, setIsLoading ] = useState( false );

  useEffect( () =>
  {
    // 避免服务器端渲染时执行
    if ( typeof window === 'undefined' ) return;

    const ctx = gsap.context( () =>
    {
      const tl = gsap.timeline( {
        defaults: { duration: 0.5, ease: 'power4.out' },
      } );

      // 整体淡入动画
      tl.fromTo( sectionRef.current, { opacity: 0 }, { opacity: 1 } )
        .from( 'h1', { opacity: 0, y: -50 }, '-=0.5' )
        .from( '.contact-item', { opacity: 0, y: 20, stagger: 0.2 }, '-=0.5' )
        .from( 'form', { opacity: 0, y: 50 }, '-=0.5' );

      // 为社交图标添加 hover 效果
      gsap.utils.toArray( '.social-link' ).forEach( ( link ) =>
      {
        // 使用类型断言
        const element = link as HTMLElement;
        element.addEventListener( 'mouseenter', () =>
        {
          gsap.to( element, { scale: 1.2, duration: 0.3 } );
        } );
        element.addEventListener( 'mouseleave', () =>
        {
          gsap.to( element, { scale: 1, duration: 0.3 } );
        } );
      } );
    }, sectionRef );

    return () => ctx.revert();
  }, [] );

  // 类型安全的事件处理函数
  const handleNameChange = ( e: React.ChangeEvent<HTMLInputElement> ) =>
  {
    setName( e.target.value );
  };

  const handleEmailChange = ( e: React.ChangeEvent<HTMLInputElement> ) =>
  {
    setEmail( e.target.value );
  };

  const handleMessageChange = ( e: React.ChangeEvent<HTMLTextAreaElement> ) =>
  {
    setMessage( e.target.value );
  };

  const handleSubmit = async ( e: React.FormEvent<HTMLFormElement> ) =>
  {
    e.preventDefault();
    setIsLoading( true );
    setStatus( 'Sending...' );
    try
    {
      // 使用 Next.js 环境变量
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
      const response = await axios.post( `${apiUrl}/email`, {
        name,
        email,
        message,
      } );
      if ( response.status === 200 )
      {
        setStatus( 'Message sent successfully!' );
        setName( '' );
        setEmail( '' );
        setMessage( '' );
      }
    } catch ( error: unknown )
    {
      console.error( 'Error:', error );

      let errorMessage = 'Unknown error occurred';

      // 类型守卫检查
      if ( error instanceof Error )
      {
        errorMessage = error.message;
      }

      // 检查是否为 Axios 错误
      if ( axios.isAxiosError( error ) && error.response )
      {
        errorMessage = `Failed to send message: ${error.response.data}`;
      }

      setStatus( errorMessage );
    } finally
    {
      setIsLoading( false );
    }
  };

  return (
    <div>
      <div className="absolute top-0 right-0 p-4">
      </div>
      <section
        ref={sectionRef}
        // className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-8 flex flex-col items-center transition-colors duration-300"
        className="min-h-screen bg-white dark:bg-black p-8 flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      >
        <h1 className="text-4xl font-bold text-blue-600 dark:text-yellow-400 mb-10">
          Get In Touch
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg w-full max-w-md border border-gray-400 dark:border-gray-600 transition-colors duration-300 focus-within:ring-4 focus-within:ring-blue-400"
        >
          <h2 className="text-2xl font-semibold text-blue-600 dark:text-yellow-400 mb-4 transition-colors duration-300">
            Send a Message
          </h2>

          <InputField
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={handleNameChange}
            disabled={isLoading}
          />

          <InputField
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={handleEmailChange}
            disabled={isLoading}
          />

          <TextAreaField
            placeholder="Your Message"
            value={message}
            onChange={handleMessageChange}
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-2 ${isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 dark:bg-yellow-400 hover:bg-blue-700 dark:hover:bg-yellow-500'
              } text-white dark:text-black font-bold transition-colors duration-300`}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>

          {status && (
            <p
              className={`mt-4 ${status.includes( 'Error' ) || status.includes( 'Failed' )
                ? 'text-red-500'
                : 'text-green-500'
                }`}
            >
              {status}
            </p>
          )}
        </form>

        {/* 社交图标区域 */}
        <div className="flex gap-4 mt-6">
          <a href="mailto:someone@example.com" className="social-link text-blue-600 dark:text-yellow-400">
            <FaEnvelope size={30} />
          </a>
          <a href="tel:+123456789" className="social-link text-blue-600 dark:text-yellow-400">
            <FaPhoneAlt size={30} />
          </a>
          <a href="https://www.linkedin.com/in/yourprofile" className="social-link text-blue-600 dark:text-yellow-400">
            <FaLinkedin size={30} />
          </a>
          <a href="https://github.com/yourprofile" className="social-link text-blue-600 dark:text-yellow-400">
            <FaGithub size={30} />
          </a>
          <a href="https://twitter.com/yourprofile" className="social-link text-blue-600 dark:text-yellow-400">
            <FaTwitter size={30} />
          </a>
        </div>
      </section>
    </div>
  );
}