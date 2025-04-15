import {Card, CardContent, CardFooter} from "@/components/ui/card"
import {Button} from "@/components/ui/button";
import {ThumbsUp, Trash} from "lucide-react";
import {useState} from "react";

interface PostProps {
    content: string
    onDelete: () => void
}

export function Post({ content, onDelete }: PostProps) {
    const [likes, setLikes] = useState(0)

    const handleLike = () => {
        setLikes(likes + 1)
    }
    return (
        <Card>
            <CardContent className="p-4">
                {content}
            </CardContent>
            <CardFooter className="flex gap-1">
                <p>{likes}</p>
                <Button variant={"outline"} size={"icon"} onClick={handleLike}>
                    <ThumbsUp></ThumbsUp>
                </Button>
                <Button variant={"outline"} size={"icon"} onClick={onDelete}>
                    <Trash></Trash>
                </Button>
            </CardFooter>
        </Card>
    )
}
