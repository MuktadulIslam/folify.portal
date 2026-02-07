import { Suspense } from "react";
import LoginComponent from "@/components/auth/LoginComponent";

export default function LoginPage() {
    return (
        <Suspense>
            <LoginComponent />
        </Suspense>
    )
}
