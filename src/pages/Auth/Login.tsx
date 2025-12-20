"use client";

import {
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Button, Card, Form, Input, Typography, message, Divider } from "antd";
import { useLoginMutation } from "../../redux/api/authApi.js";
import { setUser } from "../../redux/features/authSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook } from "lucide-react";
import logo from "@/assets/logo.jpg"

const { Title, Text } = Typography;

export default function LoginPage() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await login(values).unwrap();
      dispatch(setUser(res?.data));
      localStorage.setItem("accessToken", res?.data?.accessToken);
      message.success("Login successful!");
      navigate("/");
    } catch (err) {
      message.error(err?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      {/* Animated News Channel Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex flex-col items-center"
      >
        <div className="w-20 h-20 shadow-2xl drop-shadow-2xl rounded-full">
          {" "}
          <img
            src={logo}
            alt="Innovation Logo"
            width={150}
            height={100}
            className="mb-4 w-20 h-20 rounded-full border-4 border-blue-200"
          />
        </div>
      </motion.div>

      {/* Login Card with Animation */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card
          className="shadow-xl rounded-2xl overflow-hidden border-0"
          bodyStyle={{ padding: "40px" }}
        >
          <div className="text-center mb-8">
            <Title level={3} className="text-gray-800 mb-1">
              Welcome Back
            </Title>
            <Text type="secondary" className="text-sm">
              Sign in to your dashboard
            </Text>
          </div>

          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
              className="mb-4"
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="your@email.com"
                size="large"
                className="py-3 px-4 rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
              className="mb-2"
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="••••••••"
                size="large"
                className="py-3 px-4 rounded-lg"
              />
            </Form.Item>

            <div className="flex justify-between items-center mb-6">
              <a
                href="/forgot-password"
                className="text-sm text-primary hover:text-primary/90 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <Form.Item className="mb-4">
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="w-full h-12 font-medium text-lg bg-primary hover:bg-primary/60 rounded-lg shadow-md hover:shadow-lg transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </Form.Item>

            {/* <Divider plain className="text-gray-400">
              or continue with
            </Divider>

            <div className="flex justify-center gap-4 mb-6">
              <Button
                icon={<GoogleCircleFilled className="text-red-500" />}
                className="flex items-center justify-center w-12 h-12 rounded-full shadow-sm hover:shadow-md transition-all"
                onClick={() => message.info("Google login coming soon")}
              />
              <Button
                icon={<Facebook className="text-blue-600" />}
                className="flex items-center justify-center w-12 h-12 rounded-full shadow-sm hover:shadow-md transition-all"
                onClick={() => message.info("Facebook login coming soon")}
              />
            </div> */}

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-primary hover:text-primary/90 font-medium hover:underline"
              >
                Sign up
              </a>
            </div>
          </Form>
        </Card>
      </motion.div>

      {/* Footer with Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 text-center text-xs text-gray-500"
      >
        © {new Date().getFullYear()} Priyo saj  Clothing store. All rights reserved.
        <br />
        <a href="/privacy" className="hover:underline">
          Privacy Policy
        </a>{" "}
        •{" "}
        <a href="/terms" className="hover:underline">
          Terms of Service
        </a>
      </motion.div>
    </div>
  );
}
