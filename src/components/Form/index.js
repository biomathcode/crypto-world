import { Form, Input, InputNumber, Button } from 'antd';
import React, { useState} from "react";

import axios from "./../../apis/api"

import {ArrowDownOutlined } from '@ant-design/icons'

const FormContainer = () => {
    const [amount, setAmount] = useState("1000000");
  const [AE, setAE] = useState("0xfFe1426e77CE0F7c0945fCC1f4196CD8dC3f090A");
  const [ETH, setETH] = useState("0xfFe1426e77CE0F7c0945fCC1f4196CD8dC3f090A");

  const [err, setERR] = useState("no error");

  function handleSubmit(e) {
    e.preventDefault();
    const json = {
      amount: amount,
      ae: AE,
      eth: ETH,
    };
    const content = {
      toAddress: ETH,
      amount: amount,
    };
    console.log(content);
    axios
      .put("/ethereum/mint", content)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setERR(
            "Minting status: " + res.data.msg + "  status :",
            res.data.status
          );
          const burnContent = {
            fromAddress: AE,
            amount: amount,
          };
          axios
            .put("/ethereum/burn", burnContent)
            .then((res) => {
              if (res.status === 200) {
                console.log(res.data);
                setERR(
                  "Burning status :" + res.data.msg + "  status :",
                  res.data.status
                );
              } else {
                setERR("API call to burn ", res.status);
              }
            })
            .catch((err) => console.log("error in burning", err));
        }
      })
      .catch((e) => console.log(e));

    //Two api calls
    // first mint
    //second burn
  }

    return (
        <div >
        <form
         className="form"
          onSubmit={handleSubmit}
        >
          <div className="inputContainer">
            <label> AE address</label>
            <input value={AE} onChange={(e) => setAE(e.target.value)}></input>
          </div>
          <div className="inputContainer">
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            ></input>
          </div >

          <div className="iconContainer">
            <ArrowDownOutlined className="downicon" style={{ fontSize: '32px', color: '#1FC7D4' }} />
          </div>

          <div className="inputContainer">
            <label>Ethereum address</label>
            <input value={ETH} onChange={(e) => setETH(e.target.value)}></input>
          </div>
          <div className="submitContainer">
          <input type="submit" value="Continue" className="submitForm" />
          </div>
        </form>
      </div>
        
    )
}

export default FormContainer;