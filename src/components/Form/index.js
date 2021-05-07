import { Button, notification } from "antd";
import React, { useState } from "react";

import axios from "./../../apis/api";
import { ArrowDownOutlined } from "@ant-design/icons";

const FormContainer = () => {
  const [amount, setAmount] = useState("1000000");
  const [AE, setAE] = useState("0xfFe1426e77CE0F7c0945fCC1f4196CD8dC3f090A");
  const [ETH, setETH] = useState("0xfFe1426e77CE0F7c0945fCC1f4196CD8dC3f090A");

  const [loading, setLoading] = useState(false);

  function handleSubmit () {
    setLoading(true);

    const content = {
      toAddress: ETH,
      amount: amount,
    };
    const sendData = async() => {
      await axios
      .put("/ethereum/mint", content)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          
          notification.open({
            message: `Working on your request... `,
            description: `Minting Status: ${res.data.msg} status: ${res.data.status}`,
            className: 'notification',
            style: {
              width: 500,
            }
          });
          const burnContent = {
            fromAddress: AE,
            amount: amount,
          };
          axios
            .put("/ethereum/burn", burnContent)
            .then((res) => {
              if (res.status === 200) {
                console.log(res.data);
                
                notification.open({
                  message: `Working on your request... `,
                  description: `Burning Status: ${res.data.msg} status: ${res.data.status}`,
                });
                notification.open({
                  message:res.data.msg === "sorry"? "Failed" : 'SUCCESSFUL', 
                  description: res.data.msg === "sorry"? "Transaction Failed " :" You're transaction is complete. "
                })
                setLoading(false)

              } else {
                notification.open({
                  message: "ERROR",
                  description:
                    "We are sorry for this! Something went wrong. Please try again ",
                });
              }
            })
            .catch((err) => console.log("error in burning", err));
        }
        else {
          notification.open({
            message: "ERROR",
            description:
              "We are sorry for this! Something went wrong. Please try again ",
          })
        }
      })
      .catch((e) =>{
        console.log(e)
        notification.open({
          message: 'SERVER ERROR',
          description: " Some issue in calling the api! Sorry for you're inconvenience "
        })
      });

    }
    sendData();
    
    console.log(content);
    
    
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
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
        </div>

        <div className="iconContainer">
          <ArrowDownOutlined
            className="downicon"
            style={{ fontSize: "32px", color: "#1FC7D4" }}
          />
        </div>

        <div className="inputContainer">
          <label>Ethereum address</label>
          <input value={ETH} onChange={(e) => setETH(e.target.value)}></input>
        </div>
        <div className="submitContainer">
          <Button loading={loading}   onClick={handleSubmit} className="submitForm">
          {loading ? 'loading...': 'Continue'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormContainer;
