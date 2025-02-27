import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const comments = await prisma.comment.findMany({
            where: { postId: params.id },
            include: {
                user: {
                    select: {
                        displayName: true,
                        avatarUrl: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return Response.json(comments);
    } catch (error) {
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { content } = await req.json();

        const comment = await prisma.comment.create({
            data: {
                content,
                userId: user.id,
                postId: params.id,
            },
            include: {
                user: {
                    select: {
                        displayName: true,
                        avatarUrl: true,
                    },
                },
            },
        });

        return Response.json(comment);
    } catch (error) {
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
} 