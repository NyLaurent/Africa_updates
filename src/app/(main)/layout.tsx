import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import MenuBar from "./MenuBar";
import Navbar from "./Navbar";
import SessionProvider from "./SessionProvider";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Github } from "lucide-react"
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  const socialLinks = [
    { icon: <Facebook className="h-6 w-6" />, href: "https://facebook.com" },
    { icon: <Twitter className="h-6 w-6" />, href: "https://twitter.com" },
    { icon: <Instagram className="h-6 w-6" />, href: "https://instagram.com" },
    { icon: <Linkedin className="h-6 w-6" />, href: "https://linkedin.com" },
    { icon: <Youtube className="h-6 w-6" />, href: "https://youtube.com" },
    { icon: <Github className="h-6 w-6" />, href: "https://github.com" },
  ]
  const today = format(new Date(), "MM/dd/yyyy")
  
  return (
    <SessionProvider value={{ user } as any}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="w-full justify-between flex flex-row gap-8 items-start p-3">
          <div className="flex-1 max-w-[70%]">
            <Image
              src="/myad.webp"
              alt="Advertisement"
              width={1200}
              height={90}
              className="w-full h-[100px] object-cover object-center"
            />
          </div>
          <div className="flex flex-col space-y-3 items-center">
            <div className="text-right space-y-2">
              {user ? (
                <div className="text-base">Username: {user.username}</div>
              ) : (
                 <Link
            href={"/login"}
            className="rounded-full bg-primary px-10 py-2 font-bold sm:ms-auto"
          >
            Login
          </Link>
              )}
              <div className="text-base">Date: {today}</div>
            </div>
            <div className="flex gap-4 items-start">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto flex w-full grow gap-5 p-5">
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
