
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string | null;
  created_at?: string;
  current_role: 'admin' | 'customer';
}

const UsersPanel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      // First get all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('email');

      if (profilesError) throw profilesError;

      // Then get user roles for each profile
      const usersWithRoles = await Promise.all(
        (profiles || []).map(async (profile) => {
          const { data: userRoles, error: rolesError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', profile.id)
            .limit(1);

          if (rolesError) {
            console.error('Error fetching user role:', rolesError);
          }

          return {
            ...profile,
            current_role: (userRoles && userRoles.length > 0 ? userRoles[0].role : 'customer') as 'admin' | 'customer'
          };
        })
      );

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

  const updateUserRole = async (userId: string, newRole: 'admin' | 'customer') => {
    try {
      // First, delete existing role
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      if (deleteError) throw deleteError;

      // Then insert new role
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role: newRole,
        });

      if (insertError) throw insertError;

      await fetchUsers();
      toast({
        title: "Success",
        description: `User role updated to ${newRole}.`,
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role.",
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

      <div className="grid gap-4">
        {users.map((user) => {
          return (
            <Card key={user.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{user.full_name || 'Unknown User'}</CardTitle>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-xs text-gray-500 mt-1">ID: {user.id}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={user.current_role === 'admin' ? 'default' : 'secondary'}>
                      {user.current_role.charAt(0).toUpperCase() + user.current_role.slice(1)}
                    </Badge>
                    <Select
                      value={user.current_role}
                      onValueChange={(value: 'admin' | 'customer') => updateUserRole(user.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default UsersPanel;
