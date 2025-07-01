
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const ContactPanel = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error",
        description: "Failed to fetch contact messages.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: true })
        .eq('id', messageId);

      if (error) throw error;
      
      await fetchMessages();
      toast({
        title: "Success",
        description: "Message marked as read.",
      });
    } catch (error) {
      console.error('Error updating message:', error);
      toast({
        title: "Error",
        description: "Failed to update message.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchMessages();

    // Set up realtime subscription for new messages
    const subscription = supabase
      .channel('contact_messages_changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'contact_messages' },
        () => {
          fetchMessages();
          toast({
            title: "New Message",
            description: "A new contact message has been received!",
          });
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading messages...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-navy">Contact Messages</h2>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message.id} className={!message.is_read ? 'border-l-4 border-l-gold' : ''}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{message.subject}</CardTitle>
                  <p className="text-sm text-gray-600">
                    From: {message.name} • {message.email}
                  </p>
                  {message.phone && (
                    <p className="text-sm text-gray-600">Phone: {message.phone}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    {new Date(message.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={message.is_read ? 'secondary' : 'default'}>
                    {message.is_read ? 'Read' : 'Unread'}
                  </Badge>
                  {!message.is_read && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markAsRead(message.id)}
                    >
                      Mark as Read
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
              </div>
            </CardContent>
          </Card>
        ))}

        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No contact messages yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPanel;
