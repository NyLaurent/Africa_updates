import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mail, Settings, Users, MessageSquare, BookOpen, History, Send, ExternalLink, BrickWallIcon } from 'lucide-react';

const AdminPage = () => {
  return (
    <div className="min-h-screen">

      {/* Main Content */}
      <div className="container mx-auto space-y-9 px-4 py-8">
        <header className='px-12 mt-10 border-b-2 border-black w-fit text-3xl font-bold py-6'>
            <h1>Welcome: <span>Username</span></h1>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Admin Actions */}
          <Card className='bg-transparent text-black border-none shadow-none'>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-black">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Admin Email
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Admin Panel
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BrickWallIcon className="w-4 h-4 mr-2" />
                Push Wall
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Followers
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Following
              </Button>
            </CardContent>
          </Card>

          {/* User Profile */}
          <Card className='bg-transparent text-black border-none shadow-none'>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">My Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                My Profile
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="w-4 h-4 mr-2" />
                My Safari
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Post a New Story
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <History className="w-4 h-4 mr-2" />
                Post History
              </Button>
            </CardContent>
          </Card>

          {/* Communication */}
          <Card className='bg-transparent text-black border-none shadow-none'>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Communication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Send className="w-4 h-4 mr-2" />
                Send email to all
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Messages[Inbox]
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ExternalLink className="w-4 h-4 mr-2" />
                Go to Forum
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;