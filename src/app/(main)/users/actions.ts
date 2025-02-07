"use server"
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { PublisherRequest } from "@prisma/client";


export async function approveBecomePublisher({ request, action }: { request: PublisherRequest, action: "approve" | "reject" }) {
    const { user } = await validateRequest()
    const userInfo = await prisma.user.findUnique({
        where: { id: user?.id }
    });
    if (!user) throw new Error("Unauthorized");
    if (userInfo?.role != "ADMIN") throw new Error("Unauthorized");



    await prisma.$transaction(async (tx) => {
        await tx.publisherRequest.update({
            where: { id: request.id },
            data: {
                status: action == "approve" ? "APPROVED" : "REJECTED",
            },
        });
        if (action == "approve") {
            await tx.user.update({
                where: { id: request.userId },
                data: { role: "PUBLISHER" }
            })
        }
        await tx.notification.create({
            data: {
                recipientId: request.userId,
                issuerId: user.id,
                type: "BECOME_PUBLISHER",
                body: `Your request to become a publisher has been ${action == "approve" ? "APPROVED" : "REJECTED"}.`,
                read: false,
            },
        });
        return true;
    });

}