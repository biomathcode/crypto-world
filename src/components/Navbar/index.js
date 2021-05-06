import React from 'react';
import {Layout, Typography} from 'antd';

const {Title} = Typography;
const {Header} = Layout;

function Navbar () {
    return (
    <Header className="navbar" >
            <Title  level={2} className="logo">AeternitySwap</Title>
    </Header>
    )
}

export default Navbar;
