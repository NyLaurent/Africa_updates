import { validateRequest } from "@/auth"
import SearchField from "@/components/SearchField"
import UserButton from "@/components/UserButton"
import prisma from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import RotatingAdBanner from "@/components/RotatingAdBanner"

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

  ads?: {
    id: string
    imageSrc: string
    link: string
    alt: string
  }[]
}

export default async function Navbar({
  hideLoginButton = false,
  showAdvert = false,
  ads = [
    {
      id: "1",
      imageSrc: "/myad.webp",
      link: "https://example.com/ad1",
      alt: "Advertisement 1",
    },
    {
      id: "2",
      imageSrc: "/luka.jpg",
      link: "",
      alt: "Special Offer Advertisement",
    },
    {
      id: "3",
      imageSrc: "/ad2.jpg",
      link: "",
      alt: "Limited Time Deal Advertisement",
    },
  ],
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
        <div className="flex flex-wrap items-center gap-4 sm:ms-auto">
          {session.user ? (
            <>
              {(userInfo?.role === "PUBLISHER" || userInfo?.role === "ADMIN") && (
                <Link
                  href={"/posts/create"}
                  className="rounded-full bg-primary px-6 py-2 text-sm font-bold text-primary-foreground sm:px-10"
                >
                  Create Post
                </Link>
              )}
              <UserButton />
            </>
          ) : (
            <div className="w-full sm:w-auto sm:ms-auto">
              {showAdvert ? (
                <div className="w-[300px]">
                  <RotatingAdBanner
                    ads={ads}
                    rotationInterval={5000}
                    width={300}
                    height={50}
                    className="w-full"
                  />
                </div>
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
      </div>
    </header>
  )
}