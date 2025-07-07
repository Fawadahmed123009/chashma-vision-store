import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const checkoutSchema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  address: z.string().min(5, 'Shipping address is required'),
  notes: z.string().optional(),
  payment_method: z.enum(['cod', 'easypaisa', 'jazzcash', 'bank_transfer']),
  payment_reference: z.string().optional(),
}).refine((data) => {
  if (data.payment_method !== 'cod' && !data.payment_reference) {
    return false;
  }
  return true;
}, {
  message: "Transaction ID is required for online payment methods",
  path: ["payment_reference"],
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

const paymentMethods = [
  { value: 'cod', label: 'Cash on Delivery', description: 'Pay when your order is delivered' },
  { value: 'easypaisa', label: 'EasyPaisa', description: 'Mobile wallet payment' },
  { value: 'jazzcash', label: 'JazzCash', description: 'Mobile wallet payment' },
  { value: 'bank_transfer', label: 'Bank Transfer', description: 'Direct bank transfer' },
];

const paymentDetails = {
  easypaisa: {
    title: 'EasyPaisa Payment Details',
    account: '03XX-XXXXXXX',
    name: 'Chashma Co',
    instructions: 'Send payment to the above number and enter the transaction ID below.'
  },
  jazzcash: {
    title: 'JazzCash Payment Details',
    account: '03XX-XXXXXXX',
    name: 'Chashma Co',
    instructions: 'Send payment to the above number and enter the transaction ID below.'
  },
  bank_transfer: {
    title: 'Bank Transfer Details',
    account: 'XXXX-XXXX-XXXX-XXXX',
    name: 'Chashma Co',
    bank: 'HBL Bank',
    instructions: 'Transfer amount to the above account and enter the transaction reference below.'
  }
};

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      full_name: '',
      phone: '',
      address: '',
      notes: '',
      payment_method: 'cod',
      payment_reference: '',
    },
  });

  const selectedPaymentMethod = form.watch('payment_method');
  const subtotal = getTotalPrice();
  const shipping = 200;
  const total = subtotal + shipping;

  const onSubmit = async (data: CheckoutForm) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to place an order.",
        variant: "destructive",
      });
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to cart before checkout.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Check stock availability before proceeding
      for (const item of cartItems) {
        const { data: product, error } = await supabase
          .from('products')
          .select('stock_quantity')
          .eq('id', item.product_id)
          .single();

        if (error) throw error;

        if (product.stock_quantity < item.quantity) {
          throw new Error(`Insufficient stock for ${item.product.name}. Only ${product.stock_quantity} available.`);
        }
      }

      // Generate order number
      const { data: orderNumber } = await supabase.rpc('generate_order_number');

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          order_number: orderNumber,
          total_amount: total,
          shipping_cost: shipping,
          payment_method: data.payment_method,
          payment_reference: data.payment_reference || null,
          payment_status: data.payment_method === 'cod' ? 'confirmed' : 'pending',
          shipping_address: {
            full_name: data.full_name,
            phone: data.phone,
            address: data.address,
          },
          notes: data.notes || null,
          status: 'pending',
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items and update stock
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Update stock quantities
      for (const item of cartItems) {
        const { error: stockError } = await supabase
          .from('products')
          .update({
            stock_quantity: item.product.stock_quantity - item.quantity
          })
          .eq('id', item.product_id);

        if (stockError) throw stockError;
      }

      // Clear cart
      await clearCart();

      const paymentStatusMsg = data.payment_method === 'cod' 
        ? 'Payment: Cash on Delivery' 
        : 'Payment verification pending';

      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${orderNumber} has been placed. ${paymentStatusMsg}. Expected delivery: 3-5 business days.`,
      });

      navigate('/account/orders');
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast({
        title: "Order Failed",
        description: error.message || "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-navy mb-4">Login Required</h1>
            <p className="text-gray-600">Please log in to complete your checkout.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-navy mb-4">Empty Cart</h1>
            <p className="text-gray-600 mb-6">Your cart is empty. Add some items before checkout.</p>
            <Button onClick={() => navigate('/shop')} className="btn-primary">
              Continue Shopping
            </Button>
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
          <h1 className="text-3xl font-bold text-navy mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-navy mb-6">Shipping Information</h2>
                    
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Shipping Address</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Your complete shipping address"
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Order Notes (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Any special instructions for your order"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-navy mb-6">Payment Method</h2>
                    
                    <FormField
                      control={form.control}
                      name="payment_method"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-3"
                            >
                              {paymentMethods.map((method) => (
                                <div key={method.value} className="flex items-center space-x-3 p-3 border rounded-lg">
                                  <RadioGroupItem value={method.value} id={method.value} />
                                  <div className="flex-1">
                                    <label htmlFor={method.value} className="font-medium cursor-pointer">
                                      {method.label}
                                    </label>
                                    <p className="text-sm text-gray-600">{method.description}</p>
                                  </div>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {selectedPaymentMethod !== 'cod' && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-semibold text-navy mb-3">
                          {paymentDetails[selectedPaymentMethod as keyof typeof paymentDetails].title}
                        </h3>
                        <div className="space-y-2 text-sm">
                          <p><strong>Account:</strong> {paymentDetails[selectedPaymentMethod as keyof typeof paymentDetails].account}</p>
                          <p><strong>Account Title:</strong> {paymentDetails[selectedPaymentMethod as keyof typeof paymentDetails].name}</p>
                          {'bank' in paymentDetails[selectedPaymentMethod as keyof typeof paymentDetails] && (
                            <p><strong>Bank:</strong> {(paymentDetails[selectedPaymentMethod as keyof typeof paymentDetails] as any).bank}</p>
                          )}
                          <p><strong>Amount:</strong> PKR {total.toLocaleString()}</p>
                        </div>
                        <p className="text-sm text-gray-600 mt-3">
                          {paymentDetails[selectedPaymentMethod as keyof typeof paymentDetails].instructions}
                        </p>

                        <FormField
                          control={form.control}
                          name="payment_reference"
                          render={({ field }) => (
                            <FormItem className="mt-4">
                              <FormLabel>Transaction ID / Reference Number</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your transaction ID" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Placing Order...' : `Place Order - PKR ${total.toLocaleString()}`}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Order Summary */}
            <div>
              <h2 className="text-xl font-semibold text-navy mb-6">Order Summary</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-navy">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-xs text-gray-500">
                        Stock: {item.product.stock_quantity - item.quantity} remaining
                      </p>
                    </div>
                    <p className="font-semibold text-navy">
                      PKR {(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">PKR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">PKR {shipping.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="text-lg font-semibold text-navy">Total</span>
                    <span className="text-lg font-bold text-navy">PKR {total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg mt-4">
                  <p className="text-sm text-green-700">
                    <strong>Estimated Delivery:</strong> 3-5 business days
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    Free shipping on all orders above PKR 5,000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
