"use client"

import { useState } from "react"
import { motion, type PanInfo, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
// import { CardContent } from "@/components/ui/card"
import { ImageContent } from "@/components/card-layouts/image-content"
import { TextContent } from "@/components/card-layouts/text-content"
import { VideoContent } from "@/components/card-layouts/video-content"
import GameActionButtons from "@/components/game-action-buttons"

const layout = "video"
const contentMap = {
    text: <TextContent src="./assets/image/test.jpg" />,
    image: <ImageContent src="./assets/image/test.jpg" />,
    video: <VideoContent src="./assets/video/test.mp4" />,
}

const initialNewsItems = [
    {
        id: 1,
        title: "Scientists Discover New Species in Amazon Rainforest",
        content: "A team of researchers has identified a previously unknown species of frog in the Amazon rainforest.",
        image: "",
    },
    {
        id: 2,
        title: "Tech Company Launches Revolutionary AI Assistant",
        content: "The new AI assistant can understand complex queries and provide human-like responses.",
        image: "",
    },
    {
        id: 3,
        title: "Global Climate Summit Reaches Historic Agreement",
        content: "World leaders have agreed to reduce carbon emissions by 50% by 2030 in a landmark climate deal.",
        image: "",
    },
    {
        id: 4,
        title: "New Study Shows Benefits of Mediterranean Diet",
        content: "Research confirms that following a Mediterranean diet can reduce the risk of heart disease by 30%.",
        image: "",
    },
    {
        id: 5,
        title: "Space Mission Successfully Lands on Mars",
        content: "The rover has begun collecting samples to search for signs of ancient microbial life.",
        image: "",
    },
]

type NewsItem = (typeof initialNewsItems)[0]

export default function NewsSwiper() {
    const [newsItems, setNewsItems] = useState<NewsItem[]>(initialNewsItems)
    const [realNews, setRealNews] = useState<NewsItem[]>([])
    const [fakeNews, setFakeNews] = useState<NewsItem[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const controls = useAnimation()
    const x = useMotionValue(0)
    const xInput = [-100, 0, 100]
    const opacityLeft = useTransform(x, xInput, [1, 0, 0])
    const opacityRight = useTransform(x, xInput, [0, 0, 1])

    const currentItem = newsItems[currentIndex]
    const hasMoreItems = currentIndex < newsItems.length

    const handleSwipe = async (direction: "left" | "right") => {
        if (!hasMoreItems) return

        if (direction === "right") {
            setRealNews([...realNews, currentItem])
            await controls.start({ x: "100%", opacity: 0, transition: { duration: 0.3 } })
        } else {
            setFakeNews([...fakeNews, currentItem])
            await controls.start({ x: "-100%", opacity: 0, transition: { duration: 0.3 } })
        }

        setCurrentIndex(currentIndex + 1)
        controls.set({ x: 0, opacity: 1 })
        x.set(0)
    }

    const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 100
        if (info.offset.x > threshold) {
            void handleSwipe("right")
        } else if (info.offset.x < -threshold) {
            void handleSwipe("left")
        } else {
            void controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } })
        }
    }

   /* const renderNewsList = (items: NewsItem[]) => {
        return items.length > 0? (
            <div className="space-y-4">
                {items.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                        <CardContent className="p-4">
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{item.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        ) : (
            <p className="text-center text-muted-foreground py-8">No items yet</p>
        )
    }*/

    return (
        <div className="w-full max-w-xl mx-auto pt-5">
            {hasMoreItems ? (
                <div className="relative h-[400px] w-full">
                    <motion.div
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={handleDragEnd}
                        animate={controls}
                        style={{ x }}
                        className="absolute w-full h-full"
                    >
                        <Card>{contentMap[layout]}</Card>

                        <div className="absolute inset-0 flex items-center justify-between pointer-events-auto px-4">
                            <motion.div
                                className="bg-red-500/80 text-white p-3 rounded-full transition-opacity duration-200"
                                style={{ opacity: opacityLeft }}
                            >
                                <X size={24} />
                            </motion.div>
                            <motion.div
                                className="bg-green-500/80 text-white p-3 rounded-full transition-opacity duration-200"
                                style={{ opacity: opacityRight }}
                            >
                                <Check size={24} />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            ) : (
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-2">No more news items!</h2>
                    <p className="text-muted-foreground mb-4">You&#39;ve categorized all the available news.</p>
                    <Button
                        onClick={() => {
                            setCurrentIndex(0)
                            setNewsItems([...initialNewsItems])
                            setRealNews([])
                            setFakeNews([])
                        }}
                    >
                        Reset News
                    </Button>
                </div>
            )}

            <div className="flex justify-around mt-4">
                {hasMoreItems ? (
                    <GameActionButtons
                        onClickFake={() => handleSwipe("left")}
                        onClickReal={() => handleSwipe("right")}
                    />
                ) : (
                    <>
                    </>
                )}
            </div>

            {/*<Tabs defaultValue="fake" className="w-full pt-2">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="fake">Fake News ({fakeNews.length})</TabsTrigger>
                    <TabsTrigger value="real">Real News ({realNews.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="fake" className="mt-4">
                    {renderNewsList(fakeNews)}
                </TabsContent>
                <TabsContent value="real" className="mt-4">
                    {renderNewsList(realNews)}
                </TabsContent>
            </Tabs>*/}
        </div>
    )
}
