import LoginCard from "@/components/login-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <div className="h-[calc(100vh-4rem)] mb-8 flex items-center justify-center">
      <Suspense
        fallback={
          <Skeleton className="max-w-md w-[calc(100%-2rem)] min-w-[200px] h-58" />
        }
      >
        <LoginCard />
      </Suspense>
    </div>
  );
};

export default LoginPage;
