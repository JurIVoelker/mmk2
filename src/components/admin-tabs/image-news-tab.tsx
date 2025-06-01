"use client";
import { Card } from "../ui/card";
import type { ImageNews, NewsProvider } from "@prisma/client";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { Check, Edit, Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { putRequest } from "@/lib/requestUtils";

const ImageNewsTab = ({
  imageNews,
  providers,
}: {
  imageNews: ImageNews[];
  providers?: NewsProvider[];
}) => {
  return (
    <div className="space-y-4 pt-4">
      {imageNews && imageNews.length > 0 ? (
        imageNews.map((item) => (
          <ImageNewsItem
            key={item.id}
            imageNewsItem={item}
            providers={providers}
          />
        ))
      ) : (
        <p className="text-muted-foreground">No image news items available.</p>
      )}
    </div>
  );
};

export default ImageNewsTab;

const ImageNewsItem = ({
  imageNewsItem,
  providers,
}: {
  imageNewsItem: ImageNews;
  providers?: NewsProvider[];
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState(imageNewsItem.image);
  const [explanation, setExplanation] = useState(
    imageNewsItem.explaination || ""
  );
  const [isFake, setIsFake] = useState(imageNewsItem.isFake);
  const [source, setSource] = useState(imageNewsItem.source || "");
  const [providerId, setProviderId] = useState(imageNewsItem.providerId || "");

  const onSave = async () => {
    setIsLoading(true);
    const body = {
      id: imageNewsItem.id,
      type: "image",
      data: {
        image,
        explaination: explanation,
        isFake,
        source,
        providerId,
      },
    };

    const { error } = await putRequest("/api/news", body);

    if (error) {
      console.error("Failed to update image news:", error);
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
            <label className="text-sm font-medium mb-1 block">Image URL</label>
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              disabled={isLoading}
              placeholder="Image URL"
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

          <div>
            <label className="text-sm font-medium mb-1 block">
              Provider ID
            </label>
            <Select
              value={providerId}
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
                Image News {isFake ? "(Fake)" : ""}
              </h3>
              <div className="text-sm text-muted-foreground">
                Created: {formatDate(imageNewsItem.createdAt)}
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

          <div className="aspect-video size-30 overflow-hidden rounded-md">
            <img
              src={image || "/placeholder.svg"}
              alt="News image"
              className="size-30 object-cover"
            />
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
              {isFake ? "Fake Image" : "Authentic Image"}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
