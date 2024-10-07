"use client"

import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import axios from 'axios'

let images = [
  "https://via.placeholder.com/800x600/3",
  "https://via.placeholder.com/800x600/3",
  "https://via.placeholder.com/800x600/3",
  "https://via.placeholder.com/800x600/3",
  "https://via.placeholder.com/800x600/3",

]




export default function ContinuousCarousel() {
  const controls = useAnimation()
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const calculateWidth = () => {
      const imageWidth = 300 // width of each image
      const gap = 16 // gap between images
      return images.length * (imageWidth + gap)
    }

    setWidth(calculateWidth())

    controls.start({
      x: [0, -width],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    })
  }, [controls, width])

  // useEffect(()=>{
  //   let fetchData=async()=>{
  //     try {
        
  //       let res=await axios.get('api/getFeatured') ;
  //       if(res.data.success){
  //         images = res.data.products.map((product: any) => product.link)
     
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   fetchData();
  // },[])

  return (

     
  <div>
    <h1 className="text-center text-blue-500">
      Featured 
    </h1>

    <div className="overflow-hidden w-full">
      <motion.div
        className="flex"
        animate={controls}
        style={{ width: `${width * 2}px` }}
      >
        {[...images, ...images].map((src, index) => (
          <div key={index} className="flex-shrink-0 w-[300px] h-[200px] mr-4">
            <img
              src={src}
              alt={`Carousel image ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </motion.div>
    </div>
  </div>
   
  )
}