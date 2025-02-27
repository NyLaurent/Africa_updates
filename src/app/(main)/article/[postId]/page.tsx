import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageCircle, Eye, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Comments from "./Comments";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: { postId: string };
}

export default async function ArticlePage({ params }: PageProps) {
  const { user } = await validateRequest();
  
  const post = await prisma.post.findUnique({
    where: { id: params.postId },
    include: {
      user: true,
      attachments: true,
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  const authorName = post.user.displayName || "Anonymous";
  const avatarFallback = authorName.charAt(0).toUpperCase();
  const avatarSrc = post.user.avatarUrl || "/placeholder-user.jpg";

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
              {post.category}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between py-4 border-y">
            <Link href={`/users/${post.user.username}`} className="flex items-center gap-3">
              <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                <AvatarImage src={avatarSrc} />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{authorName}</p>
                <p className="text-sm text-muted-foreground">@{post.user.username}</p>
              </div>
            </Link>
            
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        {post.attachments?.[0]?.url && (
          <div className="relative aspect-video w-full mb-8 rounded-xl overflow-hidden bg-muted">
            <Image
              src={post.attachments[0].url}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          {post.description && (
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {post.description}
            </p>
          )}
          <div 
            dangerouslySetInnerHTML={{ __html: post.body || "" }}
            className="break-words"
          />
        </div>

        {/* Engagement Stats */}
        <div className="flex items-center gap-6 text-muted-foreground py-6 border-t">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            <span>{post._count.comments} comments</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            <span>{post._count.likes} likes</span>
          </div>
        </div>

        {/* Comments Section */}
        <section className="mt-12">
          <Comments postId={post.id} />
        </section>
      </article>
    </main>
  );
} 