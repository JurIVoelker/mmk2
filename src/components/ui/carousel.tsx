"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)

    return () => {
      api?.off("select", onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative h-full", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
}

type ContentType = "image" | "video" | "newspaper"

type CarouselDirectionButtonProps = React.ComponentProps<typeof Button> & {
  currentContent: ContentType
  contentOrder: ContentType[]
  labelMap: Record<ContentType, string>
}

function CarouselPrevious({
                            className,
                            currentContent,
                            contentOrder,
                            labelMap,
                            ...props
                          }: CarouselDirectionButtonProps) {
  const { scrollPrev, canScrollPrev } = useCarousel()

  const currentIndex = contentOrder.indexOf(currentContent)
  const prevIndex = (currentIndex - 1 + contentOrder.length) % contentOrder.length
  const prevLabel = labelMap[contentOrder[prevIndex]]

  return (
      <div className="flex flex-col items-center">
        <button
            data-slot="carousel-previous"
            className={cn(
                "cursor-pointer rounded-full flex items-center justify-center",
                className
            )}
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            {...props}
        >
          <img src="/assets/icons/arrow-left-circle.svg" alt="Zurück" className="w-10 h-10"/>
          <span className="sr-only">Previous slide</span>
        </button>
        <span className="text-black mt-1">{prevLabel}</span>
      </div>
  )
}

function CarouselNext({
                        className,
                        currentContent,
                        contentOrder,
                        labelMap,
                        ...props
                      }: CarouselDirectionButtonProps) {
  const { scrollNext, canScrollNext } = useCarousel()

  const currentIndex = contentOrder.indexOf(currentContent)
  const nextIndex = (currentIndex + 1) % contentOrder.length
  const nextLabel = labelMap[contentOrder[nextIndex]]

  return (
      <div className="flex flex-col items-center">
        <button
            data-slot="carousel-next"
            className={cn(
                "cursor-pointer flex items-center justify-center",
                className
            )}
            disabled={!canScrollNext}
            onClick={scrollNext}
            {...props}
        >
          <img src="/assets/icons/arrow-right-circle.svg" alt="Weiter" className="w-10 h-10"/>
          <span className="sr-only">Next slide</span>
        </button>
        <span className="text-black mt-1">{nextLabel}</span>
      </div>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
