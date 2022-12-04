import React from 'react'
import {Alert, AlertIcon, HStack} from "@chakra-ui/react"

const Errorcom = () => {
  return (
    <HStack w={"full"} h={'10vh'} pos={'fixed'}  bottom={'4'} >
         <Alert status='error'  w={'50%'} margin={'auto'}>
            <AlertIcon/>
            Something Went Wrong
        </Alert>
    </HStack>
  )
}

export default Errorcom