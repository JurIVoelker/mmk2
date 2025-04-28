"use client"

import { useState } from "react"
import { motion, type PanInfo, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

// Sample news data
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

        const item = newsItems[currentIndex]

        if (direction === "right") {
            setRealNews([...realNews, item])
            await controls.start({ x: "100%", opacity: 0, transition: { duration: 0.3 } })
        } else {
            setFakeNews([...fakeNews, item])
            await controls.start({ x: "-100%", opacity: 0, transition: { duration: 0.3 } })
        }

        setCurrentIndex(currentIndex + 1)
        controls.set({ x: 0, opacity: 1 })
        x.set(0)
    }

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 100
        if (info.offset.x > threshold) {
            handleSwipe("right")
        } else if (info.offset.x < -threshold) {
            handleSwipe("left")
        } else {
            controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } })
        }
    }

    const renderNewsList = (items: NewsItem[]) => {
        return items.length > 0 ? (
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
    }

    return (
        <div className="w-full max-w-md mx-auto">
            {hasMoreItems ? (
                <div className="relative h-[400px] w-full mb-8">
                    <motion.div
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={handleDragEnd}
                        animate={controls}
                        style={{ x }}
                        className="absolute w-full h-full"
                    >
                        <Card className="w-full h-full overflow-hidden shadow-lg">
                            <div className="relative h-[200px] bg-muted">
                                <img
                                    src={currentItem.image || "/placeholder.svg"}
                                    alt={currentItem.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold mb-2">{currentItem.title}</h2>
                                <p className="text-muted-foreground">{currentItem.content}</p>
                            </CardContent>
                        </Card>

                        <div className="absolute inset-0 flex items-center justify-between pointer-events-none px-4">
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

                    <div className="absolute bottom-[-60px] left-0 right-0 flex justify-center gap-8">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full bg-red-100 hover:bg-red-200 border-red-200"
                            onClick={() => handleSwipe("left")}
                        >
                            <X className="h-6 w-6 text-red-500" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full bg-green-100 hover:bg-green-200 border-green-200"
                            onClick={() => handleSwipe("right")}
                        >
                            <Check className="h-6 w-6 text-green-500" />
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="text-center py-8 mb-8">
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

            <Tabs defaultValue="fake" className="w-full mt-12">
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
            </Tabs>
        </div>
    )
}
