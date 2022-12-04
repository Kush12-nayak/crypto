import React,{useEffect,useState} from 'react'
import axios from "axios"
import { server } from '../index'
import { Container, HStack, VStack ,Image,Text,Heading, scaleFadeConfig} from '@chakra-ui/react';
import Loader from "./Loader"
import Errorcom from './Errorcom';

const Exchange = () => {

    const [exchanges,setexchanges]=useState([]);
    const [loading,setloadinhg] = useState(true)
    const [error,seterror]=useState(false);

    useEffect(() => {

        const fetchExchanges=async()=>{
            
           try {
            const {data}=await axios.get(`${server}/exchanges`);
            setexchanges(data)
            setloadinhg(false)
           } catch (error) {
                seterror(true)
                 setloadinhg(false);
           }

        }
        fetchExchanges();
    
      return () => {
        
      }
    }, [])
    
    if(error) return <Errorcom/>

  return (
    <Container maxW={'container.xl'} >
        {
            loading ? (<Loader/>) :( <>
                <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
                    {
                        exchanges.map((i)=>(
                            <ExchangeCard name={i.name} img={i.image}
                            rank={i.trust_score_rank} url={i.url}/>
                        ))
                    }
                </HStack>
            </>
            )
        }
    </Container>
  )
}


const ExchangeCard=({name,img,rank,url})=>(
    <a href={url} target='blank'>
        <VStack w={'52'} shadow={'lg'}
                m={'4'} p={'5'}  className="container" >
            <Image src={img}  w={'10'} h={'10'} objectFit={'contain'} />
            <Heading size={'md'} noOfLines={'1'}>{rank}</Heading>
        <Text noOfLines={'1'}>{name}</Text>
        </VStack>
    </a>
)

export default Exchange