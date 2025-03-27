import { BrowserRouter, Link, Route, Routes } from "react-router";
import ContentViewPage from "./pages/ContentViewPage";
import ManageTagPage from "./pages/ManageTagPage";
import { Layout, Menu, MenuProps, theme } from "antd";
import { DesktopOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react";
import axios from "axios";
import Pageview from "./components/pageview";
import Review from "./components/review";

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
    getItem(<Link to="">Data Overview</Link>, '1', <PieChartOutlined />),
    getItem(<Link to="/review">Content Review</Link>, '2', <DesktopOutlined />),
    getItem(<Link to="/content">Manage Content</Link>, '3'),
    getItem(<Link to="/tags">Manage Tags</Link>, '9'),
    getItem('UserList', 'sub1', <UserOutlined />, [
        getItem('Tom', '4'),
        getItem('Bill', '5'),
        getItem('Alex', '6'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '7'), getItem('Team 2', '8')]),
];

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        axios.post('http://localhost:8080/datas/visits/record')
            .catch(error => {
                console.error('Error recording visit:', error);
            });
    }, []);

    return (
        <BrowserRouter>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        items={items}
                    />
                </Sider>
                <Layout>
                    <Header style={{
                        padding: 0,
                        background: colorBgContainer
                    }} />
                    <Content style={{ margin: '0 16px' }}>
                        {/* <Breadcrumb style={{ margin: '16px 0' }}>
                            {breadcrumbItems.map((item, index) => (
                                <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                            ))}
                        </Breadcrumb> */}
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Routes>
                                <Route index element={<Pageview />} />
                                <Route path="review" element={<Review />} />
                                <Route path="content" element={<ContentViewPage />} />
                                <Route path="tags" element={<ManageTagPage />} />
                            </Routes>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©{new Date().getFullYear()} Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
