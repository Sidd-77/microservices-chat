import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Home() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center text-white p-8">
        <h1 className="text-5xl font-bold mb-6">Welcome to ChatApp</h1>
        <p className="text-xl mb-8">
          {isAuthenticated
            ? `Welcome back, ${user?.username}!`
            : "Join our community and start chatting with people around the world!"}
        </p>
        <div className="space-x-4">
          {isAuthenticated ? (
            <Link to="/chat">
              <Button color="primary" size="lg">
                Go to Chat
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button color="primary" size="lg" className="mr-4">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button color="secondary" size="lg">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}