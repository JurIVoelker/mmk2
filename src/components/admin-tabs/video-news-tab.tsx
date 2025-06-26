"use client";
import { Card } from "../ui/card";
import type { NewsProvider, VideoNews } from "@prisma/client";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { Check, Edit, Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

import { putRequest } from "@/lib/requestUtils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DeleteNewsButton } from "./confirm-delete-dialog";

const VideoNewsTab = ({
  videoNews,
  providers,
}: {
  videoNews: VideoNews[];
  providers: NewsProvider[];
}) => {
  return (
    <div className="space-y-4 pt-4">
      {videoNews && videoNews.length > 0 ? (
        videoNews.map((item) => (
          <VideoNewsItem
            key={item.id}
            videoNewsItem={item}
            providers={providers}
          />
        ))
      ) : (
        <p className="text-muted-foreground">No video news items available.</p>
      )}
    </div>
  );
};

export default VideoNewsTab;

const VideoNewsItem = ({
  videoNewsItem,
  providers,
}: {
  videoNewsItem: VideoNews;
  providers: NewsProvider[];
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [video, setVideo] = useState(videoNewsItem.video);
  const [explanation, setExplanation] = useState(
    videoNewsItem.explaination || ""
  );
  const [providerId, setProviderId] = useState(videoNewsItem.providerId);
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
        providerId,
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

          <Select
            value={providerId || undefined}
            onValueChange={setProviderId}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              {providers?.map((provider) => (
                <SelectItem key={provider.id} value={provider.id}>
                  {provider.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex justify-end gap-4 items-center">
            <DeleteNewsButton id={videoNewsItem.id} type={"video"} />
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
        <div className="space-y-4 relative flex gap-4">
          <div className="flex items-center justify-end absolute top-0 right-0 z-10">
            <Button
              onClick={() => setIsEditing(true)}
              size="icon"
              variant="ghost"
            >
              <Edit />
            </Button>
          </div>
          <div className="size-30 overflow-hidden rounded-md bg-gray-200 shrink-0">
            <video src={video} controls className="object-cover">
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="pr-9">
            {explanation && (
              <div className="mb-2">
                <p className="text-sm font-medium mb-1">Explanation:</p>
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
                {isFake ? "Fake" : "Real"}
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
