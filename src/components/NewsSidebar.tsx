"use client"

import Image from "next/image"
import RotatingAdBanner from "@/components/RotatingAdBanner"
import { useQuery } from "@tanstack/react-query"
import kyInstance from "@/lib/ky"
import type { Story, PostsPage } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import UserAvatar from "./UserAvatar"
import FollowButton from "./FollowButton"
import UserTooltip from "./UserTooltip"
import { useSession } from "@/app/(main)/SessionProvider"

interface NewsSidebarProps {
  ads: {
    id: string
    imageSrc: string
    link: string
    alt: string
  }[]
}

export default function NewsSidebar({ ads }: NewsSidebarProps) {
  const { user } = useSession()
  
  const { data: suggestedUsers = [] } = useQuery({
    queryKey: ["suggested-users"],
    queryFn: () => kyInstance.get("/api/users/suggested").json<any[]>(),
    enabled: !!user
  })

  const { data: stories = [] } = useQuery({
    queryKey: ["stories"],
    queryFn: () => kyInstance.get("/api/stories").json<Story[]>(),
  })

  const { data: latestPosts = [] } = useQuery({
    queryKey: ["latest-posts"],
    queryFn: async () => {
      const response = await kyInstance.get("/api/posts/latest").json<PostsPage>()
      return response.posts.slice(0, 2) // Get only the first 2 posts
    },
  })

  const { data: oldestPosts = [] } = useQuery({
    queryKey: ["oldest-posts"],
    queryFn: async () => {
      const response = await kyInstance.get("/api/posts/oldest").json<PostsPage>()
      return response.posts
    },
  })

  return (
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
          {stories.slice(0, 2).map((story) => (
            <NewsItem
              key={story.id}
              imageSrc={story.attachments?.url || ""}
              title={story.title}
              description={story.description}
              date={story.createdAt}
            />
          ))}
        </div>
      </div>

      {/* Who to Follow Card */}
      {user && suggestedUsers.length > 0 && (
        <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm dark:shadow-none">
          <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Who to Follow</h3>
          <div className="space-y-4 md:space-y-6">
            {suggestedUsers.slice(0, 3).map((suggestedUser) => (
              <div key={suggestedUser.id} className="flex items-center justify-between gap-3">
                <UserTooltip user={suggestedUser}>
                  <Link
                    href={`/users/${suggestedUser.username}`}
                    className="flex items-center gap-3"
                  >
                    <UserAvatar avatarUrl={suggestedUser.avatarUrl} className="flex-none" />
                    <div>
                      <p className="line-clamp-1 break-all font-semibold hover:underline">
                        {suggestedUser.displayName}
                      </p>
                      <p className="line-clamp-1 break-all text-muted-foreground">
                        @{suggestedUser.username}
                      </p>
                    </div>
                  </Link>
                </UserTooltip>
                <FollowButton
                  userId={suggestedUser.id}
                  initialState={{
                    followers: suggestedUser._count.followers,
                    isFollowedByUser: suggestedUser.followers.some(
                      ({ followerId }: { followerId: string }) => followerId === user.id
                    ),
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WhatsUp Card */}
      <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm dark:shadow-none">
        <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">WhatsUp</h3>
        <div className="space-y-4 md:space-y-6">
          {latestPosts.map((post) => (
            <NewsItem
              key={post.id}
              imageSrc={post.attachments?.[0]?.url || "/placeholder.jpg"}
              title={post.title}
              description={post.description}
              date={post.createdAt.toISOString()}
            />
          ))}
        </div>
      </div>

      {/* Most Popular Card */}
      <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm dark:shadow-none">
        <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Most Popular</h3>
        <div className="space-y-4 md:space-y-6">
          {oldestPosts.map((post) => (
            <NewsItem
              key={post.id}
              imageSrc={post.attachments?.[0]?.url || "/placeholder.jpg"}
              title={post.title}
              description={post.description}
              date={post.createdAt.toISOString()}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface NewsItemProps {
  imageSrc: string
  title: string
  description: string
  alt?: string
  date?: string
}

function NewsItem({ imageSrc, title, description, alt, date }: NewsItemProps) {
  // Strip HTML tags from description
  const cleanDescription = description?.replace(/<[^>]*>/g, '') || '';

  return (
    <div className="flex gap-3 md:gap-4">
      <div className="flex-shrink-0">
        <Image
          src={imageSrc}
          alt={alt || title}
          width={80}
          height={80}
          className="rounded-lg w-16 h-16 md:w-20 md:h-20 object-cover"
        />
      </div>
      <div className="min-w-0">
        <h4 className="font-medium text-base md:text-lg mb-1 line-clamp-2">{title}</h4>
        <p className="text-muted-foreground text-sm md:text-base line-clamp-2 mb-1">{cleanDescription}</p>
        {date && (
          <time className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(date), { addSuffix: true })}
          </time>
        )}
      </div>
    </div>
  )
} 