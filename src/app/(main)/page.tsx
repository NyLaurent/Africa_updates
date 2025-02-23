import PostEditor from "@/components/posts/editor/PostEditor";
import TrendsSidebar from "@/components/TrendsSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowingFeed from "./FollowingFeed";
import ForYouFeed from "./ForYouFeed";
import { validateRequest } from "@/auth";
import LatestFeed from "./LatestFeed";
import TrendingFeed from "./TrendingFeed";
import prisma from "@/lib/prisma"; // Import the new component
import AdminPage from "@/components/AdminPage";

export default async function Home() {
  const session = await validateRequest();
  const userInfo = await prisma.user.findUnique({
    where: { id: session.user?.id || "" }
  });

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        {userInfo?.role === "ADMIN" ? (
          <AdminPage /> // Show dashboard if user is admin
        ) : session.user ? (
          <Tabs defaultValue="for-you">
            <TabsList>
              <TabsTrigger value="for-you">For you</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
            <TabsContent value="for-you">
              <ForYouFeed />
            </TabsContent>
            <TabsContent value="following">
              <FollowingFeed />
            </TabsContent>
          </Tabs>
        ) : (
          <Tabs defaultValue="latest">
            <TabsList>
              <TabsTrigger value="latest">Latest Posts</TabsTrigger>
              <TabsTrigger value="trending">Top Trending Posts</TabsTrigger>
            </TabsList>
            <TabsContent value="latest">
              <LatestFeed />
            </TabsContent>
            <TabsContent value="trending">
              <TrendingFeed />
            </TabsContent>
          </Tabs>
        )}
      </div>
      {userInfo?.role === "ADMIN" && <TrendsSidebar />}
    </main>
  );
}
