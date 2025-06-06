"use client";
import { Card } from "../ui/card";
import { NewsProvider } from "@prisma/client";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { Check, Edit, Loader2 } from "lucide-react";
import { putRequest } from "@/lib/requestUtils";

const ProvidersTab = ({ providers }: { providers: NewsProvider[] }) => {
  return (
    <div className="space-y-4 pt-4">
      {providers.length > 0 ? (
        providers.map((provider) => (
          <ProviderItem key={provider.id} provider={provider} />
        ))
      ) : (
        <p className="text-muted-foreground">No providers available.</p>
      )}
    </div>
  );
};

export default ProvidersTab;

const ProviderItem = ({ provider }: { provider: NewsProvider }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(provider.name);
  const [imageUrl, setImageUrl] = useState(provider.image || "");

  const onSave = async () => {
    setIsLoading(true);
    const body = {
      id: provider.id,
      data: {
        name,
        image: imageUrl,
      },
    };

    const { error } = await putRequest("/api/provider", body);

    if (error) {
      console.error("Failed to provider:", error);
      setIsLoading(false);
      return;
    } else {
      setIsEditing(false);
    }
    setIsLoading(false);
  };

  return (
    <Card className="p-4 rounded-md flex flex-row items-center justify-between">
      {isEditing && (
        <>
          <div className="flex flex-col gap-2 flex-1">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              placeholder="Provider name"
            />
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              disabled={isLoading}
              placeholder="Image URL"
            />
          </div>
          <Button
            onClick={onSave}
            size="icon"
            variant="ghost"
            disabled={isLoading}
          >
            {!isLoading && <Check />}
            {isLoading && <Loader2 className="animate-spin" />}
          </Button>
        </>
      )}
      {!isEditing && (
        <>
          <div className="flex items-center gap-4 flex-1">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={name}
                className="w-10 h-10 object-cover rounded"
              />
            )}
            <p className="inline">{name}</p>
          </div>
          <Button
            onClick={() => setIsEditing(true)}
            size="icon"
            variant="ghost"
          >
            <Edit />
          </Button>
        </>
      )}
    </Card>
  );
};
