import React,{useState,useEffect} from 'react'
import axios from "axios"
import { server } from '../index'
import { Container,Box,RadioGroup,Radio,HStack, VStack,Text,Image,Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge,Progress, Button} from '@chakra-ui/react';
import {useParams } from 'react-router-dom';
import Loader from "./Loader"
import Errorcom from './Errorcom';
import Chart from './Chart';

const CoinDetail = () => {

  const [coin,setcoin]=useState({});
  const [loading,setloadinhg] = useState(true)
  const [error,seterror]=useState(false);
  const [currency,setcurrency]=useState('inr');
  const [days,setdays]=useState("1");
  const [chartArray,setChartArray]=useState([]);

  const currencySymbol=currency==="inr"?"₹":currency==="eur"?"€":"$";

  const params=useParams()

  const btns=["24h","7d","14d","30d","60d","200d","1y","max "]

  const Swichcharstat=(key)=>{

      switch (key) {
        case "24h":
          setdays("1");
          setloadinhg(true);
          break;
        
        case "7d":
          setdays("7d");
          setloadinhg(true);
          break;

        case "14d":
          setdays("14d");
          setloadinhg(true);
          break;
        
        case "30d":
          setdays("30d");
          setloadinhg(true);
          break;

        case "60d":
          setdays("60d");
          setloadinhg(true);
          break;

        case "200d":
          setdays("200d");
          setloadinhg(true);
          break;

        case "1y":
          setdays("365d");
          setloadinhg(true);
          break;
        
        default:
          break;
      }

  }

  useEffect(() => {

    const fetchcoin=async()=>{
        
       try {
        const {data}=await axios.get(`${server}/coins/${params.id}`);

        const {data: chartdata} =await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);

        setcoin(data)
        setChartArray(chartdata.prices);
        console.log(chartdata)
        setloadinhg(false)
       } catch (error) {
            seterror(true)
            setloadinhg(false);
            console.log(error)
       }

    }
    fetchcoin();

  return () => {
    
  }
}, [params.id,currency,days])

if(error) return <Errorcom/>

  return (
    <Container maxW={'container.xl'}>
      {
        loading?(<Loader/>):
        (
          <>
            <Box w={'full'} borderWidth={'1'}>
              <Chart arr={chartArray} currency={currencySymbol} days={days}/>
            </Box>

            <HStack p='4' overflowX={'auto'}>
              {
                btns.map((i)=>(
                  <Button key={i} onClick={()=>Swichcharstat(i)}>{i}</Button>
                ))
              }
            </HStack>

            <RadioGroup margin={'4'} padding={'4'} value={currency}>
               <HStack spacing={'4'}>
               <Radio value='inr' onClick={()=>setcurrency('inr')}>INR</Radio>
                <Radio value='eur' onClick={()=>setcurrency('eur')}>EUR</Radio>
                <Radio value='dol'  onClick={()=>setcurrency('usd')}>USD</Radio>
               </HStack>
            </RadioGroup>
            <VStack spacing={'4'} padding={'10'} alignItems={'flex-start'}>
              <Text alignSelf={'center'} opacity={'0.7'}>
                Last Updated On {Date(coin.market_data.last_updated).split("G")[0]}"
              </Text>
              <Image src={coin.image.large} h={'20'} w={'20'} objectFit={'contain'}>

              </Image>
              <Stat>
                <StatLabel>{coin.name}</StatLabel>
                <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
                <StatHelpText>
                  <StatArrow type={coin.market_data.price_change_24h>0?'increase':'decrease'}/>
                  {coin.market_data.price_change_24h}%
              </StatHelpText>
              </Stat>
              <Badge fontSize={'2xl'} bgColor={'blackAlpha.800'}
              color={'white'}>{`#${coin.market_cap_rank}`}</Badge>
              <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} 
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}/>
            </VStack>
            <Box w={'full'} p={'5'}>
                <Item title={'Max Supply'} value={coin.market_data.max_supply}></Item>
                <Item title={'Circulating Supply'} value={coin.market_data.circulating_supply}></Item>
                <Item title={'Market Cap'} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}></Item>
                <Item title={'All Time Low'} value={`${currencySymbol}${coin.market_data.atl[currency]}`}></Item>
                <Item title={'All Time High'} value={`${currencySymbol}${coin.market_data.ath [currency]}`}></Item>
            </Box>
          </>
        )
      }
    </Container>
  )
}

const Item=({title,value})=>(
  <HStack justifyContent={'space-between'} my={'4'}>
    <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>{title}</Text>
    <Text>{value}</Text>
  </HStack>
)

const CustomBar=({high,low})=>(
  <VStack w={'full'}>
    <Progress value={'50'} w={'full'} colorScheme={'teal'}/>
    <HStack justifyContent={'space-between'} w={"full"}>
      <Badge children={low} colorScheme={'red'}/>
      <Text>24 HR Range</Text>
      <Badge children={high} colorScheme={'green'}/>
    </HStack>
  </VStack>
)

export default CoinDetail