import { Box, BoxProps, Fab } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

interface ImageSwap extends BoxProps {
  images: string[]
}
export function ImageSwap({ images, ...props }: ImageSwap) {
  const [index, setIndex] = useState(0)

  const nextImage = () => {
    setIndex((index + 1) % images.length)
  }

  const prevImage = () => {
    setIndex((index - 1 + images.length) % images.length)
  }

  return (
    <Box {...props} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
      <Fab size="small" onClick={nextImage} sx={{ m: 1 }} color="primary">
        <IoChevronBack />
      </Fab>

      <Fab size="small" onClick={prevImage} sx={{ m: 1 }} color="primary">
        <IoChevronForward />
      </Fab>
      {/* @ts-expect-error */}
      <AnimatePresence initial={false}>
        {images.map(
          (item, imageIndex) =>
            imageIndex === index && (
              <motion.img
                key={imageIndex}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  borderRadius: 16,
                  objectFit: 'cover'
                }}
                src={item}
                initial={{ x: 0, opacity: 1 }}
                animate={'active'}
              />
            )
        )}
      </AnimatePresence>
    </Box>
  )
}
