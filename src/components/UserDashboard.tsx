"use client"

import { format } from "date-fns"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Github } from "lucide-react"
import AdminPage from "./AdminPage"
import { User } from "lucia"

export default function DashboardLayout({userInfo}: {userInfo: User}) { 

  return (
    <div className="min-h-screen bg-background">
      <div className="">
        <div className="flex flex-row justify-between gap-8 p-6">
          
          {/* Centered Admin Page */}
          <div className="w-2/3">
            <AdminPage userInfo={userInfo} />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8 w-1/3 right-6">
            <div className="bg-card rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Advertisement</h3>
              <Image
                src="/myad.webp"
                alt="Advertisement"
                width={400}
                height={300}
                className="rounded-lg w-full"
              />
            </div>

            <div className="bg-card rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-6">Push</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Image
                    src="/luka.jpg"
                    alt="News thumbnail"
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium text-lg mb-2">Breaking News</h4>
                    <p className="text-muted-foreground">Latest updates on the current events...</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Image
                    src="/plant.webp"
                    alt="News thumbnail"
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium text-lg mb-2">Tech Update</h4>
                    <p className="text-muted-foreground">New features released for our platform...</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-6">WhatsUp</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Image
                    src="/luka.jpg"
                    alt="WhatsApp news"
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium text-lg mb-2">Community Update</h4>
                    <p className="text-muted-foreground">Join our WhatsApp group for daily updates...</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Image
                    src="/luka.jpg"
                    alt="WhatsApp news"
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium text-lg mb-2">Support Channel</h4>
                    <p className="text-muted-foreground">Get instant help via our WhatsApp support...</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-6">Most Popular</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Image
                    src="/plant.webp"
                    alt="Popular content"
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium text-lg mb-2">Top Story</h4>
                    <p className="text-muted-foreground">Most read article of the week...</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Image
                    src="/plant.webp"
                    alt="Popular content"
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium text-lg mb-2">Featured Post</h4>
                    <p className="text-muted-foreground">Editors pick of the day...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

