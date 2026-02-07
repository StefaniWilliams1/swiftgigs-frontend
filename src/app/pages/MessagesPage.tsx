import { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Send, Search } from 'lucide-react';

export function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');

  const conversations = [
    { id: 1, name: 'DJ Mike Johnson', lastMessage: 'Thanks! Looking forward to it.', time: '2h ago', unread: 0 },
    { id: 2, name: "Sarah's Photography", lastMessage: 'Can we discuss the timeline?', time: '5h ago', unread: 2 },
    { id: 3, name: 'The Jazz Quartet', lastMessage: 'Perfect! See you then.', time: '1d ago', unread: 0 },
  ];

  const messages = [
    { id: 1, sender: 'DJ Mike Johnson', text: 'Hi! I received your booking request.', time: '10:30 AM', isMe: false },
    { id: 2, sender: 'Me', text: 'Great! Can you confirm availability for February 1st?', time: '10:32 AM', isMe: true },
    { id: 3, sender: 'DJ Mike Johnson', text: 'Yes, I am available on that date!', time: '10:35 AM', isMe: false },
    { id: 4, sender: 'Me', text: 'Awesome! Looking forward to working with you.', time: '10:40 AM', isMe: true },
    { id: 5, sender: 'DJ Mike Johnson', text: 'Thanks! Looking forward to it.', time: '10:42 AM', isMe: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Conversations List */}
          <Card className="rounded-xl lg:col-span-1">
            <div className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search messages..." className="rounded-lg pl-10" />
              </div>

              <div className="space-y-2">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedChat(conv.id)}
                    className={`cursor-pointer rounded-lg p-3 transition-colors ${
                      selectedChat === conv.id ? 'bg-purple-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>{conv.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">{conv.name}</h3>
                          <span className="text-xs text-gray-500">{conv.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="truncate text-sm text-gray-600">{conv.lastMessage}</p>
                          {conv.unread > 0 && (
                            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs text-white">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Chat Window */}
          <Card className="flex flex-col rounded-xl lg:col-span-2">
            {/* Chat Header */}
            <div className="border-b p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900">DJ Mike Johnson</h3>
                  <p className="text-sm text-gray-600">Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        msg.isMe
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p
                        className={`mt-1 text-xs ${
                          msg.isMe ? 'text-purple-100' : 'text-gray-500'
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setMessage('');
                    }
                  }}
                  className="rounded-lg"
                />
                <Button className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-600">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
