import React from 'react';
import { ProList, ProSkeleton } from '@ant-design/pro-components';
import { Badge, Button, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const List = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://proapi.azurewebsites.net/github/issues').then((res) =>
        res.json()
      )
  });

  if (isLoading) {
    return (
      <ProSkeleton
        list={10}
        pageHeader={false}
        actionButton={false}
        statistic={false}
        type="list"
      />
    );
  }

  return (
    <>
      <ProList<GithubIssueItem>
        toolBarRender={() => {
          return [
            <Button key="add" type="primary">
              Add new
            </Button>,
            <Button key="Export" type="primary" danger>
              Export
            </Button>
          ];
        }}
        search={{}}
        cardBordered
        headerTitle="Bug list"
        size="small"
        defaultSize="small"
        rowKey="id"
        dataSource={data.data}
        onSubmit={(item) => {
          console.log('object :>> ', item);
        }}
        pagination={{ pageSize: 10 }}
        metas={{
          title: {
            dataIndex: 'user',
            title: 'User'
          },
          avatar: {
            dataIndex: 'avatar',
            search: false
          },
          description: {
            dataIndex: 'title',
            search: false
          },
          subTitle: {
            dataIndex: 'labels',
            search: false,
            render: (_, row) => {
              return (
                <Space size={0}>
                  {row.labels?.map((label: { name: string; color: string }) => (
                    <Tag color={label.color} key={label.name}>
                      {label.name}
                    </Tag>
                  ))}
                </Space>
              );
            }
          },
          content: {
            search: false,
            dataIndex: 'number',
            render: (_, row) => (
              <Space>
                {row.number && (
                  <>
                    <span>Number: </span>
                    <Badge overflowCount={9999} count={row.number} />
                  </>
                )}
              </Space>
            )
          },
          actions: {
            render: () => [
              <Button
                key="edit"
                shape="circle"
                size="small"
                type="primary"
                icon={<EditOutlined />}
              />,
              <Button
                key="delete"
                shape="circle"
                size="small"
                type="primary"
                danger
                icon={<DeleteOutlined />}
              />
            ]
          }
        }}
      />
    </>
  );
};

export default List;
