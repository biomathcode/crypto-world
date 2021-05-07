import React, { useState, useEffect } from "react";
import "./App.css";

import Button from "./components/Button";

import axios from "./apis/api";
import Navbar from "./components/Navbar";
import { Layout, Row, Col, Slider, Menu, Breadcrumb } from "antd";
import Tab from "./components/Tab";


const { SubMenu } = Menu;
const { Content, Footer } = Layout;
function App() {
  const [collapsed, setCollapse] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapse(true);
  } 
  return (
      <Layout>
        <Navbar />
        <Layout>
        </Layout>
        <Layout>
        <Content style={{ padding: '0 50px', minHeight: '90vh' }} >
        <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
          <div style={{display: 'flex', justifyContent:"center"}}>
          <Tab />
          </div>
        </Content>
        <Footer>
        AeternitySwap © 2021 Created by AeternitySwap
          </Footer>

        </Layout>
        
      </Layout>
  );
}

function CheckBalance() {
  const [Balance, setBalance] = useState(10000);
  const [AE, setAE] = useState(
    "ak_RjfYnCacrwT24bSeN8kKuyTd6qCQqY9kibz83HFH97oRf9BJf"
  ); //string

  const [loading, setLoading] = useState("initial");

  const [data, setData] = useState("0");

  function handleSubmit(e) {
    e.preventDefault();
    const content = {
      address: AE,
      amount: Balance,
    };
    axios
      .get("/aeternity/balance/" + AE, content)
      .then((res) => {
        if (res.status === 200) {
          setLoading("success");
          console.log(res);
          console.log(res.data);
          setData(res.data);
        } else {
          console.log("getting the balanced failed");
        }
      })
      .catch((e) => console.log(e));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          address:
          <input value={AE} onChange={(e) => setAE(e.target.value)} />
        </label>
        <label>
          amount:
          <input
            type="number"
            value={Balance}
            onChange={(e) => setBalance(e.target.value)}
          />
        </label>
        <input type="submit" value="submit" />
      </form>
      {loading === "success" ? (
        <div>{data} </div>
      ) : (
        <div>Please try again!</div>
      )}
    </div>
  );
}

function Main() {
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
    <>
      <Navbar />
      <div>
        <CheckBalance />
      </div>
      <div
        className="App"
        style={{
          margin: "100px",
          display: "flex",
          flex: "Column",
          justifyContent: "space-evenly",
        }}
      >
        <div>
          <div>AE to Eth</div>
          <p>{err}</p>
        </div>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <div>
            <label> AE address</label>
            <input value={AE} onChange={(e) => setAE(e.target.value)}></input>
          </div>
          <div>
            <label>AE amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            ></input>
          </div>

          <div>
            <label>Ethereum address</label>
            <input value={ETH} onChange={(e) => setETH(e.target.value)}></input>
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
      <Button />
    </>
  );
}

const EthConverter = () => {
  return;
};

export default App;
