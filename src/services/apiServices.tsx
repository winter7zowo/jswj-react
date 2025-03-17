import axios from "axios";

// 定义 API 的基础 URL（可以从环境变量中读取）
const API_URL = import.meta.env.VITE_API_URL || "http://your-api-url.com";

// 定义登录请求的参数类型
interface LoginRequest {
  email: string;
  password: string;
}

// 定义登录响应的类型
interface LoginResponse {
  code: number;
  message: string;
}

// 定义用户信息的类型
interface User {
  email: string;
  password: string;
  details: string;
  id: number;
}

// 登录 API 调用
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, data);
    return response.data; // 返回 API 响应数据
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "登录失败，请稍后重试。");
    } else {
      throw new Error("登录失败，请稍后重试。");
    }
  }
};

// 获取用户信息 API 调用
export const getUserInfo = async (): Promise<User> => {
  try {
    const response = await axios.get(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // 假设使用 token 进行身份验证
      },
    });
    return response.data; // 返回用户数据
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "获取用户信息失败");
    } else {
      throw new Error("获取用户信息失败");
    }
  }
};
