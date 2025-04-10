"use client";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";

function Post({
                  postNumber,
              }: {
    postNumber: number
}) {
    return <>
        <Card>
            <CardHeader>
                <CardTitle>
                    Post {postNumber}
                </CardTitle>
            </CardHeader>
        </Card>
    </>
}
export default Post;
