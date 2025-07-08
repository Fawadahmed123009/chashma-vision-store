
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Search, Users } from 'lucide-react';

interface User {
  id: string;
  email: string;
  full_name: string | null;
  current_role: 'admin' | 'customer';
  created_at?: string;
}

const UsersPanel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      
      // First get all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, full_name')
        .order('email');

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        throw profilesError;
      }

      if (!profiles || profiles.length === 0) {
        setUsers([]);
        setFilteredUsers([]);
        return;
      }

      // Get user roles for all users
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) {
        console.error('Error fetching user roles:', rolesError);
        throw rolesError;
      }

      // Create a map of user roles for quick lookup
      const rolesMap = new Map();
      if (userRoles) {
        userRoles.forEach(role => {
          rolesMap.set(role.user_id, role.role);
        });
      }

      // Combine profiles with their roles
      const usersWithRoles: User[] = profiles.map(profile => ({
        id: profile.id,
        email: profile.email || '',
        full_name: profile.full_name,
        current_role: rolesMap.get(profile.id) || 'customer'
      }));

      console.log('Fetched users:', usersWithRoles);
      setUsers(usersWithRoles);
      setFilteredUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'admin' | 'customer') => {
    try {
      console.log(`Updating user ${userId} role to ${newRole}`);
      
      // Check if user already has a role entry
      const { data: existingRole, error: checkError } = await supabase
        .from('user_roles')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing role:', checkError);
        throw checkError;
      }

      if (existingRole) {
        // Update existing role
        const { error: updateError } = await supabase
          .from('user_roles')
          .update({ role: newRole })
          .eq('user_id', userId);

        if (updateError) {
          console.error('Error updating role:', updateError);
          throw updateError;
        }
      } else {
        // Insert new role
        const { error: insertError } = await supabase
          .from('user_roles')
          .insert({
            user_id: userId,
            role: newRole,
          });

        if (insertError) {
          console.error('Error inserting role:', insertError);
          throw insertError;
        }
      }

      // Update local state
      const updatedUsers = users.map(user =>
        user.id === userId ? { ...user, current_role: newRole } : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers.filter(user => 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.full_name && user.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
      ));

      toast({
        title: "Success",
        description: `User role updated to ${newRole}.`,
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (!value.trim()) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        (user.full_name && user.full_name.toLowerCase().includes(value.toLowerCase()))
      );
      setFilteredUsers(filtered);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-navy">Users Management</h2>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-navy">Users Management</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Search Field */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users List */}
      {filteredUsers.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            {searchTerm ? 'No users found matching your search.' : 'No users found.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <span>{user.full_name || 'Unknown User'}</span>
                      <Badge 
                        variant={user.current_role === 'admin' ? 'default' : 'secondary'}
                        className="ml-2"
                      >
                        {user.current_role.charAt(0).toUpperCase() + user.current_role.slice(1)}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{user.email}</p>
                    <p className="text-xs text-gray-400 mt-1">ID: {user.id}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Select
                      value={user.current_role}
                      onValueChange={(value: 'admin' | 'customer') => updateUserRole(user.id, value)}
                    >
                      <SelectTrigger className="w-36">
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
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersPanel;
