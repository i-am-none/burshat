// import { Github } from "@medusajs/icons"
// import { Button, Heading } from "@medusajs/ui"

// const Hero = () => {
//   return (
//     <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
//       <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
//         <span>
//           <Heading
//             level="h1"
//             className="text-3xl leading-10 text-ui-fg-base font-normal"
//           >
//             Ecommerce Starter Template
//           </Heading>
//           <Heading
//             level="h2"
//             className="text-3xl leading-10 text-ui-fg-subtle font-normal"
//           >
//             Powered by Medusa and Next.js
//           </Heading>
//         </span>
//         <a
//           href="https://github.com/medusajs/nextjs-starter-medusa"
//           target="_blank"
//         >
//           <Button variant="secondary">
//             View on GitHub
//             <Github />
//           </Button>
//         </a>
//       </div>
//     </div>
//   )
// }

// export default Hero


"use client"

import { Button, Heading } from "@medusajs/ui"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, ArrowDown } from "lucide-react"
// import { Button } from "@/components/ui/button"

const carouselItems = [
  {
    title: "Welcome to BURSHAT",
    subtitle: "Discover Embroidered Clothing at unbeatable prices",
    bgColor: "bg-gradient-to-r from-pink-300 to-purple-300",
  },
  {
    title: "New Arrivals",
    subtitle: "Check out our latest collection",
    bgColor: "bg-gradient-to-r from-blue-300 to-green-300",
  },
  {
    title: "Summer Sale",
    subtitle: "Get up to 50% off on selected items",
    bgColor: "bg-gradient-to-r from-yellow-300 to-red-300",
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + carouselItems.length) % carouselItems.length)
  }

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale, y }}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {carouselItems.map(
          (item, index) =>
            index === currentSlide && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`absolute inset-0 ${item.bgColor}`}
              />
            ),
        )}
      </AnimatePresence>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.h1
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          >
            {carouselItems[currentSlide].title}
          </motion.h1>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.p
            key={`subtitle-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl sm:text-2xl text-white mb-8"
          >
            {carouselItems[currentSlide].subtitle}
          </motion.p>
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button size="large" className="bg-white text-pink-500 hover:bg-pink-100">
            Shop Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="bg-white bg-opacity-20 p-2 rounded-full"
        >
          <ArrowLeft className="h-6 w-6 text-white" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="bg-white bg-opacity-20 p-2 rounded-full"
        >
          <ArrowRight className="h-6 w-6 text-white" />
        </motion.button>
      </div>

      <motion.div
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <ArrowDown className="h-8 w-8 text-white animate-bounce" />
      </motion.div>
    </motion.section>
  )
}

