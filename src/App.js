import React from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import { Layout, Breadcrumb } from "antd";
import Tab from "./components/Tab";


const { Content, Footer } = Layout;
function App() {
  
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


export default App;
