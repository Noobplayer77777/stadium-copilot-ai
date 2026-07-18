'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Bot, Trash2, Copy, RotateCcw,
  MapPin, Coffee, Users, ShieldAlert, DoorOpen,
  Calendar, Thermometer, CloudRain,
  CheckCheck, Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useUserStore } from '@/store';
import { cn } from '@/lib/utils';

// Mock Data & Responses
const QUICK_PROMPTS = [
  { label: 'Find my gate', icon: DoorOpen },
  { label: 'Nearest restroom', icon: MapPin },
  { label: 'Find food', icon: Coffee },
  { label: 'Parking', icon: MapPin },
  { label: 'Accessibility', icon: Users },
  { label: 'Emergency', icon: ShieldAlert },
  { label: 'Live crowd status', icon: Users },
  { label: 'Today\'s schedule', icon: Calendar },
];

const MOCK_RESPONSES: Record<string, string> = {
  'default': 'I am the Stadium Copilot AI. How can I help you today?',
  'where is gate b?': 'Gate B is located on the North side of the stadium, approximately a 3-minute walk from your current location. Follow the blue signs on Level 1.',
  'nearest restroom': 'The nearest restroom is located near Block 112, right next to the North Food Court. It is currently experiencing low crowd levels.',
  'how crowded is the food court?': 'The North Food Court is currently at Medium capacity, but the South Food Court is relatively empty (Low capacity). I recommend the South one for faster service.',
  'best parking?': 'For Gate B access, Parking Zone C is your best option. It still has 40% availability and offers a direct pedestrian bridge to the gate.',
  'accessibility entrance': 'The designated accessibility entrance is Gate A. It features zero-step entry, dedicated support staff, and priority security screening.',
  'emergency help': 'If this is a medical emergency, please stay where you are. I am alerting the nearest medical team (Team 3) to your location at Block 112. For general help, the nearest help desk is 50 meters away near Gate A.',
  'where can i buy merchandise?': 'There are three official merchandise stores. The closest one to you is the Official Store - North, located just past Gate B on Level 1. It is a 5-minute walk.'
};

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function AssistantPage() {
  const { user } = useUserStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: `Hello ${user?.name || 'there'}! I'm your Stadium Copilot. I can help you find your way around, check crowd levels, get food recommendations, or assist with emergencies. What do you need?`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const lowerInput = newUserMsg.content.toLowerCase();
      let responseText = MOCK_RESPONSES['default'];
      
      // Basic intent matching
      for (const [key, val] of Object.entries(MOCK_RESPONSES)) {
        if (lowerInput.includes(key)) {
          responseText = val;
          break;
        }
      }

      const newAiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newAiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([{
      id: Date.now().toString(),
      role: 'ai',
      content: 'Conversation cleared. How can I help you next?',
      timestamp: new Date()
    }]);
  };

  return (
    <TooltipProvider>
      <div className="flex h-[calc(100vh-4rem)] flex-col lg:flex-row gap-6 overflow-hidden pb-4">
        
        {/* Main Chat Area */}
        <div className="flex flex-1 flex-col rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-0))] shadow-sm overflow-hidden relative">
          
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-[rgb(var(--border))] px-4 py-3 bg-[rgb(var(--background))]/50 backdrop-blur-sm z-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--brand-accent))]">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold leading-none">Stadium Copilot AI</h2>
                <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1 flex items-center gap-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Online
                </p>
              </div>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm" onClick={clearChat}>
                  <Trash2 className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Clear conversation</TooltipContent>
            </Tooltip>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 w-full overflow-y-auto scrollbar-hide">
            <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full pb-4">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "flex w-full gap-4",
                      msg.role === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.role === 'ai' && (
                      <Avatar className="h-8 w-8 shrink-0 mt-1">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={cn(
                      "group relative flex flex-col gap-1 max-w-[85%] md:max-w-[75%]",
                      msg.role === 'user' ? "items-end" : "items-start"
                    )}>
                      <div className={cn(
                        "px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                        msg.role === 'user' 
                          ? "bg-[rgb(var(--primary))] text-white rounded-tr-sm" 
                          : "bg-[rgb(var(--secondary))] text-[rgb(var(--foreground))] rounded-tl-sm"
                      )}>
                        {msg.content}
                      </div>
                      
                      {/* Message Actions & Timestamp */}
                      <div className={cn(
                        "flex items-center gap-2 px-1 text-[10px] text-[rgb(var(--muted-foreground))]",
                        msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                      )}>
                        <span>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        
                        {msg.role === 'ai' && (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                            <button onClick={() => copyToClipboard(msg.content, msg.id)} className="hover:text-[rgb(var(--foreground))] p-1">
                              {copiedId === msg.id ? <CheckCheck className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                            </button>
                            <button onClick={() => setInputValue(msg.content)} className="hover:text-[rgb(var(--foreground))] p-1">
                              <RotateCcw className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {msg.role === 'user' && (
                      <Avatar className="h-8 w-8 shrink-0 mt-1">
                        <AvatarImage src={user?.avatarUrl} />
                        <AvatarFallback className="bg-[rgb(var(--brand-accent))]/10 text-[rgb(var(--brand-accent))]">
                          {user?.name?.[0] || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex w-full gap-4 justify-start"
                >
                  <Avatar className="h-8 w-8 shrink-0 mt-1">
                    <AvatarFallback className="bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-[rgb(var(--secondary))] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5 h-10">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="h-1.5 w-1.5 bg-[rgb(var(--muted-foreground))] rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="h-1.5 w-1.5 bg-[rgb(var(--muted-foreground))] rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="h-1.5 w-1.5 bg-[rgb(var(--muted-foreground))] rounded-full" />
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} className="h-1" />
            </div>
          </div>

          {/* Quick Prompts & Input Area */}
          <div className="border-t border-[rgb(var(--border))] bg-[rgb(var(--background))]/50 backdrop-blur-sm p-4 w-full">
            <div className="max-w-3xl mx-auto w-full">
              
              {/* Quick Prompts Carousel (Horizontal Scroll) */}
              <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                {QUICK_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickPrompt(prompt.label)}
                    className="flex shrink-0 items-center gap-1.5 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface-1))] px-3 py-1.5 text-xs font-medium text-[rgb(var(--muted-foreground))] hover:border-[rgb(var(--primary))]/50 hover:text-[rgb(var(--primary))] transition-colors"
                  >
                    <prompt.icon className="h-3.5 w-3.5" />
                    {prompt.label}
                  </button>
                ))}
              </div>

              {/* Chat Input */}
              <div className="relative flex items-end gap-2 bg-[rgb(var(--surface-1))] rounded-xl border border-[rgb(var(--border))] p-2 focus-within:ring-2 focus-within:ring-[rgb(var(--primary))]/20 focus-within:border-[rgb(var(--primary))] transition-all">
                <Textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about the stadium, match, or crowd..."
                  className="min-h-[44px] max-h-[150px] resize-none bg-transparent border-0 focus-visible:ring-0 p-3 shadow-none text-sm leading-relaxed scrollbar-hide w-full"
                  rows={1}
                />
                
                <div className="flex flex-col justify-end gap-2 pb-2 pr-2">
                  <div className="text-[10px] text-[rgb(var(--muted-foreground))] text-right">
                    {inputValue.length}/500
                  </div>
                  <Button 
                    size="icon" 
                    className="h-9 w-9 shrink-0 rounded-lg bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary))]/90 text-white shadow-sm transition-transform active:scale-95 disabled:opacity-50"
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </div>
              </div>
              <div className="text-center mt-2">
                 <p className="text-[10px] text-[rgb(var(--muted-foreground))]">
                   AI Copilot can make mistakes. Please verify important information.
                 </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Context Panel (Desktop Only) */}
        <div className="hidden lg:flex w-[320px] shrink-0 flex-col gap-4 overflow-y-auto pr-2 no-scrollbar">
          
          <Card className="bg-[rgb(var(--surface-0))] border-[rgb(var(--border))] shadow-sm">
            <CardHeader className="py-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[rgb(var(--primary))]" />
                Live Context
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-4">
              
              {/* Match Context */}
              <div className="space-y-1">
                <p className="text-xs font-semibold text-[rgb(var(--muted-foreground))] uppercase tracking-wider">Match</p>
                <div className="flex justify-between items-center bg-[rgb(var(--surface-1))] p-2 rounded-md border border-[rgb(var(--border))]">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇧🇷</span>
                    <span className="text-xs font-medium">Brazil vs France</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-500 border-green-500/20">Pre-Match</Badge>
                </div>
              </div>

              {/* Crowd Context */}
              <div className="space-y-1">
                <p className="text-xs font-semibold text-[rgb(var(--muted-foreground))] uppercase tracking-wider">Your Zone (Gate B)</p>
                <div className="flex justify-between items-center bg-[rgb(var(--surface-1))] p-2 rounded-md border border-[rgb(var(--border))]">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                    <span className="text-xs font-medium">Crowd Density</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] bg-red-500/10 text-red-500 border-red-500/20">High (85%)</Badge>
                </div>
              </div>

              {/* Weather Context */}
              <div className="space-y-1">
                <p className="text-xs font-semibold text-[rgb(var(--muted-foreground))] uppercase tracking-wider">Weather (MetLife)</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 bg-[rgb(var(--surface-1))] p-2 rounded-md border border-[rgb(var(--border))]">
                    <Thermometer className="h-3 w-3 text-orange-500" />
                    <span className="text-xs font-medium">24°C</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[rgb(var(--surface-1))] p-2 rounded-md border border-[rgb(var(--border))]">
                    <CloudRain className="h-3 w-3 text-blue-500" />
                    <span className="text-xs font-medium">10%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[rgb(var(--surface-0))] border-[rgb(var(--border))] shadow-sm">
            <CardHeader className="py-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-red-500" />
                Emergency Quick Links
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 pb-4">
              <Button variant="outline" size="sm" className="w-full justify-between h-8 text-xs bg-red-500/5 hover:bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400">
                Medical Assistance
                <Phone className="h-3 w-3" />
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-between h-8 text-xs">
                Security Dispatch
                <Phone className="h-3 w-3" />
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </TooltipProvider>
  );
}
