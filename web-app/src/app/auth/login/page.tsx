import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-100 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-800">Welcome Back</h1>
          <p className="text-green-600 text-sm mt-1">Sign in to your LMS Builder</p>
        </div>
        <div className="flex justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
