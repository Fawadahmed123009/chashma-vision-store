
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useAdminData = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const checkAdminRole = async () => {
      console.log('checkAdminRole - user:', user);
      
      if (!user) {
        console.log('checkAdminRole - no user, setting isAdmin to false');
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      try {
        console.log('checkAdminRole - calling has_role function with user id:', user.id);
        
        const { data, error } = await supabase.rpc('has_role', {
          _user_id: user.id,
          _role: 'admin'
        });

        console.log('checkAdminRole - has_role result:', { data, error });

        if (error) {
          console.error('checkAdminRole - error:', error);
          throw error;
        }
        
        setIsAdmin(data || false);
        console.log('checkAdminRole - setting isAdmin to:', data || false);
      } catch (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminRole();
  }, [user]);

  return { isAdmin, isLoading };
};
