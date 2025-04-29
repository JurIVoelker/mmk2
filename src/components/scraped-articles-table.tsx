"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Article } from "@/app/scraper/page";

export default function ScrapedArticlesTable({
  items,
  onConfirm,
}: {
  items: Article[];
  onConfirm: (selectedAricles: Article[]) => void;
}) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, items]);

  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (
      selectedRows.length === filteredItems.length &&
      filteredItems.length > 0
    ) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredItems.map((item) => item.id));
    }
  };

  const handleSubmit = () => {
    const selectedArticles = items.filter((item) =>
      selectedRows.includes(item.id)
    );
    if (selectedArticles) onConfirm(selectedArticles);
  };

  return (
    <div className="flex flex-col relative">
      {/* Sticky header with search and submit button */}
      <div className="sticky top-0 z-30 bg-background p-4 border rounded-md flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Nach Titeln suchen..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={handleSubmit} disabled={selectedRows.length === 0}>
          Ausgewählte Scrapen
        </Button>
      </div>
      <div className="h-8 w-full sticky z-20 top-16 bg-gradient-to-b from-background/60 to-background/0" />
      <div className="bg-background overflow-hidden rounded-md border relative">
        <div className="overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 z-10">
              <TableRow className="bg-muted/50">
                <TableHead className="h-9 py-2 w-[50px]">
                  <Checkbox
                    checked={
                      selectedRows.length === filteredItems.length &&
                      filteredItems.length > 0
                    }
                    // @ts-expect-error idk
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < filteredItems.length
                    }
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead className="h-9 py-2">Titel</TableHead>
                <TableHead className="h-9 py-2">Kategorie</TableHead>
                <TableHead className="h-9 py-2">Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <TableRow
                    key={item.id}
                    className={
                      selectedRows.includes(item.id) ? "bg-muted/20" : ""
                    }
                  >
                    <TableCell className="py-2">
                      <Checkbox
                        checked={selectedRows.includes(item.id)}
                        onCheckedChange={() => handleSelectRow(item.id)}
                        aria-label={`Select ${item.title}`}
                      />
                    </TableCell>
                    <TableCell className="py-2 font-medium max-w-[35rem] overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.title}
                    </TableCell>
                    <TableCell className="py-2 max-w-[7rem] overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.category}
                    </TableCell>
                    <TableCell className="py-2">
                      <Link
                        href={item.link}
                        target="_blank"
                        className="text-primary hover:underline"
                      >
                        Link
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    Keine Artikel gefunden
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <p className="text-muted-foreground mt-4 text-center text-sm">
        {filteredItems.length > 0
          ? `Es werden ${filteredItems.length} von ${items.length} Artikel angezeigt`
          : "No matching items found"}
      </p>
    </div>
  );
}
