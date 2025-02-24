import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { BookmarkInfo } from "@/lib/types";

export async function GET(
  req: Request,
  { params: { postId } }: { params: { postId: string } },
) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

<<<<<<< HEAD
    // Use findFirst instead of findUnique if composite key isn't properly configured
    const bookmark = await prisma.bookmark.findFirst({
      where: {
        userId: loggedInUser.id,
        postId,
=======
    const bookmark = await prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId: loggedInUser.id,
          postId,
        },
>>>>>>> 03997ca83e92534005f18531b19b66bb8cadbee1
      },
    });

    const data: BookmarkInfo = {
      isBookmarkedByUser: !!bookmark,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params: { postId } }: { params: { postId: string } },
) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

<<<<<<< HEAD
    // Simplified upsert using create/delete pattern
    const existingBookmark = await prisma.bookmark.findFirst({
      where: {
        userId: loggedInUser.id,
        postId,
      },
    });

    if (!existingBookmark) {
      await prisma.bookmark.create({
        data: {
          userId: loggedInUser.id,
          postId,
        },
      });
    }

    return new Response(null, { status: 204 });
=======
    await prisma.bookmark.upsert({
      where: {
        userId_postId: {
          userId: loggedInUser.id,
          postId,
        },
      },
      create: {
        userId: loggedInUser.id,
        postId,
      },
      update: {},
    });

    return new Response();
>>>>>>> 03997ca83e92534005f18531b19b66bb8cadbee1
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params: { postId } }: { params: { postId: string } },
) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.bookmark.deleteMany({
      where: {
        userId: loggedInUser.id,
        postId,
      },
    });

<<<<<<< HEAD
    return new Response(null, { status: 204 });
=======
    return new Response();
>>>>>>> 03997ca83e92534005f18531b19b66bb8cadbee1
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 03997ca83e92534005f18531b19b66bb8cadbee1
