import ContractABI from './Airbnb.json'
import Web3 from 'web3'

export const address= '0x5463ad7d40A1511Ab62cb18268567910Ac870cfA'

export const createContract=()=>{
    const { ethereum }=window
    if (ethereum){
        const web3= new Web3(ethereum)
        return new web3.eth.Contract(ContractABI.abi,address)
    }
}

export const modalStyles= {
    content:{
        height: '300px',
        width: '400px',
        margin:'auto',
        marginTop: '150px',
        display: 'flex',
    },
    overlay:{
        backgroundColor:'rgb(0 0 0 / 74%)',
    },
}