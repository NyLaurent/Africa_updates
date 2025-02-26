"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

export default function MiniNav() {
  const pathname = usePathname()

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Africa Map", href: "/africa-map" },
    { label: "Politics", href: "/politics" },
    { label: "Video", href: "/video" },
    { label: "Push", href: "/push" },
    { label: "Business", href: "/business" },
    { label: "Sports", href: "/sports" },
    { label: "Technology", href: "/technology" },
    { label: "Entertainment", href: "/entertainment" },
  ]

  return (
    <div className="w-full  bg-white dark:bg-gray-900">
      <div className="border-b border-t dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <nav className="flex items-center overflow-x-auto no-scrollbar py-1 -mb-px max-w-full">
              {navItems.map((item) => {
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-5 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 mx-1 rounded-md",
                      isActive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400",
                    )}
                  >
                    {item.label}

                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 dark:bg-emerald-400 rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

