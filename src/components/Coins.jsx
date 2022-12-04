import React,{useEffect,useState} from 'react'
import axios from "axios"
import { server } from '../index'
import { Container, HStack, VStack ,Image,Text,Heading, scaleFadeConfig, Button, RadioGroup, Radio} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Loader from "./Loader"
import Errorcom from './Errorcom';

const Coins = () => {

    const [coins,setcoins]=useState([]);
    const [loading,setloadinhg] = useState(true)
    const [error,seterror]=useState(false);
    const [page,setpage]=useState(1);
    const [currency,setcurrency]=useState('inr');

    const currencySymbol=currency==="inr"?"₹":currency==="eur"?"€":"$";

    const changepage=(page)=>{
        setpage(page)
        setloadinhg(true)
}

    const btnarr=new Array(132).fill(1);

    useEffect(() => {

        const fetchcoins=async()=>{
            
           try {
            const {data}=await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
            setcoins(data)
            console.log(data)
            setloadinhg(false)
           } catch (error) {
                seterror(true)
                setloadinhg(false);
           }

        }
        fetchcoins();
    
      return () => {
        
      }
    }, [currency,page])
    
if(error) return <Errorcom/>

  return (
    <Container maxW={'container.xl'} >
        {
            loading ? (<Loader/>) :( <>

            <RadioGroup margin={'4'} padding={'4'} value={currency}>
               <HStack spacing={'4'}>
               <Radio value='inr' onClick={()=>setcurrency('inr')}>INR</Radio>
                <Radio value='eur' onClick={()=>setcurrency('eur')}>EUR</Radio>
                <Radio value='dol'  onClick={()=>setcurrency('usd')}>USD</Radio>
               </HStack>
            </RadioGroup>
                <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
                    {
                        coins.map((i)=>(
                            <CoinCard key={i.id} name={i.name} img={i.image}
                            price={i.current_price} symbol={i.symbol} id={i.id} currencySymbol={currencySymbol}/>
                        ))
                    
                    }
                </HStack>
                <HStack w={'full'}><Text margin={'auto'}>{page} of 132</Text></HStack>
                <HStack w={'full'} overflowX={'auto'} p={'8'}>
                    {
                       btnarr.map((value,index)=>(
                        <Button
                        css={{
                            "&:hover":{
                                backgroundColor:'salmon',
                                color:'black'
                            }
                        }} bgColor={'black'} color={'white'} onClick={()=>changepage(index+1)}
                        >{index+1}</Button>
                    ))
                    }
                </HStack>
            </>
            )
        }
    </Container>
  )
}


const CoinCard=({name,img,id,price,symbol,currencySymbol})=>(
    <Link to={`/coin/${id}`}>
        <VStack w={'52'} shadow={'lg'}
                m={'4'} p={'5'}  className="container" >
            <Image src={img}  w={'10'} h={'10'} objectFit={'contain'} />
            <Text>{symbol}</Text>
            <Heading size={'md'} noOfLines={'1'}>{name}</Heading>
        <Text noOfLines={'1'}>{price?`${currencySymbol}${price}`:"NA"}</Text>
        </VStack>
    </Link>
)

export default Coins