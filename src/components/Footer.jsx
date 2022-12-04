import React from 'react'
import {Box, Stack, VStack,Text,Image} from "@chakra-ui/react"
import kush from '../assets/kp-modified.png'


const Footer = () => {
  return <Box maxH={'35vh'} backgroundColor={'blackAlpha.900'} p={['4','10']}>
    <Stack direction={['column','row']} >
        <VStack justifyContent={'center'} color={'white'} w={'full'}>
            <Text>About Us</Text>
            <Text>We are the best crypto trading app in India, we provide our guidance at a very cheap price.</Text>
            <Image src={kush} borderRadius={'100%'} h={'70'} w={'30'} objectFit={'contain'} />
            <Text>@Kush-Nayak</Text>
        </VStack>
    </Stack>
  </Box>
}

export default Footer