
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Clock, XCircle } from 'lucide-react';

interface TransactionHistoryProps {
  onBack: () => void;
}

const TransactionHistory = ({ onBack }: TransactionHistoryProps) => {
  const transactions = [
    {
      id: '1',
      date: '2024-01-15',
      amount: 45.99,
      status: 'completed',
      items: ['Cabernet Sauvignon Reserve', 'Craft IPA'],
      paymentMethod: 'Credit Card'
    },
    {
      id: '2',
      date: '2024-01-12',
      amount: 28.99,
      status: 'completed',
      items: ['Pinot Grigio'],
      paymentMethod: 'Mobile Money'
    },
    {
      id: '3',
      date: '2024-01-10',
      amount: 65.99,
      status: 'pending',
      items: ['Premium Vodka', 'Sparkling Water'],
      paymentMethod: 'Credit Card'
    },
    {
      id: '4',
      date: '2024-01-08',
      amount: 12.99,
      status: 'failed',
      items: ['Craft IPA'],
      paymentMethod: 'Mobile Money'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Transaction History</h1>
        </div>

        <div className="space-y-4">
          {transactions.map((transaction) => (
            <Card key={transaction.id} className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  {getStatusIcon(transaction.status)}
                  <div className="ml-3">
                    <p className="font-semibold">${transaction.amount.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">{transaction.date}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                </span>
              </div>
              
              <div className="border-t pt-3">
                <p className="text-sm text-gray-600 mb-2">Items:</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {transaction.items.map((item, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  Payment: {transaction.paymentMethod}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
