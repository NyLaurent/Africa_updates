"use client"

import Image from "next/image"
import RotatingAdBanner from "@/components/RotatingAdBanner"
import { useQuery } from "@tanstack/react-query"
import kyInstance from "@/lib/ky"
import type { Story, PostsPage, PostData } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import UserAvatar from "./UserAvatar"
import FollowButton from "./FollowButton"
import UserTooltip from "./UserTooltip"
import { useSession } from "@/app/(main)/SessionProvider"
import { Heart } from "lucide-react"

interface Attachment {
  url: string;
  type: string;
  id?: string;
  createdAt?: Date;
  postId?: string | null;
}

interface NewsSidebarProps {
  ads: {
    id: string
    imageSrc: string
    link: string
    alt: string
  }[]
}

function StoryItem({ post }: { post: Story & { attachments?: Array<{ url: string; type: string }> } }) {
  return (
    <Link href={`/article/${post.id}`} className="group block">
      <div className="flex gap-3 items-start">
        <div className="relative w-20 h-20 flex-shrink-0">
          <Image
            src={post.attachments?.[0]?.url || '/placeholder.jpg'}
            alt={post.title}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h4>
          <time className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(post.createdAt))} ago
          </time>
        </div>
      </div>
    </Link>
  );
}

interface NewsItemProps {
  post: PostData | Story;
}

function NewsItem({ post }: NewsItemProps) {
  const isStory = 'attachments' in post; // Check if it's a story
  return (
    <Link href={`/stories/${post.id}`} className="group block">
      <div className="flex gap-3 items-start">
        {isStory && post.attachments?.length > 0 && (
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image
              src={post.attachments[0]?.url || '/placeholder.jpg'}
              alt={post.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}
        <div className="flex-1">
          <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h4>
          <time className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(post.createdAt))} ago
          </time>
        </div>
      </div>
    </Link>
  );
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

  const { data: popularPosts = [], isLoading } = useQuery({
    queryKey: ["popular-posts"],
    queryFn: async () => {
      const response = await kyInstance.get("/api/posts/popular-sidebar").json<PostData[]>();
      return response;
    },
  })

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

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
            <NewsItem key={story.id} post={story} />
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
            <NewsItem key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Most Popular Card */}
      <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm dark:shadow-none">
        <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Most Popular</h3>
        <div className="space-y-4 md:space-y-6">
          {popularPosts.map((post) => (
            <NewsItem key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
} 