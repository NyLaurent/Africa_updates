import { validateRequest } from "@/auth"
import SearchField from "@/components/SearchField"
import UserButton from "@/components/UserButton"
import prisma from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface NavbarProps {
  /**
   * Hide the login button when user is not authenticated
   * @default false
   */
  hideLoginButton?: boolean

  /**
   * Show advertisement instead of login button when user is not authenticated
   * @default false
   */
  showAdvert?: boolean

  /**
   * Advertisement image source URL
   * @default "/navbar-ad.webp"
   */
  advertImageSrc?: string

  /**
   * Advertisement image alt text
   * @default "Advertisement"
   */
  advertImageAlt?: string

  /**
   * Advertisement link URL
   * @default "#"
   */
  advertLink?: string

  /**
   * Advertisement image width
   * @default 200
   */
  advertWidth?: number

  /**
   * Advertisement image height
   * @default 50
   */
  advertHeight?: number
}

export default async function Navbar({
  hideLoginButton = false,
  showAdvert = false,
  advertImageSrc = "/myad.webp",
  advertImageAlt = "Advertisement",
  advertLink = "#",
  advertWidth = 1200,
  advertHeight = 50,
}: NavbarProps = {}) {
  const session = await validateRequest()
  const userInfo = await prisma.user.findUnique({
    where: { id: session.user?.id || "" },
  })

  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm dark:bg-gray-900">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-3">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          Africa Updates
        </Link>

        {/* Search Field */}
        <div className="order-last w-full sm:order-none sm:w-auto">
          <SearchField />
        </div>

        {/* User Actions */}
        {session.user ? (
          <div className="flex flex-wrap items-center gap-4 sm:ms-auto">
            {(userInfo?.role === "PUBLISHER" || userInfo?.role === "ADMIN") && (
              <Link
                href={"/posts/create"}
                className="rounded-full bg-primary px-6 py-2 text-sm font-bold text-primary-foreground sm:px-10"
              >
                Create Post
              </Link>
            )}
            {userInfo?.role === "USER" && (
              <Link href={"/posts/create"}>
                <Button variant="default" className="w-full sm:w-auto">
                  Create Post
                </Button>
              </Link>
            )}
            <UserButton />
          </div>
        ) : (
          <div className="w-full sm:w-auto sm:ms-auto">
            {showAdvert ? (
              <Link
                href={advertLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Image
                  src={advertImageSrc || "/placeholder.svg"}
                  alt={advertImageAlt}
                  width={advertWidth}
                  height={advertHeight}
                  className="h-auto w-full max-w-full object-contain sm:max-h-12 sm:w-auto"
                />
              </Link>
            ) : !hideLoginButton ? (
              <Link
                href={"/login"}
                className="block w-full rounded-full bg-primary px-6 py-2 text-center text-sm font-bold text-primary-foreground sm:w-auto sm:px-10"
              >
                Login
              </Link>
            ) : null}
          </div>
        )}
      </div>
    </header>
  )
}