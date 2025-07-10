
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminData } from '@/hooks/useAdminData';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductsPanel from '@/components/admin/ProductsPanel';
import ProductsTable from '@/components/admin/ProductsTable';
import OrdersPanel from '@/components/admin/OrdersPanel';
import UsersPanel from '@/components/admin/UsersPanel';
import ContactPanel from '@/components/admin/ContactPanel';
import AnalyticsPanel from '@/components/admin/AnalyticsPanel';
import { Button } from '@/components/ui/button';
import { Grid, Table as TableIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '@/components/AnimatedPage';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { isAdmin, isLoading } = useAdminData();
  const [productsView, setProductsView] = useState<'grid' | 'table'>('grid');

  console.log('AdminDashboard - user:', user);
  console.log('AdminDashboard - isAdmin:', isAdmin);
  console.log('AdminDashboard - isLoading:', isLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Loading...</h1>
            <p className="text-muted-foreground">Checking admin permissions...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Please Sign In</h1>
            <p className="text-muted-foreground">You need to be logged in to access the admin panel.</p>
          </div>
        </main>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Access Denied</h1>
            <p className="text-muted-foreground">You don't have permission to access this page.</p>
            <p className="text-sm text-muted-foreground/60 mt-2">User ID: {user.id}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <AnimatedPage className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-3xl font-bold text-foreground mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Admin Dashboard
          </motion.h1>
          
          <Tabs defaultValue="analytics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="contact">Messages</TabsTrigger>
            </TabsList>
            
            <TabsContent value="analytics">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AnalyticsPanel />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="products" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-foreground">Products Management</h2>
                <div className="flex space-x-2">
                  <Button
                    variant={productsView === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setProductsView('grid')}
                  >
                    <Grid className="w-4 h-4 mr-2" />
                    Grid View
                  </Button>
                  <Button
                    variant={productsView === 'table' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setProductsView('table')}
                  >
                    <TableIcon className="w-4 h-4 mr-2" />
                    Table View
                  </Button>
                </div>
              </div>
              
              {productsView === 'grid' ? <ProductsPanel /> : <ProductsTable />}
            </TabsContent>
            
            <TabsContent value="orders">
              <OrdersPanel />
            </TabsContent>
            
            <TabsContent value="users">
              <UsersPanel />
            </TabsContent>
            
            <TabsContent value="contact">
              <ContactPanel />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </AnimatedPage>
  );
};

export default AdminDashboard;
