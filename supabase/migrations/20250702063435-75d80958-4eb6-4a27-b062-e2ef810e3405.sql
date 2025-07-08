
-- Add payment-related columns to orders table
ALTER TABLE public.orders 
ADD COLUMN payment_reference TEXT,
ADD COLUMN payment_status TEXT DEFAULT 'pending';

-- Update existing orders to have payment_status
UPDATE public.orders 
SET payment_status = 'pending' 
WHERE payment_status IS NULL;

-- Fix the has_role function to work with user_roles table instead of profiles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Add RLS policies for admin operations on products
CREATE POLICY "Admins can manage products" ON public.products
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Add RLS policies for admin operations on user_roles
CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Add RLS policies for admin operations on orders
CREATE POLICY "Admins can view all orders" ON public.orders
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update orders" ON public.orders
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- Add RLS policies for contact messages (admin read)
CREATE POLICY "Admins can manage contact messages" ON public.contact_messages
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));
