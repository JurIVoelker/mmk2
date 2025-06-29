"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteRequest } from "@/lib/requestUtils";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export function DeleteNewsButton({
  id,
  type,
}: {
  id: string;
  type: "text" | "video" | "image";
}) {
  const { refresh } = useRouter();

  const handleDelete = async () => {
    await deleteRequest(`/api/news?id=${id}&type=${type}`, {});
    refresh();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the news.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
