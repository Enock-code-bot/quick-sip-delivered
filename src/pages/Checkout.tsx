
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowLeft, CreditCard, Smartphone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
}

interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
  onOrderComplete: () => void;
}

const Checkout = ({ items, onBack, onOrderComplete }: CheckoutProps) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 5.99;
  const finalTotal = total + deliveryFee;

  const handleCheckout = async () => {
    if (!deliveryAddress || !phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onOrderComplete();
      toast({
        title: "Order Placed Successfully!",
        description: "Your order will be delivered within 30 minutes.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Checkout</h1>
        </div>

        {/* Order Summary */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-600 ml-2">x{item.quantity}</span>
              </div>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery Fee:</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Delivery Address */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Delivery Address
          </h2>
          <Input
            placeholder="Enter your delivery address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className="mb-4"
          />
          <Input
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Card>

        {/* Payment Method */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="card"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="card" className="flex items-center cursor-pointer">
                <CreditCard className="h-5 w-5 mr-2" />
                Credit/Debit Card
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="mobile"
                name="payment"
                value="mobile"
                checked={paymentMethod === 'mobile'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="mobile" className="flex items-center cursor-pointer">
                <Smartphone className="h-5 w-5 mr-2" />
                Mobile Money
              </label>
            </div>
          </div>
        </Card>

        <Button
          onClick={handleCheckout}
          disabled={isProcessing}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg"
        >
          {isProcessing ? 'Processing...' : `Place Order - $${finalTotal.toFixed(2)}`}
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
