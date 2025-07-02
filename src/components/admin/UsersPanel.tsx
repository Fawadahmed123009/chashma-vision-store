
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string | null;
  full_name: string | null;
  created_at: string | null;
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

  const updateUserRole = async (userId: string, newRole: 'admin' | 'customer') => {
    try {
      // First, remove existing roles for this user
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      if (deleteError) throw deleteError;

      // Then add the new role
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role: newRole
        });

      if (insertError) throw insertError;
      
      await fetchUsers();
      toast({
        title: "Success",
        description: `User role updated to ${newRole} successfully.`,
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

  const promoteToAdmin = async (userId: string) => {
    await updateUserRole(userId, 'admin');
  };

  const demoteToCustomer = async (userId: string) => {
    await updateUserRole(userId, 'customer');
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
                <p><span className="text-gray-500">User ID:</span> {user.id}</p>
                <p><span className="text-gray-500">Joined:</span> {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {user.user_roles?.map((role, index) => (
                  <Badge key={index} variant={role.role === 'admin' ? 'default' : 'secondary'}>
                    {role.role}
                  </Badge>
                ))}
                {(!user.user_roles || user.user_roles.length === 0) && (
                  <Badge variant="outline">No roles assigned</Badge>
                )}
              </div>

              <div className="space-y-2">
                <Select
                  value={user.user_roles?.[0]?.role || 'customer'}
                  onValueChange={(value: 'admin' | 'customer') => updateUserRole(user.id, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-2">
                  {!user.user_roles?.some(role => role.role === 'admin') && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => promoteToAdmin(user.id)}
                      className="flex-1"
                    >
                      Make Admin
                    </Button>
                  )}
                  {user.user_roles?.some(role => role.role === 'admin') && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => demoteToCustomer(user.id)}
                      className="flex-1"
                    >
                      Remove Admin
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UsersPanel;
