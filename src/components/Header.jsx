import React from 'react'
import {Button, HStack,Box} from "@chakra-ui/react"
import {Link} from "react-router-dom"

const Header = () => {
  return (
      <HStack bgColor={"blackAlpha.900"} p={'4'} justifyContent={'flex-end'}>
        <Button variant={'unstyled'} color={'white'} mx={['2','5']}>
            <Link to="/">Home</Link>
        </Button>
        <Button variant={'unstyled'} color={'white'} mx={['2','5']}>
            <Link to="/exchange">Exchanges</Link>
        </Button>
        <Button variant={'unstyled'} color={'white'}>
            <Link to="/coins">Coins</Link>
        </Button>
    </HStack>
  )
}

export default Header