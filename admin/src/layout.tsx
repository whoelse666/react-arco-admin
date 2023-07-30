import React from 'react';
import {
  Layout,
  Space,
  Tag,
  Switch,
  Card,
  Button,
  Menu,
  Typography,
  Grid,
} from '@arco-design/web-react';
const { Title, Paragraph, Text } = Typography;
const Row = Grid.Row;
const Col = Grid.Col;
// const IconFont = Icon.addFromIconFontCn({
//   src: '//sf1-cdn-tos.toutiaostatic.com/obj/iconfont/index_8132353a46ca4ac1314b8903202269af.js',
// });
// <IconFont type="icon-person" style={{ fontSize: 40, marginRight: 40 }} />;

import cs from 'classnames';
import {
  IconDashboard,
  IconTag,
  IconMenuFold,
  IconMenuUnfold,
  IconVideoCamera,
  IconUser,
  IconUserGroup,
  IconFile,
  IconCommon,
  IconStorage,
  IconBook,
  IconList,
  IconBulb,
  IconApps,
  IconBug,
} from '@arco-design/web-react/icon';
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
import { useMemo } from 'react';
import { getFlattenRoutes, routes } from './routes';
import './layout.css';

import { useState } from 'react';
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

const MyLayout = () => {
  const flattenRoutes = useMemo(() => getFlattenRoutes(routes) || [], [routes]);

  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const onClickMenuItem = (v) => {
    console.log('onClickMenuItem :>> ', v);
  };
  const selectedKeys = [];
  const openKeys = [];
  const setOpenKeys = (v) => {
    console.log('setOpenKeys :>> ', v);
  };

  function renderRoutes(locale) {
    console.log('renderRoutes :>> ', locale);
    // routeMap.current.clear();
    // return function travel(_routes: IRoute[], level, parentNode = []) {
    //   return _routes.map((route) => {
    //     const { breadcrumb = true, ignore } = route;
    //     const iconDom = getIconFromKey(route.key);
    //     const titleDom = (
    //       <>
    //         {iconDom} {locale[route.name] || route.name}
    //       </>
    //     );

    //     routeMap.current.set(
    //       `/${route.key}`,
    //       breadcrumb ? [...parentNode, route.name] : []
    //     );

    //     const visibleChildren = (route.children || []).filter((child) => {
    //       const { ignore, breadcrumb = true } = child;
    //       if (ignore || route.ignore) {
    //         routeMap.current.set(
    //           `/${child.key}`,
    //           breadcrumb ? [...parentNode, route.name, child.name] : []
    //         );
    //       }

    //       return !ignore;
    //     });

    //     if (ignore) {
    //       return '';
    //     }
    //     if (visibleChildren.length) {
    //       menuMap.current.set(route.key, { subMenu: true });
    //       return (
    //         <SubMenu key={route.key} title={titleDom}>
    //           {travel(visibleChildren, level + 1, [
    //             ...parentNode,
    //             route.name,
    //           ])}
    //         </SubMenu>
    //       );
    //     }
    //     menuMap.current.set(route.key, { menuItem: true });
    //     return <MenuItem key={route.key}>{titleDom}</MenuItem>;
    //   });
    // };
  }
  return (
    <div className="layout-basic-demo">
      <Layout style={{ height: '100vh' }}>
        <Header>Header</Header>
        <Layout>
          <Sider collapsed={collapsed}>
            <div className="menu_box">
              <Menu
                style={{ width: 200, borderRadius: 4 }}
                collapse={collapsed}
                accordion={true}
                defaultOpenKeys={['0']}
                defaultSelectedKeys={['0_2']}
              >
                <SubMenu
                  key="0"
                  title={
                    <>
                      <IconApps /> Navigation 1
                    </>
                  }
                >
                  <MenuItem key="0_0">Menu 1</MenuItem>
                  <MenuItem key="0_1">Menu 2</MenuItem>
                  <MenuItem key="0_2">Menu 3</MenuItem>
                  <MenuItem key="0_3">Menu 4</MenuItem>
                </SubMenu>
                <SubMenu
                  key="1"
                  title={
                    <>
                      <IconBug /> Navigation 2
                    </>
                  }
                >
                  <MenuItem key="1_0">Menu 1</MenuItem>
                  <MenuItem key="1_1">Menu 2</MenuItem>
                  <MenuItem key="1_2">Menu 3</MenuItem>
                </SubMenu>
                <SubMenu
                  key="2"
                  title={
                    <>
                      <IconBulb /> Navigation 3
                    </>
                  }
                >
                  <MenuItem key="2_0">Menu 1</MenuItem>
                  <MenuItem key="2_1">Menu 2</MenuItem>
                </SubMenu>
                <MenuItem renderItemInTooltip={() => 'NAVIGATION-4'} key="3">
                  <IconBook /> Navigation 4
                </MenuItem>
              </Menu>
              {/* <Menu
                collapse={collapsed}
                onClickMenuItem={onClickMenuItem}
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                onClickSubMenu={(_, openKeys) => {
                  setOpenKeys(openKeys);
                }}
              >
                {renderRoutes(locale)(routes, 1)}
              </Menu> */}
            </div>
            {/* <div className={styles['collapse-btn']} onClick={toggleCollapse}> */}
            <div className="collapsed_btn" onClick={toggleCollapse}>
              {collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
            </div>
          </Sider>
          <Content>
            <Layout>
              <Content>
                <Card>
                  {/* 标题 */}
                  <Title heading={6}>用户管理</Title>

                  <Space direction="vertical">
                    {/* 操作按钮 */}
                    <Button type="primary" style={{ marginBottom: 10 }}>
                      新增
                    </Button>

                    {/* 页面内容 */}
                    <Text>User Page</Text>
                  </Space>
                </Card>
              </Content>
            </Layout>
            <Footer>Footer</Footer>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default MyLayout;
