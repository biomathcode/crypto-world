import { Tabs, } from "antd";
import { Container, SubContainer } from './styles'

import Form from './../Form';


import { RightOutlined } from '@ant-design/icons'
import { useState } from "react";



const { TabPane } = Tabs;

const TabItem = ({ FromTitle, ToTitle, subTitle, active }) => {
    return (
        <Container active={active}>
            <SubContainer>
                <div>{FromTitle}</div>
                <RightOutlined />
                <div>{ToTitle}</div>
            </SubContainer>
            <div>{subTitle} </div>
        </Container>
    )
}


const Tab = () => {

    const [key, setKey] = useState('1')

    function callback(key) {
        setKey(key)
        console.log(key);
    }

    return (
        <Tabs defaultActiveKey={key} className="TabContainer"  onChange={callback} type="card">
            <TabPane className="tabpanel" tab={<TabItem active={key === '1' ? true : false} FromTitle="AE" ToTitle="ETH" subTitle="(MetaMask)" />} key="1">
                <Form/>
            </TabPane>
            <TabPane  tab={<TabItem active={key === '2' ? true : false} FromTitle="ETH" ToTitle="AE" subTitle="(SuperHero)" />} key="2">
                <div>Coming Soon...</div>
            </TabPane>
        </Tabs>
    )


}
export default Tab