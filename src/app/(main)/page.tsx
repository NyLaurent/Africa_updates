import TrendsSidebar from "@/components/TrendsSidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { validateRequest } from "@/auth"
import Image from "next/image"
import prisma from "@/lib/prisma"
import UserDashboard from "@/components/UserDashboard"
import NewsFeed from "@/components/newsFeed" // Import the NewsFeed component

export default async function Home() {
  const session = await validateRequest()
  const userInfo = await prisma.user.findUnique({
    where: { id: session.user?.id || "" },
  })

  const userWithDefaultValues = userInfo
    ? {
        ...userInfo,
        hasPaid: userInfo.hasPaid ?? false,
      }
    : null

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        {userInfo?.role === "ADMIN" ? (
          userWithDefaultValues && <UserDashboard userInfo={userWithDefaultValues} />
        ) : session.user ? (
          <Tabs defaultValue="latest">
            {userWithDefaultValues && <UserDashboard userInfo={userWithDefaultValues} />}
          </Tabs>
        ) : (
          <Tabs defaultValue="latest">
            <TabsList>
              <TabsTrigger value="latest">Latest News</TabsTrigger>
            </TabsList>
            <TabsContent value="latest">
              <div className="flex flex-row gap-4">
              <NewsFeed />
              <div className="space-y-8 w-1/3 mt-[73px] right-6">
            <div className="bg-card rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Advertisement</h3>
              <Image
                src="/myad.webp"
                alt="Advertisement"
                width={400}
                height={300}
                className="rounded-lg w-full"
              />
            </div>

            <div className="bg-card rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-6">Push</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Image
                    src="/luka.jpg"
                    alt="News thumbnail"
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium text-lg mb-2">Breaking News</h4>
                    <p className="text-muted-foreground">Latest updates on the current events...</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Image
                    src="/plant.webp"
                    alt="News thumbnail"
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium text-lg mb-2">Tech Update</h4>
                    <p className="text-muted-foreground">New features released for our platform...</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-6">WhatsApp</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Image
                    src="/luka.jpg"
                    alt="WhatsApp news"
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium text-lg mb-2">Community Update</h4>
                    <p className="text-muted-foreground">Join our WhatsApp group for daily updates...</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Image
                    src="/luka.jpg"
                    alt="WhatsApp news"
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium text-lg mb-2">Support Channel</h4>
                    <p className="text-muted-foreground">Get instant help via our WhatsApp support...</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-6">Most Popular</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Image
                    src="/plant.webp"
                    alt="Popular content"
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium text-lg mb-2">Top Story</h4>
                    <p className="text-muted-foreground">Most read article of the week...</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Image
                    src="/plant.webp"
                    alt="Popular content"
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium text-lg mb-2">Featured Post</h4>
                    <p className="text-muted-foreground">Editors pick of the day...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
      {userInfo?.role === "ADMIN" && <TrendsSidebar />}
    </main>
  )
}

