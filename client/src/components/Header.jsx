import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Header = () => {

  const {user, setShowLogin} = useContext(AppContext)
  const navigate = useNavigate()
  const onClickHandler = ()=>{
    if(user){
      navigate('/care')
    }else{
      setShowLogin(true)
    }
  }

  return (
    <motion.div className='flex flex-col justify-center items-center text-center my-10' 
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once: true}}
    >
      <motion.div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'
      initial={{opacity:0, y:-20}}
      animate={{opacity:1, y:0}}
      transition={{delay:0.2, duration:0.8}}>
        <p>Fuel your mind. Reward your soul.</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>

      <motion.h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'
      initial={{opacity: 0}}
      animate={{opacity:1}}
      transition={{delay:0.4, duration:2}}
      >Invest time in <span className='text-blue-600'>self-care</span>,  build a healthier life</motion.h1>

      <motion.p className='text-center max-w-xl mx-auto mt-5'
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{delay:0.6, duration:0.8}}
      >Take a step toward a better you — complete self-care activities, earn points, and reward your well-being.</motion.p>

      <motion.button onClick={onClickHandler} className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'
      whileHover={{scale: 1.05}}
      whileTap={{scale: 0.95}}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{default : {duration:0.5}, opacity: {delay:0.8 , duration: 1}}}
      >
        Start Self-Care Journey 
        <img className='h-6' src={assets.star_group} alt="" />
      </motion.button>

    </motion.div>
  )
}

export default Header
