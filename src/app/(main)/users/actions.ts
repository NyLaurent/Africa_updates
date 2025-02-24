<<<<<<< HEAD
"use server";
=======
"use server"
>>>>>>> 03997ca83e92534005f18531b19b66bb8cadbee1
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { PublisherRequest } from "@prisma/client";

<<<<<<< HEAD
export async function approveBecomePublisher({
    request,
    action,
    message, // Added message parameter
}: { 
    request: PublisherRequest; 
    action: "approve" | "reject"; 
    message: string; 
}) {
    const { user } = await validateRequest();
    if (!user) throw new Error("Unauthorized");

    const userInfo = await prisma.user.findUnique({
        where: { id: user.id },
    });

    if (userInfo?.role !== "ADMIN") throw new Error("Unauthorized");

    await prisma.$transaction(async (tx) => {
        // Update the publisher request with status and message
        await tx.publisherRequest.update({
            where: { id: request.id },
            data: {
                status: action === "approve" ? "APPROVED" : "REJECTED",
                message, // Store the message
            } as PublisherRequest, // Add type assertion
        });

        // If approved, update user role to "PUBLISHER"
        if (action === "approve") {
            await tx.user.update({
                where: { id: request.userId },
                data: { role: "PUBLISHER" },
            });
        }

        // Send notification to the user
=======

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
>>>>>>> 03997ca83e92534005f18531b19b66bb8cadbee1
        await tx.notification.create({
            data: {
                recipientId: request.userId,
                issuerId: user.id,
                type: "BECOME_PUBLISHER",
<<<<<<< HEAD
                body: `Your request to become a publisher has been ${action === "approve" ? "APPROVED" : "REJECTED"}. Message: "${message}"`, // Include message
                read: false,
            },
        });

        return true;
    });
}
=======
                body: `Your request to become a publisher has been ${action == "approve" ? "APPROVED" : "REJECTED"}.`,
                read: false,
            },
        });
        return true;
    });

}
>>>>>>> 03997ca83e92534005f18531b19b66bb8cadbee1
