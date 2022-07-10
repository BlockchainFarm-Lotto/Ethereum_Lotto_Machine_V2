// eslint-disable-next-line
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./css/mypage.css";
import Web3 from "web3";

function Mypage(props) {
    let account =  props.account;
    let owner = props.owner;
    let result;
    let LottoCoinContract;

    let getcoin;
    let setcoin;
    let sendcoin;
    let receivecoin;

    const [balance, setBalance] = useState("0");
    const [gettingCoin, setGettingCoin] = useState("0");
    const [settingCoin, setSettingCoin] = useState("0");
    const [getAddr, setGetAddr] = useState("");
    const [senddingCoin, setSendingCoin] = useState("0");

    const getBalanceOf = async () => {
        
        if(window.ethereum){
            var web3 = new Web3(window.ethereum);
            console.log('메타마스크 연결!')
            LottoCoinContract = new web3.eth.Contract(props.ABI, props.Addr);
            result = await LottoCoinContract.methods.balanceOf(account[0]).call();
            setBalance(result);
            
            try{
                await window.ethereum.request({ method: "eth_requestAccounts" });
            }catch (error){
                console.log(`error ouccur ${error}`)
            }
        } else if(window.web3){
            var web3 = new Web3(Web3.curentProvider);
        } else{
            console.log('메타마스크 연결이 필요합니다...')
        }
    }

    useEffect(() => {
        getBalanceOf();
    }, []);

    const getCoin = async () => {
        if(window.ethereum){
            var web3 = new Web3(window.ethereum);
            console.log('getCoin');
            LottoCoinContract = new web3.eth.Contract(props.ABI, props.Addr);
            getcoin = await LottoCoinContract.methods.GetCoin(account[0]).call().then(res => {console.log("getCoin result:", res); setGettingCoin(res);});
            // getcoin = await LottoCoinContract.methods.balanceOf(account[0]).call().then(res => {console.log("getCoin result:", res); setGettingCoin(res);});
        }
    }

    const setCoin = async () => {
        if(window.ethereum){
            var web3 = new Web3(window.ethereum);
            console.log('setCoin');
            LottoCoinContract = new web3.eth.Contract(props.ABI, props.Addr);
            setcoin = await LottoCoinContract.methods.SetCoin(settingCoin).send({"from": account[0]});
        }
    }

    const sendCoin = async () => {
        if(window.ethereum){
            var web3 = new Web3(window.ethereum);
            console.log('sendCoin');
            LottoCoinContract = new web3.eth.Contract(props.ABI, props.Addr);
            sendcoin = await LottoCoinContract.methods.Send(getAddr, senddingCoin).send({"from": account[0]});
        }
    }

    const receiveCoin = async () => {
        if(window.ethereum){
            var web3 = new Web3(window.ethereum);
            console.log('sendCoin');
            LottoCoinContract = new web3.eth.Contract(props.ABI, props.Addr);
            receivecoin = await LottoCoinContract.methods.ReceiveCoin().send({"from": account[0]});
        }
    }

    const disconnectMetamask = async () => {
        let result = await window.ethereum.request({
            method: "wallet_requestPermissions",
            params: [
              {
                eth_accounts: {}
              }
            ]
        });
        console.log("disconnect");
        console.log("result: " + result);
        window.location.href = `/`;
    }

    return (
        <React.Fragment>
            {
                account != owner ? 
        
            <div className="myinfo">
                <div className="myinfo-wrap">
                    <div className="details"> 
                        <div className="details-box">
                            <div className="title">
                                주소
                            </div>
                            <div className="contents">
                                {account[0]}
                            </div>
                        </div>
                        <div className="details-box">
                            <div className="title">
                                보유 코인
                            </div>
                            <div className="contents">
                                {balance} Coin
                            </div>
                        </div>
                        <div className="details-box">
                            <button class="web3-button" onClick={receiveCoin}><div>코인 받기</div></button>
                            <div class="getcoin-text"><span>테스트 코인을 받고 로또에 응모하세요!</span></div>
                        </div>
                        <div className="details-box">
                            <button class="unlink-button" onClick={disconnectMetamask}><div>Refresh</div></button>
                        </div>
                    </div>
                </div>
                <Link to="/"><div className="re-start"><div>메인으로</div></div></Link>
            </div>
            :
            <div className="myinfo">
                <div className="myinfo-wrap">
                    <div className="details"> 
                        <div className="details-box">
                            <div className="title">
                                주소
                            </div>
                            <div className="contents">
                                {account[0]}
                            </div>
                        </div>
                        <div className="details-box">
                            <div className="title">
                                보유 코인
                            </div>
                            <div className="contents">
                                {balance} Coin
                            </div>
                        </div>
                        <div className="details-box">
                            <button class="web3-button" onClick={setCoin}><div>SetCoin</div></button>
                            <input type="text" className="details-input getwidth" onChange={(e) => {setSettingCoin(e.target.value);}} />
                        </div>
                        <div className="details-box">
                            <button class="web3-button" onClick={getCoin}><div>GetCoin</div></button>
                            <div class="getcoin-text"><span>{gettingCoin + " Coin"}</span></div>
                        </div>
                        <div className="details-box">
                            <button class="web3-button" onClick={sendCoin}><div>Send</div></button>
                            <div className="send-form">
                                <div className="send-form-cont">
                                    <div className="tit2">To</div>
                                    <input type="text" className="details-input" onChange={(e) => {setGetAddr(e.target.value);}} /> 
                                </div>
                                <div className="send-form-cont">
                                    <div className="tit2">Coin</div>
                                    <input type="text" className="details-input"  onChange={(e) => {setSendingCoin(e.target.value);}} /> 
                                </div>
                            </div>
                        </div>
                        <div className="details-box">
                            <button class="unlink-button" onClick={disconnectMetamask}><div>Refresh</div></button>
                        </div>
                    </div>
                </div>
                <Link to="/"><div class="re-start"><div>메인으로</div></div></Link>
            </div>
            }
        </React.Fragment>
    )
}

export default Mypage;