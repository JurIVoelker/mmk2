import AddImageNews from "@/components/admin-tabs/add-image-news";
import AddTextNews from "@/components/admin-tabs/add-text-news";
import AddVideoNews from "@/components/admin-tabs/add-video-news";
import ImageNewsTab from "@/components/admin-tabs/image-news-tab";
import ProvidersTab from "@/components/admin-tabs/providers-tab";
import TextNewsTab from "@/components/admin-tabs/text-news-tab";
import VideoNewsTab from "@/components/admin-tabs/video-news-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prisma } from "@/prisma/prisma";

const AdminPage = async () => {
  const providers = await prisma.newsProvider.findMany();
  const imageNews = await prisma.imageNews.findMany();
  const videoNews = await prisma.videoNews.findMany();
  const textNews = await prisma.textNews.findMany();

  return (
    <div className="max-w-6xl mx-auto p-8 min-h-screen h-full">
      <h1 className="text-2xl font-bold mb-8">Admin Page</h1>
      <Tabs defaultValue="providers">
        <TabsList className="bg-background h-auto -space-x-px p-0 shadow-xs rtl:space-x-reverse">
          <TabsTrigger
            value="providers"
            className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e"
          >
            Providers
          </TabsTrigger>
          <TabsTrigger
            value="Text News"
            className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e"
          >
            Text News
          </TabsTrigger>
          <TabsTrigger
            value="Image News"
            className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e"
          >
            Image News
          </TabsTrigger>
          <TabsTrigger
            value="Video News"
            className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e"
          >
            Video News
          </TabsTrigger>
        </TabsList>
        <TabsContent value="providers">
          <ProvidersTab providers={providers} />
        </TabsContent>
        <TabsContent value="Text News">
          <TextNewsTab newsItems={textNews} providers={providers} />
          <AddTextNews providers={providers} />
        </TabsContent>
        <TabsContent value="Image News">
          <ImageNewsTab imageNews={imageNews} />
          <AddImageNews />
        </TabsContent>
        <TabsContent value="Video News">
          <VideoNewsTab videoNews={videoNews} />
          <AddVideoNews />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
