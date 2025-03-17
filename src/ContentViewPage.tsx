import { Spin, Table } from '@douyinfe/semi-ui';
import { useCallback, useEffect, useState } from 'react';
import { SERVER_URL } from './cfg.ts';
import axios from 'axios';

interface Content {
  id: number;
  title: string;
  body: string;
  tags: { name: string }[];
  createdAt: string;
}

interface ContentResponse {
  content: Content[];
  totalElements: number;
}

const fetchContent = async (page: number, size: number): Promise<ContentResponse> => {
  const url = SERVER_URL + '/content/list';
  return await axios
    .get(url, {
      params: {
        page: page,
        size: size,
      },
    })
    .then((res) => {
      console.assert(res.status === 200);
      console.assert(res.data.code === 0);
      return res.data.data;
    })
    .catch(console.error);
};

const ContentViewPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [contentList, setContentList] = useState<ContentResponse>({ content: [], totalElements: 0 });
  const pageSize = 2;

  const loadData = useCallback(async () => {
    const data = await fetchContent(currentPage - 1, pageSize);
    setContentList(data);
    setLoading(false);
  }, [currentPage]);

  useEffect(() => {
    loadData().then();
  }, [loadData]);

  if (loading) {
    return <Spin />;
  }

  const columns = [
    {
      title: '标题Title',
      dataIndex: 'title',
    },
    {
      title: '正文Body',
      dataIndex: 'body',
      width: 300,
    },
    {
      title: '标签tags',
      dataIndex: 'tags',
      render: (tags: { name: string }[]) => tags.map(t => t.name).join(', '),
    },
    {
      title: '创建时间creation time',
      dataIndex: 'createdAt',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={contentList.content}
      rowKey="id"
      pagination={{
        currentPage,
        pageSize,
        total: contentList.totalElements,
        onPageChange: setCurrentPage,
      }}
    />
  );
};

export default ContentViewPage;