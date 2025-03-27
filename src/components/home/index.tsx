import React, { ReactNode, useState, useEffect } from 'react';
import {
    DesktopOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Pageview from '../pageview';
import axios from 'axios';
import Review from '../review';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Data Overview', '1', <PieChartOutlined />),
    getItem('Content Review', '2', <DesktopOutlined />),
    getItem('UserList', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
];

const Home: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [breadcrumbItems, setBreadcrumbItems] = useState<string[]>(['User', 'Bill']);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [content, setContent] = useState<ReactNode>(<Pageview />)
    const [ReviewId, setReviewId] = useState<string>("null")

    useEffect(() => {
        axios.post('http://localhost:8080/datas/visits/record')
            .catch(error => {
                console.error('Error recording visit:', error);
            });
    }, []);

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        const { key } = e;
        let newBreadcrumbItems: string[] = [];
        let newContent: ReactNode = <div>none...</div>;

        switch (key) {
            case '1':
                newBreadcrumbItems = ['Data Overview'];
                newContent = <Pageview />
                break;
            case '2':
                newBreadcrumbItems = ['Content Review', ReviewId];
                newContent = <Review ReviewId={ReviewId} setReviewId={setReviewId} />
                break;
            case '3':
                newBreadcrumbItems = ['UserList', 'Tom'];
                break;
            case '4':
                newBreadcrumbItems = ['UserList', 'Bill'];
                break;
            case '5':
                newBreadcrumbItems = ['UserList', 'Alex'];
                break;
            case '6':
                newBreadcrumbItems = ['Team', 'Team 1'];
                break;
            case '8':
                newBreadcrumbItems = ['Team', 'Team 2'];
                break;
            default:
                newBreadcrumbItems = ['User', 'Bill'];
                break;
        }

        setBreadcrumbItems(newBreadcrumbItems);
        setContent(newContent)
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={items}
                    onClick={handleMenuClick}
                />
            </Sider>
            <Layout>
                <Header style={{
                    padding: 0,
                    background: colorBgContainer
                }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {breadcrumbItems.map((item, index) => (
                            <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {content}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Home;