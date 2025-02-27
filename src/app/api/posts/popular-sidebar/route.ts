import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const posts = await prisma.post.findMany({
            take: 5, // Limit to 5 posts for the sidebar
            include: {
                attachments: true,
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                    },
                },
            },
            orderBy: {
                likes: {
                    _count: 'desc'
                },
            },
        });

        return Response.json(posts);
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
} 