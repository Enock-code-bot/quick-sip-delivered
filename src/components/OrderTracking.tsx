
import React from 'react';
import { Card } from '@/components/ui/card';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

interface OrderTrackingProps {
  orderId: string;
  status: 'preparing' | 'ready' | 'out-for-delivery' | 'delivered';
  estimatedTime: string;
}

const OrderTracking = ({ orderId, status, estimatedTime }: OrderTrackingProps) => {
  const steps = [
    { id: 'preparing', label: 'Preparing Order', icon: Package },
    { id: 'ready', label: 'Ready for Pickup', icon: CheckCircle },
    { id: 'out-for-delivery', label: 'Out for Delivery', icon: Truck },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle }
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === status);
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Order #{orderId}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>Estimated delivery: {estimatedTime}</span>
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index <= getCurrentStepIndex();
          const isCurrent = index === getCurrentStepIndex();

          return (
            <div key={step.id} className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isCompleted 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-400'
              }`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className={`font-medium ${
                  isCurrent ? 'text-orange-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {step.label}
                </p>
                {isCurrent && (
                  <p className="text-sm text-orange-600">In progress...</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default OrderTracking;
