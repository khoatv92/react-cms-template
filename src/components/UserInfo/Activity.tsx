import React from 'react';
import { List, Typography } from 'antd';

interface Props {
  loading: boolean;
}

const Activity: React.FC<Props> = ({ loading }) => {
  const data = [
    'đĢ Racing car sprays burning fuel into crowd.',
    'đĒ´ Japanese princess to wed commoner.',
    'âšī¸ââī¸ Australian walks 100km after outback crash.',
    'đââī¸ Man charged over missing wedding girl.',
    'đŽ Los Angeles battles huge wildfires.',
    'đĢ Racing car sprays burning fuel into crowd.',
    'đĒ´ Japanese princess to wed commoner.',
    'âšī¸ââī¸ Australian walks 100km after outback crash.',
    'đââī¸ Man charged over missing wedding girl.',
    'đŽ Los Angeles battles huge wildfires.',
    'đĢ Racing car sprays burning fuel into crowd.',
    'đĒ´ Japanese princess to wed commoner.',
    'âšī¸ââī¸ Australian walks 100km after outback crash.',
    'đââī¸ Man charged over missing wedding girl.',
    'đŽ Los Angeles battles huge wildfires.'
  ];

  return (
    <List
      loading={loading}
      bordered
      dataSource={data}
      pagination={{
        pageSize: 10
      }}
      renderItem={(item) => (
        <List.Item>
          <Typography.Text mark>[01/12/2022 15:00]</Typography.Text> {item}
        </List.Item>
      )}
    />
  );
};

export default Activity;
