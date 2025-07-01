
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  city: string | null;
  created_at: string;
  user_roles: Array<{
    role: string;
  }>;
}

const UsersPanel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch roles separately to avoid relation issues
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Combine the data
      const usersWithRoles = profiles?.map(profile => ({
        ...profile,
        user_roles: roles?.filter(role => role.user_id === profile.id).map(role => ({ role: role.role })) || []
      })) || [];

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const promoteToAdmin = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role: 'admin'
        });

      if (error) throw error;
      
      await fetchUsers();
      toast({
        title: "Success",
        description: "User promoted to admin successfully.",
      });
    } catch (error) {
      console.error('Error promoting user:', error);
      toast({
        title: "Error",
        description: "Failed to promote user.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-navy">Users Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle className="text-lg">{user.full_name || 'No Name'}</CardTitle>
              <p className="text-sm text-gray-600">{user.email}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p><span className="text-gray-500">Phone:</span> {user.phone || 'Not provided'}</p>
                <p><span className="text-gray-500">City:</span> {user.city || 'Not provided'}</p>
                <p><span className="text-gray-500">Joined:</span> {new Date(user.created_at).toLocaleDateString()}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {user.user_roles?.map((role, index) => (
                  <Badge key={index} variant={role.role === 'admin' ? 'default' : 'secondary'}>
                    {role.role}
                  </Badge>
                ))}
              </div>

              {!user.user_roles?.some(role => role.role === 'admin') && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => promoteToAdmin(user.id)}
                  className="w-full"
                >
                  Promote to Admin
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UsersPanel;
