
'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/componentsui/avatar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { Users, MessageSquare, Activity, UserX, MoreHorizontal, Server, HardDrive, ShieldCheck, Trash2, UserCheck, UserCog, Send, BrainCircuit, Rss } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { analyzeSentiment, SentimentAnalysisOutput } from '@/ai/flows/sentiment-analysis-flow';
import { useToast } from "@/hooks/use-toast";
import { Textarea } from './ui/textarea';


const initialUsers = [
    { id: '1', name: 'Emily Carter', email: 'emily.c@example.com', status: 'Online', avatar: 'https://i.pravatar.cc/150?img=21' },
    { id: '2', name: 'James Rodriguez', email: 'james.r@example.com', status: 'Offline', avatar: 'https://i.pravatar.cc/150?img=22' },
    { id: '3', name: 'Olivia Chen', email: 'olivia.c@example.com', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=23' },
    { id: '4', name: 'Benjamin Lee', email: 'ben.l@example.com', status: 'Online', avatar: 'https://i.pravatar.cc/150?img=24' },
    { id: '5', name: 'Sophia Patel', email: 'sophia.p@example.com', status: 'Banned', avatar: 'https://i.pravatar.cc/150?img=25' },
];

const activityData = [
  { date: 'Mon', users: 20 },
  { date: 'Tue', users: 45 },
  { date: 'Wed', users: 30 },
  { date: 'Thu', users: 60 },
  { date: 'Fri', users: 50 },
  { date: 'Sat', users: 80 },
  { date: 'Sun', users: 95 },
];

const initialActivities = [
    { id: 1, user: 'John Doe', action: 'registered.', timestamp: new Date(), avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 2, user: 'Admin', action: 'banned user "spammer123".', timestamp: new Date(Date.now() - 5 * 60 * 1000) },
    { id: 3, user: 'System', action: 'API latency > 500ms.', timestamp: new Date(Date.now() - 15 * 60 * 1000) },
];


const chartConfig = {
  users: {
    label: 'Active Users',
    color: 'hsl(var(--primary))',
  },
};

const sentimentChartConfig = {
    positive: { label: 'Positive', color: '#22c55e' },
    neutral: { label: 'Neutral', color: '#a1a1aa' },
    negative: { label: 'Negative', color: '#ef4444' },
};


export default function AdminDashboard() {
  const [users, setUsers] = useState(initialUsers);
  const { toast } = useToast();
  const [sentimentData, setSentimentData] = useState<SentimentAnalysisOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [activities, setActivities] = useState(initialActivities);

  useEffect(() => {
    handleAnalyzeSentiment();

    const activityInterval = setInterval(() => {
        const newActivity = {
            id: Date.now(),
            user: 'New User',
            action: 'registered.',
            timestamp: new Date(),
            avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
        };
        setActivities(prev => [newActivity, ...prev].slice(0, 5));
    }, 15000); // Add a new activity every 15 seconds

    return () => clearInterval(activityInterval);

  }, []);

  const handleAnalyzeSentiment = async () => {
      setIsAnalyzing(true);
      try {
          const result = await analyzeSentiment();
          setSentimentData(result);
      } catch (error) {
          console.error("Failed to analyze sentiment:", error);
          toast({
              title: "AI Analysis Failed",
              description: "Could not fetch community sentiment data.",
              variant: "destructive",
          });
      } finally {
          setIsAnalyzing(false);
      }
  };
  
  const handleSendBroadcast = () => {
    if (!broadcastMessage.trim()) return;
    toast({
      title: "Broadcast Sent!",
      description: `Message: "${broadcastMessage}"`,
    });
    setBroadcastMessage('');
  };


  const handleBanUser = (id: string) => {
    setUsers(users.map(user => user.id === id ? { ...user, status: 'Banned' } : user));
  };

  const handleUnbanUser = (id: string) => {
    setUsers(users.map(user => user.id === id ? { ...user, status: 'Active' } : user));
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };


  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 text-white overflow-auto">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-gray-400">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
            <MessageSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-gray-400">12 ongoing conversations</p>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,543</div>
            <p className="text-xs text-gray-400">+19% from last month</p>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Banned Users</CardTitle>
            <UserX className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter(u => u.status === 'Banned').length}</div>
            <p className="text-xs text-gray-400">2 new bans this week</p>
          </CardContent>
        </Card>
         <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Server Status</CardTitle>
            <Server className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">Online</div>
            <p className="text-xs text-gray-400">2ms latency</p>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Usage</CardTitle>
            <HardDrive className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25.8 GB</div>
            <p className="text-xs text-gray-400">of 100 GB</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="glass col-span-4">
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
            <CardDescription>Active users in the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
             <ChartContainer config={chartConfig} className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activityData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                        <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                        <Tooltip
                            content={<ChartTooltipContent
                                indicator='dot'
                                className="glass"
                                labelClassName='font-bold text-primary'
                            />}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="users" stroke="var(--color-users)" strokeWidth={2} dot={{ r: 4, fill: "var(--color-users)" }} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="glass col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Ban, unban, or delete users.</CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
                <TableHeader>
                    <TableRow className="border-glass-border">
                        <TableHead>User</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id} className="border-glass-border">
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-sm text-gray-400">{user.email}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant={user.status === 'Banned' ? 'destructive' : 'default'}
                                   className={`${user.status === 'Online' ? 'bg-green-500' : user.status === 'Active' ? 'bg-blue-500' : user.status === 'Offline' ? 'bg-gray-500' : ''}`}
                                >
                                    {user.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                               <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                      <span className="sr-only">Open menu</span>
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="glass">
                                    {user.status !== 'Banned' ? (
                                      <DropdownMenuItem onClick={() => handleBanUser(user.id)}>
                                        <UserX className="mr-2 h-4 w-4" />
                                        Ban User
                                      </DropdownMenuItem>
                                    ) : (
                                      <DropdownMenuItem onClick={() => handleUnbanUser(user.id)}>
                                        <UserCheck className="mr-2 h-4 w-4" />
                                        Unban User
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem>
                                      <UserCog className="mr-2 h-4 w-4" />
                                      Edit User
                                    </DropdownMenuItem>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-destructive">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete User
                                            </div>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="glass text-white">
                                            <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete the user
                                                account and remove their data from our servers.
                                            </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeleteUser(user.id)} className="bg-destructive hover:bg-destructive/90">
                                                Delete
                                            </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="glass">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle>Community Sentiment</CardTitle>
                    <BrainCircuit className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardDescription className="px-6 pb-4">AI-powered analysis of recent messages.</CardDescription>
                <CardContent>
                    {isAnalyzing && <p>Analyzing sentiment...</p>}
                    {sentimentData && (
                        <div className="flex items-center justify-center">
                            <ChartContainer config={sentimentChartConfig} className="w-full h-[150px]">
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Tooltip
                                            cursor={false}
                                            content={<ChartTooltipContent hideLabel indicator="dot" />}
                                        />
                                        <Pie
                                            data={[
                                                { name: 'positive', value: sentimentData.positive, fill: sentimentChartConfig.positive.color },
                                                { name: 'neutral', value: sentimentData.neutral, fill: sentimentChartConfig.neutral.color },
                                                { name: 'negative', value: sentimentData.negative, fill: sentimentChartConfig.negative.color },
                                            ]}
                                            dataKey="value"
                                            nameKey="name"
                                            innerRadius={40}
                                            strokeWidth={2}
                                        >
                                            <Cell key="cell-positive" fill={sentimentChartConfig.positive.color} />
                                            <Cell key="cell-neutral" fill={sentimentChartConfig.neutral.color} />
                                            <Cell key="cell-negative" fill={sentimentChartConfig.negative.color} />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </div>
                    )}
                    <Button onClick={handleAnalyzeSentiment} disabled={isAnalyzing} className="w-full mt-4">
                        {isAnalyzing ? 'Analyzing...' : 'Refresh Analysis'}
                    </Button>
                </CardContent>
            </Card>

            <Card className="glass">
                <CardHeader>
                    <CardTitle>Send Broadcast</CardTitle>
                    <CardDescription>Send a message to all active users.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea
                        placeholder="Type your broadcast message here..."
                        value={broadcastMessage}
                        onChange={(e) => setBroadcastMessage(e.target.value)}
                        className="bg-transparent border-gray-600 focus:ring-primary"
                    />
                    <Button onClick={handleSendBroadcast} disabled={!broadcastMessage} className="w-full bg-primary hover:bg-primary/90">
                        <Send className="mr-2 h-4 w-4" />
                        Send Broadcast
                    </Button>
                </CardContent>
            </Card>
            
             <Card className="glass">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle>Recent Activity</CardTitle>
                    <Rss className="h-5 w-5 text-primary" />
                </CardHeader>
                 <CardDescription className="px-6 pb-4">A log of recent important events.</CardDescription>
                <CardContent className="space-y-4">
                    {activities.map(activity => (
                        <div key={activity.id} className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                                {activity.avatar && <AvatarImage src={activity.avatar} />}
                                <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm">
                                    <span className="font-semibold">{activity.user}</span> {activity.action}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {activity.timestamp.toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
