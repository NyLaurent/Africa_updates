"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { Loader2, MessageCircle, ChevronRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import InfiniteScrollContainer from "@/components/InfiniteScrollContainer"
import { formatDistanceToNow } from "date-fns"
import kyInstance from "@/lib/ky"
import { PostData, PostsPage } from "@/lib/types"

export default function NewsFeed() {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ["news-feed"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/posts/latest",
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })

  const posts = data?.pages.flatMap((page) => page.posts) || []

  console.log(posts);

  if (status === "pending") {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-muted" />
            <CardContent className="h-32 mt-4" />
          </Card>
        ))}
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="text-center p-8">
        <p className="text-destructive">Failed to load news articles.</p>
      </div>
    )
  }

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        No news articles available.
      </p>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Latest Posts</h2>
          <InfiniteScrollContainer
            className="space-y-6"
            onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
          >
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </InfiniteScrollContainer>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Top News</h2>
          <div className="space-y-6">
            {posts.map((post) => (
              <Post key={post.id} post={post} featured={true} />
            ))}
          </div>
        </div>
      </div>

      {isFetchingNextPage && (
        <div className="flex justify-center mt-8">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </div>
  )
}

function Post({ post, featured = false }: { post: PostData; featured?: boolean }) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      {post.attachments?.[0]?.url && featured && (
        <div className="relative h-48 w-full">
          <Image src={post.attachments[0].url || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>AT</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">AfricaTeam</span>
          <span className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </span>
        </div>
        <Link href={`/article/${post.id}`} className="font-semibold hover:text-primary transition-colors">
          {post.title}
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-2">{post.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm text-muted-foreground">{post._count.comments} comments</span>
        </div>
        <Button variant="ghost" size="sm">
          Read more <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

