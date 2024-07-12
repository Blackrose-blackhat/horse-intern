"use client"
import React, { useRef } from 'react'
import { CardBody, CardContainer as BaseCardContainer, CardItem } from "@/components/ui/3d-card";
import Image from 'next/image';
import horses from "@/lib/horses.json"
import { motion } from 'framer-motion';

const CardContainer = motion(BaseCardContainer)

const Horses = () => {
  return (
    <div id='horses' className='flex flex-wrap gap-5 px-3 justify-center items-center'>
      {horses.map(horse => {
        return (
          <CardContainer 
            key={horse.id} 
            className="inter-var"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {horse.name}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                {horse.description}
              </CardItem>
              <CardItem
                translateZ="100"
                rotateX={20}
                rotateZ={-10}
                className="w-full mt-4"
              >
                <video
                  loop
                  muted
                  src={horse.image}
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  onMouseEnter={e => e.target.play()}
                  onMouseLeave={e => e.target.pause()}
                />
              </CardItem>
              <div className="flex justify-between items-center mt-20">
                <CardItem
                  translateZ={20}
                  translateX={-40}
                  as="button"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                >
                  Try now →
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        )
      })}
    </div>
  )
}

export default Horses