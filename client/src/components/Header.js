import React, {useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import "./css/header.css";
import Web3 from "web3";

function Header(props) {
    const {pathname} = useLocation();
    console.log("pathname", pathname);
    let visible = true;
    if(pathname === "/Mypage" || pathname.includes("Buy")) visible = false;
    // console.log(pathname.includes("Buy"));

    let owner;
    let account;
    let LottoCoinContract;

    const initWeb3 = async () => {
        
        if(window.ethereum){

            var web3 = new Web3(window.ethereum);

            console.log('메타마스크 연결해서 실행이 잘 됩니다.')
            console.log(web3)
            
            try{
                await window.ethereum.request({ method: "eth_requestAccounts" });
            }catch (error){
                console.log(`error ouccur ${error}`);
            }
        } else if(window.web3){
            var web3 = new Web3(Web3.curentProvider);
        } else{
            console.log('메타마스크 연결이 필요합니다...');
            alert('메타마스크 연결이 필요합니다!');
        }

        account = await web3.eth.getAccounts();
        console.log("현재 활성화된 계정이 나옵니다 : " + account); 
        setGetWeb3UserAddr(account);
        props.SetAccount(account);
        setGetVisible(true);

        LottoCoinContract = new web3.eth.Contract(props.ABI, props.Addr);
        owner = await LottoCoinContract.methods.owner().call();
        console.log('owner:', owner);
        setGetOwner(owner);
        props.SetOwner(owner);
    }

    const [getWeb3UserAddr, setGetWeb3UserAddr] = useState(""); // 메타마스크 활성화된 주소
    const [getVisible, setGetVisible] = useState(false);
    const [getOwner, setGetOwner] = useState("");

    return (
        <React.Fragment>
            <header id="fixed-bar" class="fixed-bar-box-shadow">
                <div id="fixed-bar-wrap">
                    <Link to="/">
                        <div id="fixed-bar-title">Ethereum Lotto</div>
                    </Link>
                    {visible ? getVisible ? <div class="btn-wrap"><span class="addr">{getWeb3UserAddr}</span><Link to="/Mypage" account={getWeb3UserAddr} owner={getOwner}><div class="mypage-button"><div>Mypage</div></div></Link></div> : 
                    <button class="link-button" onClick={initWeb3}><span class="button-text">연결하기</span></button>
                    : null} 
                </div>
            </header>
        </React.Fragment>
    )
}
export default Header;