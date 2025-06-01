"use client";
import { Card } from "../ui/card";
import type { VideoNews } from "@prisma/client";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { Check, Edit, Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

import { putRequest } from "@/lib/requestUtils";

const VideoNewsTab = ({ videoNews }: { videoNews: VideoNews[] }) => {
  return (
    <div className="space-y-4 pt-4">
      {videoNews && videoNews.length > 0 ? (
        videoNews.map((item) => (
          <VideoNewsItem key={item.id} videoNewsItem={item} />
        ))
      ) : (
        <p className="text-muted-foreground">No video news items available.</p>
      )}
    </div>
  );
};

export default VideoNewsTab;

const VideoNewsItem = ({ videoNewsItem }: { videoNewsItem: VideoNews }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [video, setVideo] = useState(videoNewsItem.video);
  const [explanation, setExplanation] = useState(
    videoNewsItem.explaination || ""
  );
  const [isFake, setIsFake] = useState(videoNewsItem.isFake);
  const [source, setSource] = useState(videoNewsItem.source || "");

  const onSave = async () => {
    setIsLoading(true);
    const body = {
      id: videoNewsItem.id,
      type: "video",
      data: {
        video,
        explaination: explanation,
        isFake,
        source,
      },
    };

    const { error } = await putRequest("/api/news", body);

    if (error) {
      console.error("Failed to update video news:", error);
      setIsLoading(false);
      return;
    } else {
      setIsEditing(false);
    }
    setIsLoading(false);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Card className="p-4 rounded-md">
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Video URL</label>
            <Input
              value={video}
              onChange={(e) => setVideo(e.target.value)}
              disabled={isLoading}
              placeholder="Video URL"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              Explanation
            </label>
            <Textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              disabled={isLoading}
              placeholder="Explanation"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Source</label>
            <Input
              value={source}
              onChange={(e) => setSource(e.target.value)}
              disabled={isLoading}
              placeholder="Source"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="fake-switch"
              checked={isFake}
              onCheckedChange={setIsFake}
              disabled={isLoading}
            />
            <Label htmlFor="fake-switch">Is Fake</Label>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={onSave}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg">
                Video News {isFake ? "(Fake)" : ""}
              </h3>
              <div className="text-sm text-muted-foreground">
                Created: {formatDate(videoNewsItem.createdAt)}
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(true)}
              size="icon"
              variant="ghost"
            >
              <Edit />
            </Button>
          </div>

          <div className="aspect-video size-60 overflow-hidden rounded-md">
            <video
              src={video}
              controls
              className="object-cover"
              poster="/placeholder.svg?height=480&width=640"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {explanation && (
            <div>
              <p className="text-sm font-medium">Explanation:</p>
              <p className="text-sm text-muted-foreground">{explanation}</p>
            </div>
          )}

          {source && (
            <div className="text-xs text-muted-foreground">
              Source: {source}
            </div>
          )}

          <div className="flex items-center space-x-2">
            <div
              className={`text-sm ${
                isFake ? "text-red-500" : "text-green-500"
              } font-medium`}
            >
              {isFake ? "Fake Video" : "Authentic Video"}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
