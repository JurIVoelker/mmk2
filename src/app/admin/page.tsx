// import AddImageNews from "@/components/admin-tabs/add-image-news";
// import AddProvider from "@/components/admin-tabs/add-provider";
// import AddTextNews from "@/components/admin-tabs/add-text-news";
// import AddVideoNews from "@/components/admin-tabs/add-video-news";
// import ImageNewsTab from "@/components/admin-tabs/image-news-tab";
// import ProvidersTab from "@/components/admin-tabs/providers-tab";
// import TextNewsTab from "@/components/admin-tabs/text-news-tab";
// import VideoNewsTab from "@/components/admin-tabs/video-news-tab";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { prisma } from "@/prisma/prisma";

export const dynamic = "force-dynamic";

const AdminPage = async () => {
  // const providers = await prisma.newsProvider.findMany();
  // const imageNews = (await prisma.imageNews.findMany()).sort((a, b) =>
  //   a.createdAt > b.createdAt ? -1 : 1
  // );
  // const videoNews = (await prisma.videoNews.findMany()).sort((a, b) =>
  //   a.createdAt > b.createdAt ? -1 : 1
  // );
  // const textNews = (await prisma.textNews.findMany()).sort((a, b) =>
  //   a.createdAt > b.createdAt ? -1 : 1
  // );

  return <div>Currently deactivated</div>;

  // return (
  //   <div className="max-w-6xl mx-auto p-8 min-h-[100svh] h-full">
  //     <h1 className="text-2xl font-bold mb-8">Admin Page</h1>
  //     <Tabs defaultValue="providers">
  //       <TabsList className="bg-background h-auto -space-x-px p-0 shadow-xs rtl:space-x-reverse">
  //         <TabsTrigger
  //           value="providers"
  //           className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e px-4"
  //         >
  //           Providers
  //         </TabsTrigger>
  //         <TabsTrigger
  //           value="Text News"
  //           className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e px-4"
  //         >
  //           Text News
  //         </TabsTrigger>
  //         <TabsTrigger
  //           value="Image News"
  //           className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e px-4"
  //         >
  //           Image News
  //         </TabsTrigger>
  //         <TabsTrigger
  //           value="Video News"
  //           className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e px-4"
  //         >
  //           Video News
  //         </TabsTrigger>
  //       </TabsList>
  //       <TabsContent value="providers">
  //         <ProvidersTab providers={providers} />
  //         <AddProvider />
  //       </TabsContent>
  //       <TabsContent value="Text News">
  //         <AddTextNews providers={providers} />
  //         <TextNewsTab newsItems={textNews} providers={providers} />
  //       </TabsContent>
  //       <TabsContent value="Image News">
  //         <AddImageNews providers={providers} />
  //         <ImageNewsTab imageNews={imageNews} providers={providers} />
  //       </TabsContent>
  //       <TabsContent value="Video News">
  //         <AddVideoNews providers={providers} />
  //         <VideoNewsTab videoNews={videoNews} providers={providers} />
  //       </TabsContent>
  //     </Tabs>
  //   </div>
  // );
};

export default AdminPage;
