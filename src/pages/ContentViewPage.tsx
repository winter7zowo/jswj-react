import { Spin, Table, Rate } from 'antd'; // 👈 引入 Rate
import { useCallback, useEffect, useState } from 'react';
import { Tag } from '../api/tag.ts';
import TagManager from '../components/TagManager.tsx';
import { updateTagsForContent } from '../api/tag.ts';
import { Content, ContentResponse, fetchContent, updateContent } from '../api/content.ts';

const ContentViewPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [contentList, setContentList] = useState<ContentResponse>({ content: [], totalElements: 0 });
  const pageSize = 1;

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

  const handleTagsChange = async (id: number, newTags: Tag[]) => {
    try {
      const tagIds = newTags.map(tag => tag.id);
      await updateTagsForContent(id, tagIds);
      const updatedContentList = contentList.content.map(content => 
        content.id === id ? { ...content, tags: newTags } : content
      );
      setContentList({ ...contentList, content: updatedContentList });
    } catch (error) {
      console.error('Failed to update tags for content:', error);
    }
  };

  const handleRateChange = (id: number, value: number) => {
    // 1. 立即更新本地 UI
    const updatedContentList = contentList.content.map(content =>
      content.id === id ? { ...content, rate: value } : content
    );
    setContentList({ ...contentList, content: updatedContentList });
  
    // 2. 异步通知后端（不影响 UI）
    updateContent(id, value).catch(error => {
      console.error('Failed to update rating:', error);
      // 可选：失败后还原评分或提示用户
    });
  };

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
      render: (tags: Tag[], record: Content) => (
        <TagManager initialTags={tags} onTagsChange={(newTags) => handleTagsChange(record.id, newTags)} />
      ),
    },
    {
      title: '评分Rating', // 👈 新增评分列
      dataIndex: 'rate',
      render: (rate: number, record: Content) => (
        <Rate value={rate} onChange={(value) => handleRateChange(record.id, value)} />
      ),
    },
    {
      title: '创建时间creation time',
      dataIndex: 'createdAt',
    },
    {
      title: '作者ID author ID',
      dataIndex: 'authorID',
    },
    {
      title: '起始时期start time',
      dataIndex: 'startTime',
    },
    {
      title: '结束时期end time',
      dataIndex: 'endTime',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={contentList.content}
      rowKey="id"
      pagination={{
        current: currentPage,
        pageSize,
        total: contentList.totalElements,
        onChange: setCurrentPage,
      }}
    />
  );
};

export default ContentViewPage;
