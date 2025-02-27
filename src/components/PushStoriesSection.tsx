"use client"

import { useQuery } from "@tanstack/react-query"
import kyInstance from "@/lib/ky"
import type { Story } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { stripHtml } from "@/lib/utils"

export default function PushStoriesSection() {
  const { data: stories = [] } = useQuery({
    queryKey: ["stories"],
    queryFn: () => kyInstance.get("/api/stories").json<Story[]>(),
  })

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm dark:shadow-none">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-semibold">Push</h3>
        <Link 
          href="/stories" 
          className="text-sm text-primary hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="space-y-4 md:space-y-6">
        {stories.slice(0, 2).map((story) => (
          <Link 
            key={story.id} 
            href={`/stories/${story.id}`}
            className="flex gap-3 md:gap-4 group hover:bg-accent/50 p-2 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0">
              <Image
                src={story.attachments?.[0]?.url || "/placeholder-image.jpg"}
                alt={story.title}
                width={80}
                height={80}
                className="rounded-lg w-16 h-16 md:w-20 md:h-20 object-cover"
              />
            </div>
            <div className="min-w-0">
              <h4 className="font-medium text-base md:text-lg mb-1 md:mb-2 line-clamp-2 group-hover:text-primary">
                {story.title}
              </h4>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <span>{story.user.displayName}</span>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(story.createdAt), { addSuffix: true })}</span>
              </div>
              <p className="text-muted-foreground text-sm md:text-base line-clamp-2 mt-1">
                {stripHtml(story.description)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 