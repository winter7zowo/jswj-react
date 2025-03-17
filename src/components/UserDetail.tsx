import React, { useEffect, useState } from "react";
import { getUserInfo } from "../services/apiServices"; // 引入 API 方法

// 定义用户信息的接口（与 API 保持一致）
interface User {
  id: number;
  email: string;
  password: string;
  details: string;
}

const UserInfo: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserInfo(); // 调用 API 获取用户信息
        setUser(userData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>加载中...</p>;
  if (error) return <p style={{ color: "red" }}>错误: {error}</p>;
  if (!user) return <p>未找到用户信息</p>;

  return (
    <div style={styles.container}>
      <h2>用户信息</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>邮箱:</strong> {user.email}</p>
      <p><strong>密码:</strong> {user.password}</p>
      <p><strong>简介:</strong> {user.details}</p>
    </div>
  );
};

// 样式对象
const styles = {
  container: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    width: "300px",
    backgroundColor: "#f9f9f9",
  },
};

export default UserInfo;
