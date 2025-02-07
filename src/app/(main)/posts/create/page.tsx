import PostEditor from '@/components/posts/editor/PostEditor'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StoryEditor from '@/components/posts/editor/StoryEditor';

const Page = () => {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <Tabs defaultValue="article">
          <TabsList>
            <TabsTrigger value="article">Article</TabsTrigger>
            <TabsTrigger value="story">Story</TabsTrigger>
            <TabsTrigger value="poll">Poll</TabsTrigger>
          </TabsList>
          <TabsContent value="article">
            <PostEditor />
          </TabsContent>
          <TabsContent value="story">
            <StoryEditor />
          </TabsContent>
          <TabsContent value="poll">
            <StoryEditor />
          </TabsContent>
        </Tabs>

      </div>
    </main>
  )
}

export default Page
