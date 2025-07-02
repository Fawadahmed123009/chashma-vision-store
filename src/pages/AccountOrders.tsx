
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  payment_method: string;
  payment_reference: string | null;
  payment_status: string | null;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  shipping_address: any;
  order_items: Array<{
    quantity: number;
    price: number;
    product: {
      name: string;
      images: string[];
    } | null;
  }>;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  shipped: 'bg-orange-100 text-orange-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const paymentStatusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
};

const paymentMethodLabels = {
  cod: 'Cash on Delivery',
  easypaisa: 'EasyPaisa',
  jazzcash: 'JazzCash',
  bank_transfer: 'Bank Transfer',
};

const AccountOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchOrders = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            quantity,
            price,
            product:products (
              name,
              images
            )
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch orders.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-navy mb-4">Login Required</h1>
            <p className="text-gray-600">Please log in to view your orders.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-navy mb-4">Loading...</h1>
            <p className="text-gray-600">Fetching your orders...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-navy mb-8">My Orders</h1>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">No orders found</h2>
              <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Order #{order.order_number}</CardTitle>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-semibold text-navy">
                          PKR {order.total_amount.toLocaleString()}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Badge className={statusColors[order.status]}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                          {order.payment_status && (
                            <Badge className={paymentStatusColors[order.payment_status as keyof typeof paymentStatusColors] || 'bg-gray-100 text-gray-800'}>
                              {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                        <div className="space-y-3">
                          {order.order_items?.map((item, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              {item.product?.images?.[0] && (
                                <img
                                  src={item.product.images[0]}
                                  alt={item.product.name || 'Product'}
                                  className="w-12 h-12 object-cover rounded"
                                />
                              )}
                              <div className="flex-1">
                                <p className="font-medium text-sm">{item.product?.name || 'Unknown Product'}</p>
                                <p className="text-xs text-gray-600">
                                  Qty: {item.quantity} × PKR {item.price.toLocaleString()}
                                </p>
                              </div>
                              <p className="font-semibold text-sm">
                                PKR {(item.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Payment & Shipping</h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Payment Method:</span>
                            <span className="ml-2 font-medium">
                              {paymentMethodLabels[order.payment_method as keyof typeof paymentMethodLabels] || order.payment_method}
                            </span>
                          </div>
                          
                          {order.payment_reference && (
                            <div>
                              <span className="text-gray-600">Transaction ID:</span>
                              <span className="ml-2 font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                {order.payment_reference}
                              </span>
                            </div>
                          )}

                          <div className="pt-2 border-t">
                            <p className="font-medium text-gray-900 mb-1">Shipping Address:</p>
                            <div className="text-gray-600">
                              <p>{order.shipping_address?.full_name}</p>
                              <p>{order.shipping_address?.phone}</p>
                              <p>{order.shipping_address?.address}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountOrders;
