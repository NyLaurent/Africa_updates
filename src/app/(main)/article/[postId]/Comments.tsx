"use client";

import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "@/app/(main)/SessionProvider";
import { useState } from "react";
import kyInstance from "@/lib/ky";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LogIn } from "lucide-react";
import Link from "next/link";

interface CommentsProps {
  postId: string;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    displayName: string;
    avatarUrl: string | null;
  };
}

export default function Comments({ postId }: CommentsProps) {
  const { user } = useSession();
  const [newComment, setNewComment] = useState("");

  const { data: comments, refetch } = useQuery<Comment[]>({
    queryKey: ["comments", postId],
    queryFn: () => 
      kyInstance.get(`/api/posts/${postId}/comments`).json(),
  });

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    await kyInstance.post(`/api/posts/${postId}/comments`, {
      json: { content: newComment },
    });

    setNewComment("");
    refetch();
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold border-b pb-4">Comments</h2>
      
      {/* Comment Form - Only show if logged in */}
      {user ? (
        <div className="space-y-4 bg-card p-6 rounded-lg border">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatarUrl || undefined} />
              <AvatarFallback>{user.displayName?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">Comment as {user.displayName}</span>
          </div>
          <Textarea
            placeholder="What are your thoughts?"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <div className="flex justify-end">
            <Button 
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
            >
              Post Comment
            </Button>
          </div>
        </div>
      ) : (
        <Alert>
          <AlertDescription className="flex items-center justify-between">
            <span>Sign in to leave a comment</span>
            <Button asChild variant="outline">
              <Link href="/login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Sign In
              </Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments?.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No comments yet. Be the first to comment!</p>
        ) : (
          comments?.map((comment) => (
            <div key={comment.id} className="flex gap-4 bg-card/50 p-6 rounded-lg">
              <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                <AvatarImage src={comment.user.avatarUrl || undefined} />
                <AvatarFallback>{comment.user.displayName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.user.displayName}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground prose-sm max-w-none break-words">
                  {comment.content}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 