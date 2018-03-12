import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

import './index.scss';

export default class WebLayout extends React.Component {
  jumpUrl = ({ item }) => {
    if (item.props.url) {
      window.location.href = item.props.url;
    }
  }

  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo">前端工具箱</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">基础工具</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Layout style={{ padding: '24px 0', marginTop: '20px', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={[this.props.current]}
                defaultOpenKeys={['sub2']}
                onClick={this.jumpUrl}
                style={{ height: '100%' }}
              >
                <Menu.Item key="1" url="./encode.html">
                  <span><Icon type="lock" />编码转换</span>
                </Menu.Item>
                <Menu.Item key="2" url="./color.html">
                  <span><Icon type="lock" />颜色转换</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              {this.props.children}
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          前端工具箱 ©2018 Created by AIS TXD
        </Footer>
      </Layout>
    );
  }
}