"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInclude, getStoryDataInclude } from "@/lib/types";
import { createPollSchema, createPostSchema, createStorySchema } from "@/lib/validation";

export async function submitPost(input: {
  title: string;
  description: string;
  body: string;
  mediaIds: string[];
}) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const { title, description, body, mediaIds } = createPostSchema.parse(input);

  const newPost = await prisma.post.create({
    data: {
      title,
      description,
      body,
      userId: user.id,
      attachments: {
        connect: mediaIds.map((id) => ({ id })),
      },
    },
    include: getPostDataInclude(user.id),
  });

  return newPost;
}


export async function submitStory(input: {
  title: string;
  description: string;
  mediaId: string;
}) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  if (!input.mediaId) throw new Error("Please provide a file for the story")

  const { title, description, mediaId } = createStorySchema.parse(input);

  const newStory = await prisma.story.create({
    data: {
      title,
      description,
      userId: user.id,
      mediaId: mediaId
    },
    include: getStoryDataInclude(user.id),
  });

  return newStory;
}




export async function submitPoll(input: {
  title: string;
  description: string;
  options: string[];
}) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");
  
  // Check if input and options are valid
  if (!input || !input.options || input.options.length === 0) {
    throw new Error("Please provide options for the poll");
  }

  const { title, description, options } = createPollSchema.parse(input);

  const result = await prisma.$transaction(async (tx) => {
    const newPoll = await tx.post.create({
      data: {
        title,
        description,
        userId: user.id,
      },
      include: getPostDataInclude(user.id),
    });

    const pollOptions = options.map((opt) => ({
      title: opt,
      postId: newPoll.id,
    }));

    await tx.pollOption.createMany({ data: pollOptions });
    return newPoll;
  });

  return result;
}
