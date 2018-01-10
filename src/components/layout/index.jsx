import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

import './index.scss';

export default class WebLayout extends React.Component {
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
            <Menu.Item key="1">编码转换</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Layout style={{ padding: '24px 0', marginTop: '20px', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub2']}
                style={{ height: '100%' }}
              >
                <Menu.Item key="1">
                  <span><Icon type="lock" />编码转换</span>
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