import { validateRequest } from "@/auth";
import BecomePublisherButton from "@/components/navbar/BecomePublisherButton";
import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Navbar() {
  const session = await validateRequest();
  const userInfo = await prisma.user.findUnique({
    where: { id: session.user?.id || "" },
  });
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 px-5 py-3">
        <Link href="/" className="text-2xl font-bold text-primary">
          Africa Updates
        </Link>
        <SearchField />
        {session.user ? (
          <div className="flex items-center gap-4 sm:ms-auto">
            {userInfo?.role === "PUBLISHER" && (
              <Link
                href={"/posts/create"}
                className="rounded-full bg-primary px-10 py-2 font-bold"
              >
                Create Post
              </Link>
            )}
            {userInfo?.role === "USER" && (
              <div className="flex flex-row items-center">
                <div className="mr-3">
                  <Link href={"/posts/create"}>
                    <Button variant="default">Create Post</Button>
                  </Link>
                </div>
                <div>
                  <BecomePublisherButton user={userInfo as any} />
                </div>
              </div>
            )}
            {userInfo?.role === "ADMIN" && (
              <Link
                href={"/posts/create"}
                className="rounded-full bg-primary px-10 py-2 font-bold text-black"
              >
                Create Post
              </Link>
            )}
            <UserButton className="" />
          </div>
        ) : (
          <Link
            href={"/login"}
            className="rounded-full bg-primary px-10 py-2 font-bold sm:ms-auto"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
