import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Web3Container from '../../lib/Web3Container';
import Er from '../../components/Er'
import {getContractbyName} from '../../lib/getContractbyName';
import Login from '../../components/login/login';

const OrgLogin = ({accounts,web3})=>{
    return(
        <>
        <Login loginType={'Organization'} accounts={accounts} web3={web3}></Login>
 
        </>
    )

}

export default () => (
  <Web3Container
    renderLoading={() => <div>Loading Accounts Page...</div>}
    render={({ web3,accounts }) => {
        return(      
        <>
        { accounts.length!=0 ? <OrgLogin accounts={accounts} web3={web3}/>: <Er/>}
        </>
        
        )
    }}
  />
)