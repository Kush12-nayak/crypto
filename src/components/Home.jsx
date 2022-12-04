import { Box, HStack ,Image,Text} from '@chakra-ui/react'
import React from 'react'
import btc from "../assets/btc.png"

const Home = () => {
  return <Box bgColor={"blackAlpha.800"} w={'full'} h={'85vh'}>
    <Image src={btc} h={'70vh'} w={['70%','70vh']} margin={'auto'} filter={'grayscale(1)'} />
    <Text textAlign={'center'}  color={'whiteAlpha.700'} fontSize={'2rem'}>
      Xcrypto
    </Text>
  </Box>
}

export default Home