import TrendsSidebar from "@/components/TrendsSidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { validateRequest } from "@/auth"
import Image from "next/image"
import prisma from "@/lib/prisma"
import UserDashboard from "@/components/UserDashboard"
import NewsFeed from "@/components/newsFeed" // Import the NewsFeed component
import RotatingAdBanner from "@/components/RotatingAdBanner"

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

  const ads = [
    {
      id: "1",
      imageSrc: "/myad.webp",
      link: "https://example.com/ad1",
      alt: "Advertisement 1",
    },
    {
      id: "2",
      imageSrc: "/luka.jpg",
      link: "",
      alt: "Special Offer Advertisement",
    },
    {
      id: "3",
      imageSrc: "/ad2.jpg",
      link: "",
      alt: "Limited Time Deal Advertisement",
    },
  ]

  return (
    <main className="flex w-full min-w-0 flex-col lg:flex-row gap-5">
      <div className="w-full min-w-0 space-y-5">
        {userInfo?.role === "ADMIN" ? (
          userWithDefaultValues && <UserDashboard userInfo={userWithDefaultValues} />
        ) : session.user ? (
          <Tabs defaultValue="latest">
            {userWithDefaultValues && <UserDashboard userInfo={userWithDefaultValues} />}
          </Tabs>
        ) : (
          <Tabs defaultValue="latest" className="max-w-7xl mx-auto">
            <TabsList className="mb-4">
              <TabsTrigger value="latest"><span className="text-3xl">Latest News</span></TabsTrigger>
            </TabsList>
            <TabsContent value="latest">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-2/3">
                  <NewsFeed />
                </div>

                {/* Sidebar - stacks vertically on mobile, side by side on larger screens */}
                <div className="w-full lg:w-1/3 space-y-6 mt-6 lg:mt-[73px]">
                  {/* Advertisement Card */}
                  <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm dark:shadow-none">
                    <h3 className="text-lg md:text-xl font-semibold mb-4">Advertisement</h3>
                    <RotatingAdBanner
                      ads={ads}
                      rotationInterval={8000}
                      width={500}
                      height={300}
                      className="w-full rounded-md overflow-hidden"
                    />
                  </div>

                  {/* Push Card */}
                  <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm dark:shadow-none">
                    <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Push</h3>
                    <div className="space-y-4 md:space-y-6">
                      <div className="flex gap-3 md:gap-4">
                        <div className="flex-shrink-0">
                          <Image
                            src="/luka.jpg"
                            alt="News thumbnail"
                            width={80}
                            height={80}
                            className="rounded-lg w-16 h-16 md:w-20 md:h-20 object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-medium text-base md:text-lg mb-1 md:mb-2 line-clamp-2">Breaking News</h4>
                          <p className="text-muted-foreground text-sm md:text-base line-clamp-2">
                            Latest updates on the current events...
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 md:gap-4">
                        <div className="flex-shrink-0">
                          <Image
                            src="/plant.webp"
                            alt="News thumbnail"
                            width={80}
                            height={80}
                            className="rounded-lg w-16 h-16 md:w-20 md:h-20 object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-medium text-base md:text-lg mb-1 md:mb-2 line-clamp-2">Tech Update</h4>
                          <p className="text-muted-foreground text-sm md:text-base line-clamp-2">
                            New features released for our platform...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Card */}
                  <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm dark:shadow-none">
                    <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">WhatsUp</h3>
                    <div className="space-y-4 md:space-y-6">
                      <div className="flex gap-3 md:gap-4">
                        <div className="flex-shrink-0">
                          <Image
                            src="/luka.jpg"
                            alt="WhatsApp news"
                            width={80}
                            height={80}
                            className="rounded-lg w-16 h-16 md:w-20 md:h-20 object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-medium text-base md:text-lg mb-1 md:mb-2 line-clamp-2">
                            Community Update
                          </h4>
                          <p className="text-muted-foreground text-sm md:text-base line-clamp-2">
                            Join our WhatsApp group for daily updates...
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 md:gap-4">
                        <div className="flex-shrink-0">
                          <Image
                            src="/luka.jpg"
                            alt="WhatsApp news"
                            width={80}
                            height={80}
                            className="rounded-lg w-16 h-16 md:w-20 md:h-20 object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-medium text-base md:text-lg mb-1 md:mb-2 line-clamp-2">
                            Support Channel
                          </h4>
                          <p className="text-muted-foreground text-sm md:text-base line-clamp-2">
                            Get instant help via our WhatsApp support...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Most Popular Card */}
                  <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm dark:shadow-none">
                    <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Most Popular</h3>
                    <div className="space-y-4 md:space-y-6">
                      <div className="flex gap-3 md:gap-4">
                        <div className="flex-shrink-0">
                          <Image
                            src="/plant.webp"
                            alt="Popular content"
                            width={80}
                            height={80}
                            className="rounded-lg w-16 h-16 md:w-20 md:h-20 object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-medium text-base md:text-lg mb-1 md:mb-2 line-clamp-2">Top Story</h4>
                          <p className="text-muted-foreground text-sm md:text-base line-clamp-2">
                            Most read article of the week...
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 md:gap-4">
                        <div className="flex-shrink-0">
                          <Image
                            src="/plant.webp"
                            alt="Popular content"
                            width={80}
                            height={80}
                            className="rounded-lg w-16 h-16 md:w-20 md:h-20 object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-medium text-base md:text-lg mb-1 md:mb-2 line-clamp-2">Featured Post</h4>
                          <p className="text-muted-foreground text-sm md:text-base line-clamp-2">
                            Editors pick of the day...
                          </p>
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
    </main>
  )
}

