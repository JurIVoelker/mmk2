"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { postRequest } from "@/lib/requestUtils";
import { Label } from "@radix-ui/react-label";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const LoginCard = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const { push } = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    const res = await postRequest("/api/login", { password });
    if (res.error) {
      setError(res.error[0].message);
      setPassword("");
    } else {
      setError("");
      if (redirect) {
        push(redirect);
      } else {
        push("/dashboard");
      }
    }
    setLoading(false);
  };

  return (
    <Card className="max-w-md w-[calc(100%-2rem)] min-w-[200px]">
      <CardHeader className="px-6 pt-6">
        <CardTitle className="font-bold">Login</CardTitle>
        <CardDescription>
          Gebe deine Zugangsdaten ein um dich einzuloggen.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password" className="text-sm">
              Passwort
            </Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {!isLoading && error && (
              <span className="text-sm text-destructive mt-2">{error}</span>
            )}
          </div>
          <Button
            type="submit"
            className="mt-4 w-full"
            disabled={isLoading || password === ""}
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
