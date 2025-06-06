"use client";
import { Card } from "../ui/card";
import type { NewsProvider, TextNews } from "@prisma/client";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { Check, Edit, Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { putRequest } from "@/lib/requestUtils";

const TextNewsTab = ({
  newsItems,
  providers,
}: {
  newsItems: TextNews[];
  providers: NewsProvider[];
}) => {
  return (
    <div className="space-y-4 pt-4">
      {newsItems && newsItems.length > 0 ? (
        newsItems.map((newsItem) => (
          <NewsItem
            key={newsItem.id}
            newsItem={newsItem}
            providers={providers}
          />
        ))
      ) : (
        <p className="text-muted-foreground">No news items available.</p>
      )}
    </div>
  );
};

export default TextNewsTab;

const NewsItem = ({
  newsItem,
  providers,
}: {
  newsItem: TextNews;
  providers: NewsProvider[];
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [date, setDate] = useState(newsItem.date);
  const [title, setTitle] = useState(newsItem.title);
  const [content, setContent] = useState(newsItem.content);
  const [category, setCategory] = useState(newsItem.category);
  const [explanation, setExplanation] = useState(newsItem.explaination || "");
  const [image, setImage] = useState(newsItem.image);
  const [source, setSource] = useState(newsItem.source || "");
  const [providerId, setProviderId] = useState(newsItem.providerId);
  const [isFake, setIsFake] = useState(newsItem.isFake);

  const onSave = async () => {
    setIsLoading(true);
    const body = {
      id: newsItem.id,
      type: "text",
      data: {
        content,
        explaination: explanation,
        isFake,
        source,
        providerId,
        date: date.toISOString(),
        title,
        category,
        image,
      },
    };

    const { error } = await putRequest("/api/news", body);

    if (error) {
      console.error("Failed to update text news:", error);
      setIsLoading(false);
      return;
    } else {
      setIsEditing(false);
    }
    setIsLoading(false);
  };

  const formatDate = (date: Date) => {
    return format(new Date(date), "yyyy-MM-dd");
  };

  return (
    <Card className="p-4 rounded-md">
      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Date</label>
              <Input
                type="date"
                value={formatDate(date)}
                onChange={(e) => setDate(new Date(e.target.value))}
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Category</label>
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isLoading}
                placeholder="Category"
              />
            </div>
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
            <label className="text-sm font-medium mb-1 block">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
              placeholder="Title"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Content</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isLoading}
              placeholder="Content"
              rows={4}
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
            <label className="text-sm font-medium mb-1 block">Image URL</label>
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              disabled={isLoading}
              placeholder="Image URL"
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

          <div>
            <label className="text-sm font-medium mb-1 block">
              Provider ID
            </label>
            <Select
              value={providerId || ""}
              onValueChange={setProviderId}
              disabled={isLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                {providers.map((provider) => (
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
        <div className="space-y-4 relative flex gap-4">
          <Button
            onClick={() => setIsEditing(true)}
            size="icon"
            variant="ghost"
            className="absolute top-0 right-0 z-10"
          >
            <Edit />
          </Button>
          {image && (
            <div className="aspect-video size-30 overflow-hidden rounded-md">
              <img
                src={image || "/placeholder.svg"}
                alt={title}
                className="size-30 object-cover"
              />
            </div>
          )}
          <div>
            <h3 className="font-bold mb-1">{title}</h3>
            <div className="text-sm line-clamp-3 text-muted-foreground mb-2">
              {content}
            </div>

            {explanation && (
              <div className="mb-2">
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
                {isFake ? "Fake News" : "Real News"}
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
