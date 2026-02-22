import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-100 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-800">Create Account</h1>
          <p className="text-green-600 text-sm mt-1">You need a super key to register</p>
        </div>
        <div className="flex justify-center">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
