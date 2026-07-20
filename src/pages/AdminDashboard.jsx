import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest } from "@/lib/api";
import { useAdminAuth } from "@/lib/AdminAuthContext";

const STATUS_VARIANT = {
  pending: "outline",
  approved: "default",
  declined: "destructive",
  completed: "secondary",
};

function BookingsTab() {
  const queryClient = useQueryClient();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: () => apiRequest("/admin/bookings", { auth: true }),
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }) =>
      apiRequest(`/admin/bookings/${id}`, { method: "PATCH", auth: true, body: { status } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-bookings"] }),
  });

  if (isLoading) return <p className="text-alabaster/50 text-sm py-8">Loading bookings...</p>;
  if (!bookings?.length) return <p className="text-alabaster/50 text-sm py-8">No consultation requests yet.</p>;

  return (
    <div className="glass-card rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="text-alabaster/50">Name</TableHead>
            <TableHead className="text-alabaster/50">Contact</TableHead>
            <TableHead className="text-alabaster/50">Preferred</TableHead>
            <TableHead className="text-alabaster/50">Challenges</TableHead>
            <TableHead className="text-alabaster/50">Message</TableHead>
            <TableHead className="text-alabaster/50">Submitted</TableHead>
            <TableHead className="text-alabaster/50">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id} className="border-white/5">
              <TableCell className="text-silica font-medium align-top">{booking.name}</TableCell>
              <TableCell className="text-alabaster/70 text-sm align-top">
                <div>{booking.email}</div>
                {booking.phone && <div className="text-alabaster/40">{booking.phone}</div>}
              </TableCell>
              <TableCell className="text-alabaster/70 text-sm align-top whitespace-nowrap">
                <div>{booking.preferred_date}</div>
                {booking.preferred_time && <div className="text-alabaster/40">{booking.preferred_time}</div>}
              </TableCell>
              <TableCell className="align-top">
                <div className="flex flex-wrap gap-1 max-w-[220px]">
                  {booking.challenges.map((c) => (
                    <Badge key={c} variant="outline" className="border-amber/30 text-amber/80 text-[10px]">
                      {c}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-alabaster/60 text-sm max-w-[240px] align-top">
                {booking.message || "—"}
              </TableCell>
              <TableCell className="text-alabaster/50 text-xs align-top whitespace-nowrap">
                {new Date(booking.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                {booking.updated_at && booking.updated_at !== booking.created_at && (
                  <div className="text-alabaster/30 mt-0.5">
                    updated {new Date(booking.updated_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                )}
              </TableCell>
              <TableCell className="align-top">
                <Select
                  value={booking.status}
                  onValueChange={(status) => updateStatus.mutate({ id: booking.id, status })}
                >
                  <SelectTrigger className="w-[130px] h-8 bg-transparent border-white/10 text-alabaster">
                    <SelectValue>
                      <Badge variant={STATUS_VARIANT[booking.status]}>{booking.status}</Badge>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="declined">Declined</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function MessagesTab() {
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ["admin-contacts"],
    queryFn: () => apiRequest("/admin/contacts", { auth: true }),
  });

  const updateRead = useMutation({
    mutationFn: ({ id, is_read }) =>
      apiRequest(`/admin/contacts/${id}`, { method: "PATCH", auth: true, body: { is_read } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-contacts"] }),
  });

  if (isLoading) return <p className="text-alabaster/50 text-sm py-8">Loading messages...</p>;
  if (!messages?.length) return <p className="text-alabaster/50 text-sm py-8">No messages yet.</p>;

  return (
    <div className="glass-card rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="text-alabaster/50">Name</TableHead>
            <TableHead className="text-alabaster/50">Email</TableHead>
            <TableHead className="text-alabaster/50">Message</TableHead>
            <TableHead className="text-alabaster/50">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((message) => (
            <TableRow key={message.id} className="border-white/5">
              <TableCell className="text-silica font-medium align-top">{message.name}</TableCell>
              <TableCell className="text-alabaster/70 text-sm align-top">{message.email}</TableCell>
              <TableCell className="text-alabaster/60 text-sm max-w-[360px] align-top">{message.message}</TableCell>
              <TableCell className="align-top">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/10 text-xs"
                  onClick={() => updateRead.mutate({ id: message.id, is_read: !message.is_read })}
                >
                  {message.is_read ? "Read" : "Mark read"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function AdminDashboard() {
  const { admin, logout } = useAdminAuth();

  return (
    <div className="min-h-screen bg-obsidian grid-bg px-6 md:px-16 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <span className="font-mono text-amber text-xs tracking-widest block mb-2">
            ADMIN DASHBOARD
          </span>
          <h1 className="font-heading text-silica text-3xl font-medium tracking-tight">
            Afsana Consult
          </h1>
          {admin?.email && <p className="text-alabaster/40 text-sm mt-1">{admin.email}</p>}
        </div>
        <Button variant="outline" className="border-white/10 text-alabaster" onClick={logout}>
          <LogOut className="w-4 h-4 mr-2" />
          Log out
        </Button>
      </div>

      <Tabs defaultValue="bookings">
        <TabsList className="bg-white/5">
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        <TabsContent value="bookings">
          <BookingsTab />
        </TabsContent>
        <TabsContent value="messages">
          <MessagesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
