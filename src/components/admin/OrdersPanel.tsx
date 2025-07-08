
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  user_id: string;
  order_items: Array<{
    quantity: number;
    price: number;
    product: {
      name: string;
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

const OrdersPanel = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            quantity,
            price,
            product:products (
              name
            )
          )
        `)
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

  const updateOrderStatus = async (orderId: string, newStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      
      await fetchOrders();
      toast({
        title: "Success",
        description: "Order status updated successfully.",
      });
    } catch (error) {
      console.error('Error updating order:', error);
      toast({
        title: "Error",
        description: "Failed to update order status.",
        variant: "destructive",
      });
    }
  };

  const updatePaymentStatus = async (orderId: string, newPaymentStatus: 'pending' | 'confirmed' | 'failed') => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ payment_status: newPaymentStatus })
        .eq('id', orderId);

      if (error) throw error;
      
      await fetchOrders();
      toast({
        title: "Success",
        description: "Payment status updated successfully.",
      });
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast({
        title: "Error",
        description: "Failed to update payment status.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchOrders();

    // Set up realtime subscription for new orders
    const subscription = supabase
      .channel('orders_changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'orders' },
        () => {
          fetchOrders();
          toast({
            title: "New Order",
            description: "A new order has been placed!",
          });
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-navy">Orders Management</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Order #{order.order_number}</CardTitle>
                  <p className="text-sm text-gray-600">
                    User ID: {order.user_id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-navy">
                    PKR {order.total_amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {paymentMethodLabels[order.payment_method as keyof typeof paymentMethodLabels] || order.payment_method}
                  </p>
                  {order.payment_reference && (
                    <p className="text-xs text-gray-500 font-mono mt-1">
                      Ref: {order.payment_reference}
                    </p>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                  <div className="space-y-2">
                    {order.order_items?.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.product?.name || 'Unknown Product'} × {item.quantity}</span>
                        <span>PKR {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Shipping Address</h4>
                  <div className="text-sm text-gray-600">
                    <p>{order.shipping_address?.full_name}</p>
                    <p>{order.shipping_address?.phone}</p>
                    <p>{order.shipping_address?.address}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between mt-6 pt-4 border-t gap-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className={statusColors[order.status]}>
                    Order: {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                  {order.payment_status && (
                    <Badge className={paymentStatusColors[order.payment_status as keyof typeof paymentStatusColors] || 'bg-gray-100 text-gray-800'}>
                      Payment: {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <Select
                    value={order.status}
                    onValueChange={(value: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled') => updateOrderStatus(order.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>

                  {order.payment_method !== 'cod' && (
                    <Select
                      value={order.payment_status || 'pending'}
                      onValueChange={(value: 'pending' | 'confirmed' | 'failed') => updatePaymentStatus(order.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Payment Pending</SelectItem>
                        <SelectItem value="confirmed">Payment Confirmed</SelectItem>
                        <SelectItem value="failed">Payment Failed</SelectItem>
                      </SelectContent>
                    </Select>
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

export default OrdersPanel;
