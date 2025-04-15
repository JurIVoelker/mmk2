'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Post } from "@/components/post"

interface PostData{
    id:number
    content:string
}

export default function Home() {
    const [input, setInput] = useState("")
    const [posts, setPosts] = useState<PostData[]>([])

    const handlePost = () => {
        if (input.trim() !== "") {
            const newPost: PostData = {
                id: Date.now(),
                content: input
            }
            setPosts([newPost, ...posts])
            setInput("")
        }
    }

    const handleDelete = (id: number) => {
        setPosts(posts.filter((post) => post.id !== id))
    }

    return (
        <div className="max-w-xl mx-auto p-4 space-y-4">
            <div className="flex gap-2">
                <Input
                    placeholder="Was möchtest du posten?"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button onClick={handlePost}>Posten</Button>
            </div>

            <div className="space-y-2">
                {posts.map((post) => (
                    <Post
                        key={post.id} content={post.content} onDelete={()=> handleDelete(post.id)}/>
                ))}
            </div>
        </div>
    )
}

