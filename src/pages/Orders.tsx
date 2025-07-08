
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const statusColors = {
  pending: 'bg-secondary text-secondary-foreground',
  confirmed: 'bg-primary/10 text-primary',
  processing: 'bg-accent/10 text-accent',
  shipped: 'bg-accent/20 text-accent',
  delivered: 'bg-accent text-accent-foreground',
  cancelled: 'bg-destructive text-destructive-foreground',
};

const Orders = () => {
  const { user } = useAuth();
  const { orders, isLoading } = useOrders();

  if (!user) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Access Denied</h1>
            <p className="text-muted-foreground">Please log in to view your orders.</p>
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
          <h1 className="text-3xl font-bold text-primary mb-8">My Orders</h1>

          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-xl font-semibold text-foreground mb-4">No orders yet</h2>
              <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
              <a href="/shop" className="btn-primary">
                Start Shopping
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="shadow-sm">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <CardTitle className="text-lg">
                        Order #{order.order_number}
                      </CardTitle>
                      <div className="flex items-center space-x-4 mt-2 md:mt-0">
                        <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                        <p className="text-lg font-semibold text-primary">
                          PKR {order.total_amount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                        <p className="text-foreground">{order.payment_method}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Shipping Address</p>
                        <p className="text-foreground text-sm">
                          {order.shipping_address?.street}, {order.shipping_address?.city}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Items</p>
                        <p className="text-foreground">
                          {order.order_items?.length || 0} item(s)
                        </p>
                      </div>
                    </div>

                    {order.order_items && order.order_items.length > 0 && (
                      <div className="border-t pt-4">
                        <h4 className="font-medium text-foreground mb-3">Order Items</h4>
                        <div className="space-y-2">
                          {order.order_items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">
                                {item.product?.name} × {item.quantity}
                              </span>
                              <span className="font-medium">
                                PKR {(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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

export default Orders;
