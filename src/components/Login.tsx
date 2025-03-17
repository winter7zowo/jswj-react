import React, { useState } from 'react';
import './Login.css';
import { login } from '../services/apiServices'; // 引入 API 服务

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // 用于显示反馈信息
  const [isLoading, setIsLoading] = useState(false); // 用于加载状态

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // 开始加载
    setMessage(''); // 清空之前的消息

    try {
      // 调用 API 服务中的登录函数
      const response = await login({ email, password });
      console.log(response.code);
      // 处理成功响应
      if (response.code === 0) {
        setMessage('登录成功！');
        // 这里可以跳转到其他页面，例如：
        // window.location.href = '/dashboard';
      } else {
        setMessage('登录失败，请检查邮箱和密码。');
      }
    } catch (error) {
      // 处理错误
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('登录失败，请稍后重试。');
      }
      console.error('登录错误:', error);
    } finally {
      setIsLoading(false); // 结束加载
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? '登录中...' : 'Sign In'}
        </button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Login;