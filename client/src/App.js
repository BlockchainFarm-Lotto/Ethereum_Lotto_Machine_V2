// eslint-disable-next-line
import './App.css';
import React, {useState} from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import {Main, Header, Buy, Mypage} from "./components";
import LoadingOverlay from 'react-loading-overlay';
import styled, { css } from "styled-components";

const LoadingWarp = styled.div`
  height: 100vh;
`

function App() {
  let LottoCoinAddr = "0x661836D1264fF5FB1998f45299d0D769388202c1";
  let LottoCoinABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"_rank","type":"uint256"},{"indexed":false,"internalType":"uint256[]","name":"_submit","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"_answer","type":"uint256[]"}],"name":"WinOfLotto","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"total","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"SetCoin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"GetCoin","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"BuyLotto","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"ReceiveCoin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Send","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rank","type":"uint256"},{"internalType":"uint256[]","name":"_submit","type":"uint256[]"},{"internalType":"uint256[]","name":"_answer","type":"uint256[]"}],"name":"Winning","outputs":[],"stateMutability":"nonpayable","type":"function"}];
  
  const [account, setAccount] = useState("");
  const [owner, setOwner] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <BrowserRouter>
      <React.Fragment>
        <LoadingOverlay active={loading} spinner={loading} text="Waiting for response...">
          <LoadingWarp>
            <Header Addr={LottoCoinAddr} ABI={LottoCoinABI} SetAccount={setAccount} SetOwner={setOwner} />
              <Routes>
                <Route path="/" element={<Main Addr={LottoCoinAddr} ABI={LottoCoinABI} account={account} owner={owner} setLoading={setLoading} />}/> 
                <Route path="/Buy/:account/:owner" element={<Buy Addr={LottoCoinAddr} ABI={LottoCoinABI} setLoading={setLoading} />}/>
                <Route path="/Mypage" element={<Mypage Addr={LottoCoinAddr} ABI={LottoCoinABI} account={account} owner={owner} setLoading={setLoading} />}/>
              </Routes>
          </LoadingWarp>
        </LoadingOverlay>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
