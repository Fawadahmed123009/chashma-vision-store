
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useToast } from '@/hooks/use-toast';

interface AnalyticsData {
  totalOrders: number;
  totalRevenue: number;
  topProducts: Array<{
    name: string;
    total_sold: number;
    revenue: number;
  }>;
  dailySales: Array<{
    date: string;
    orders: number;
    revenue: number;
  }>;
  orderStatusBreakdown: Array<{
    status: string;
    count: number;
  }>;
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--secondary))', 'hsl(var(--destructive))', 'hsl(var(--muted))', '#82CA9D'];

const AnalyticsPanel = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalOrders: 0,
    totalRevenue: 0,
    topProducts: [],
    dailySales: [],
    orderStatusBreakdown: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchAnalytics = async () => {
    try {
      // Fetch total orders and revenue
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('total_amount, status, created_at');

      if (ordersError) throw ordersError;

      const totalOrders = ordersData?.length || 0;
      const totalRevenue = ordersData?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

      // Fetch top products
      const { data: topProductsData, error: topProductsError } = await supabase
        .from('order_items')
        .select(`
          quantity,
          price,
          product:products (
            name
          )
        `);

      if (topProductsError) throw topProductsError;

      // Process top products
      const productMap = new Map();
      topProductsData?.forEach(item => {
        const productName = item.product?.name || 'Unknown Product';
        if (productMap.has(productName)) {
          const existing = productMap.get(productName);
          productMap.set(productName, {
            name: productName,
            total_sold: existing.total_sold + item.quantity,
            revenue: existing.revenue + (item.quantity * Number(item.price))
          });
        } else {
          productMap.set(productName, {
            name: productName,
            total_sold: item.quantity,
            revenue: item.quantity * Number(item.price)
          });
        }
      });

      const topProducts = Array.from(productMap.values())
        .sort((a, b) => b.total_sold - a.total_sold)
        .slice(0, 5);

      // Process daily sales (last 7 days)
      const dailySalesMap = new Map();
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
      }).reverse();

      // Initialize with zeros
      last7Days.forEach(date => {
        dailySalesMap.set(date, { date, orders: 0, revenue: 0 });
      });

      // Fill with actual data
      ordersData?.forEach(order => {
        const orderDate = new Date(order.created_at).toISOString().split('T')[0];
        if (dailySalesMap.has(orderDate)) {
          const existing = dailySalesMap.get(orderDate);
          dailySalesMap.set(orderDate, {
            date: orderDate,
            orders: existing.orders + 1,
            revenue: existing.revenue + Number(order.total_amount)
          });
        }
      });

      const dailySales = Array.from(dailySalesMap.values());

      // Order status breakdown
      const statusMap = new Map();
      ordersData?.forEach(order => {
        const status = order.status || 'pending';
        statusMap.set(status, (statusMap.get(status) || 0) + 1);
      });

      const orderStatusBreakdown = Array.from(statusMap.entries()).map(([status, count]) => ({
        status: status.charAt(0).toUpperCase() + status.slice(1),
        count
      }));

      setAnalytics({
        totalOrders,
        totalRevenue,
        topProducts,
        dailySales,
        orderStatusBreakdown,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast({
        title: "Error",
        description: "Failed to fetch analytics data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary">Analytics Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{analytics.totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              PKR {analytics.totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              PKR {analytics.totalOrders > 0 ? Math.round(analytics.totalRevenue / analytics.totalOrders).toLocaleString() : 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Top Product Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {analytics.topProducts[0]?.total_sold || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {analytics.topProducts[0]?.name || 'No sales yet'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Sales (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.dailySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value, name) => [
                    name === 'revenue' ? `PKR ${Number(value).toLocaleString()}` : value,
                    name === 'revenue' ? 'Revenue' : 'Orders'
                  ]}
                />
                <Bar dataKey="orders" fill="hsl(var(--primary))" name="orders" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.orderStatusBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, count }) => `${status}: ${count}`}
                  outerRadius={80}
                  fill="hsl(var(--primary))"
                  dataKey="count"
                >
                  {analytics.orderStatusBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top 5 Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                    {index + 1}
                  </Badge>
                  <div>
                    <p className="font-medium text-primary">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.total_sold} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">PKR {product.revenue.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPanel;
