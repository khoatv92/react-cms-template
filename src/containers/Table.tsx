import React, { useState } from 'react';
import { ProColumns } from '@ant-design/pro-components';
import { ProTable, ProSkeleton } from '@ant-design/pro-components';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons';
import { Button, message, Form, Space, Modal } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CollectionCreateForm from 'components/Form/CollectionCreateForm';
import { posts, newPosts, deletePosts, editPosts } from 'api/posts';
import { InewPosts, IPosts } from 'interfaces/posts';

const { confirm } = Modal;

const Table = () => {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<'add' | 'edit'>('add');
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: posts
  });

  const { mutate, isLoading: confirmLoading } = useMutation({
    mutationFn: newPosts,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });

  const { mutate: mutateDeletePosts } = useMutation({
    mutationFn: deletePosts,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });

  const { mutate: mutateEditPosts } = useMutation({
    mutationFn: editPosts,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });

  const onCreate = (values: InewPosts) => {
    if (action === 'add') {
      mutate({
        id: 1,
        title: values.title,
        body: values.body,
        userId: 1
      });
    } else {
      mutateEditPosts({
        id: 1,
        title: values.title,
        body: values.body,
        userId: 1
      });
    }
    message.success('Add new successful');
    setOpen(false);
  };

  const showDeleteConfirm = (id: number) => {
    confirm({
      centered: true,
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      okType: 'danger',
      onOk() {
        mutateDeletePosts({ id });
        message.success(`Delete successful ${id}`);
      }
    });
  };

  const columns: ProColumns<IPosts>[] = [
    {
      title: 'User Id',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
      search: false
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      search: false,
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setOpen(true);
              form.setFieldsValue(record);
              setAction('edit');
            }}
            shape="circle"
            size="small"
            type="primary"
            icon={<EditOutlined />}
          />
          <Button
            onClick={() => showDeleteConfirm(record.id)}
            shape="circle"
            size="small"
            type="primary"
            danger
            icon={<DeleteOutlined />}
          />
        </Space>
      )
    }
  ];

  if (isLoading) {
    return <ProSkeleton pageHeader={false} actionButton={false} type="list" />;
  }

  return (
    <>
      <ProTable<IPosts>
        toolbar={{
          actions: [
            <Button
              key="add"
              type="primary"
              onClick={() => {
                setOpen(true);
                setAction('add');
                form.resetFields();
              }}
            >
              Add new
            </Button>,
            <Button
              key="Export"
              type="primary"
              danger
              onClick={() => {
                alert('Export');
              }}
            >
              Export
            </Button>
          ],
          settings: []
        }}
        scroll={{
          x: 'auto'
        }}
        cardBordered
        size="small"
        dataSource={data}
        rowKey="key"
        columns={columns}
        // search={false}
        onSubmit={(item) => {
          console.log('object :>> ', item);
        }}
        dateFormatter="string"
      />
      <CollectionCreateForm
        form={form}
        confirmLoading={confirmLoading}
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default Table;
