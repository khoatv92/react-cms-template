/* eslint-disable react/no-children-prop */
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import en_US from 'antd/es/locale/en_US';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import Index from 'containers/Index';
import List from 'containers/List';
import PrivateLayout from 'components/layouts/Private';
import Login from 'containers/Login';
import Table from 'containers/Table';
import ForgetPassword from 'containers/ForgetPassword';
import Profile from 'containers/Profile';
import NewPassword from 'containers/NewPassword';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={en_US}>
        <BrowserRouter>
          <Routes>
            <Route
              path="dashboard"
              element={<PrivateLayout children={<Index />} />}
            />
            <Route
              path="list"
              element={<PrivateLayout children={<List />} />}
            />
            <Route
              path="table"
              element={<PrivateLayout children={<Table />} />}
            />
            <Route
              path="profile"
              element={<PrivateLayout children={<Profile />} />}
            />
            <Route path="/" element={<Login />} />
            <Route path="/forget" element={<ForgetPassword />} />
            <Route path="/password" element={<NewPassword />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
