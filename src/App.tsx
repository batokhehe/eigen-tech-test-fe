import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Card, Menu } from 'antd';
import { Link, Route, Routes } from 'react-router-dom';
import RentsList from './components/rent/RentList';
import AddRent from './components/rent/AddRent';
import UpdateRent from './components/rent/UpdateRent';
import MembersList from './components/member/MemberList';
import BookList from './components/book/BookList';

const tabListNoTitle = [
  {
    key: 'rent',
    label: 'Rent',
  },
  {
    key: 'member',
    label: 'Member',
  },
  {
    key: 'book',
    label: 'Book',
  },
];

const contentListNoTitle: Record<string, React.ReactNode> = {
  rent: <RentsList/>,
  member: <MembersList/>,
  book: <BookList/>,
};


function App() {
  
  const [activeTabKey, setActiveTabKey] = useState<string>('rent');

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  return (
    <>
      <Card
        style={{ width: '100%' }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey}
        tabBarExtraContent={<a href="#">More</a>}
        onTabChange={onTabChange}
      >
        {contentListNoTitle[activeTabKey]}
      </Card>
    </>
  );
}

export default App;
