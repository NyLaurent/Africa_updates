import UserAvatar from "@/components/UserAvatar";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import ApproveBecomePublisherButton from "./ApproveBecomePublisherButton";

<<<<<<< HEAD
import UserRequestItem from "./userRequestApproval";

=======
>>>>>>> 03997ca83e92534005f18531b19b66bb8cadbee1
async function getPublishersRequest(limit?: number) {
    return await prisma.publisherRequest.findMany({
        take: limit,
        include: { user: true },
        orderBy: {
            requestedAt: "desc",
        },
    });
}

<<<<<<< HEAD

export default async function PublishersRequests() {
  const headersList = headers();
  const url = headersList.get("referer") || "";
  const showAll = url.includes("/publishers-request");

  const requests = await getPublishersRequest(showAll ? undefined : 5);

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Publishers Requests</h2>
        {!showAll && (
          <Link
            href={"/users/publishers-request"}
            className="text-blue-500 underline"
          >
            View More
          </Link>
        )}
      </div>
      <div className="space-y-4">
        {requests.map((request) => (
          <UserRequestItem key={request.id} request={request} />
        ))}
      </div>
    </div>
  );
}

=======
export default async function PublishersRequests() {
    const headersList = headers();
    const url = headersList.get('referer') || "";
    const showAll = url.includes("/publishers-request");

    const requests = await getPublishersRequest(showAll ? undefined : 5);

    return (
        <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Publishers Requests</h2>
                {!showAll && (
                    <Link
                        href={"/users/publishers-request"}
                        // onClick={() => window.location.href = "/publishers-request"}
                        className="text-blue-500 underline"
                    >
                        View More
                    </Link>
                )}
            </div>
            <div className="space-y-4">
                {requests.map((request) => (
                    <div key={request.id} className="border-b pb-4">
                        <Link
                            href={`/users/${request.user.username}`}
                            className="flex items-center justify-between gap-3"
                        >
                            <div className="flex items-center gap-3">
                                <UserAvatar avatarUrl={request.user.avatarUrl} className="flex-none" />
                                <div>
                                    <p className="line-clamp-1 break-all font-semibold hover:underline">
                                        {request.user.displayName}
                                    </p>
                                    <p className="line-clamp-1 break-all text-muted-foreground">
                                        @{request.user.username}
                                    </p>
                                </div>
                            </div>
                            <ApproveBecomePublisherButton request={request as any} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
>>>>>>> 03997ca83e92534005f18531b19b66bb8cadbee1
