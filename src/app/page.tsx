import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";


export default function Home() {
  return (
    <>
        <Card className="w-[500px] mx-auto my-2">
            <CardHeader>
                <CardTitle>Willkommen</CardTitle>
                <CardDescription>Startseite</CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild className="w-full mx-auto">
                    <Link href={"/home"}>Home</Link>
                </Button>
            </CardContent>
        </Card>
      </>
  );
}
