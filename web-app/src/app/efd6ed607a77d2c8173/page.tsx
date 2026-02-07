import { Suspense } from "react";
import RegisterComponent from "@/components/auth/RegisterComponent";

export default function RegisterPage() {
    return (
        <Suspense>
            <RegisterComponent />
        </Suspense>
    )
}
