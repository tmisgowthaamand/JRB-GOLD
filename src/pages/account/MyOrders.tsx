import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Package, Clock, CheckCircle, XCircle, RefreshCw, ArrowRight } from 'lucide-react';

// Mock order data
const mockOrders = {
  active: [
    {
      id: 'ORD-2023-4567',
      date: '2023-11-15',
      status: 'processing',
      items: [
        { name: '22K Gold Chain', quantity: 1, price: 45000, image: '/placeholder-item.jpg' },
        { name: 'Gold Earrings', quantity: 1, price: 28000, image: '/placeholder-item.jpg' },
      ],
      total: 73000,
      paymentStatus: 'paid',
      shippingAddress: '123 Main St, Bangalore, Karnataka 560001',
      expectedDelivery: '2023-11-25'
    },
    {
      id: 'ORD-2023-4568',
      date: '2023-11-10',
      status: 'shipped',
      items: [
        { name: 'Silver Coin Set', quantity: 2, price: 15000, image: '/placeholder-item.jpg' },
      ],
      total: 30000,
      paymentStatus: 'paid',
      shippingAddress: '123 Main St, Bangalore, Karnataka 560001',
      trackingNumber: 'TRK123456789',
      expectedDelivery: '2023-11-20'
    }
  ],
  completed: [
    {
      id: 'ORD-2023-1234',
      date: '2023-10-05',
      status: 'delivered',
      items: [
        { name: 'Gold Ring', quantity: 1, price: 25000, image: '/placeholder-item.jpg' },
      ],
      total: 25000,
      paymentStatus: 'paid',
      deliveredOn: '2023-10-10'
    }
  ],
  cancelled: [
    {
      id: 'ORD-2023-3456',
      date: '2023-09-20',
      status: 'cancelled',
      items: [
        { name: 'Gold Chain', quantity: 1, price: 35000, image: '/placeholder-item.jpg' },
      ],
      total: 35000,
      paymentStatus: 'refunded',
      cancelledOn: '2023-09-21',
      reason: 'Changed my mind'
    }
  ]
};

const OrderCard = ({ order }: { order: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          <RefreshCw className="h-3 w-3 mr-1" /> Processing
        </Badge>;
      case 'shipped':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          <Package className="h-3 w-3 mr-1" /> Shipped
        </Badge>;
      case 'delivered':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" /> Delivered
        </Badge>;
      case 'cancelled':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">
          <XCircle className="h-3 w-3 mr-1" /> Cancelled
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="mb-6 overflow-hidden">
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <div>
            <p className="text-sm text-gray-500">Order #</p>
            <p className="font-medium">{order.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p>{new Date(order.date).toLocaleDateString('en-IN')}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p>₹{order.total.toLocaleString('en-IN')}</p>
          </div>
          <div className="text-right">
            {getStatusBadge(order.status)}
          </div>
        </div>
        <Button variant="ghost" size="sm">
          {isExpanded ? 'Hide details' : 'View details'}
        </Button>
      </div>
      
      {isExpanded && (
        <CardContent className="border-t pt-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Items</h4>
              <div className="space-y-3">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gray-200 rounded mr-4">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p>₹{item.price.toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Shipping Address</h4>
                <p className="text-gray-700">{order.shippingAddress || 'N/A'}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Order Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{order.total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-2 mt-2">
                    <span>Total</span>
                    <span>₹{order.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>

            {order.status === 'shipped' && order.trackingNumber && (
              <div className="bg-blue-50 p-3 rounded-md">
                <h4 className="font-medium mb-1">Tracking Information</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Your order is on the way. Expected delivery by {new Date(order.expectedDelivery).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.
                </p>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">Tracking #:</span>
                  <code className="bg-white px-2 py-1 rounded text-sm">{order.trackingNumber}</code>
                  <Button variant="outline" size="sm" className="ml-4">Track Order</Button>
                </div>
              </div>
            )}

            {order.status === 'delivered' && (
              <div className="bg-green-50 p-3 rounded-md">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium">Delivered on {new Date(order.deliveredOn).toLocaleDateString('en-IN')}</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">
                  We hope you're enjoying your purchase! If you have any questions, please contact our support.
                </p>
              </div>
            )}

            {order.status === 'cancelled' && (
              <div className="bg-red-50 p-3 rounded-md">
                <div className="flex items-center">
                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                  <span className="font-medium">Order Cancelled</span>
                </div>
                {order.reason && (
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-medium">Reason:</span> {order.reason}
                  </p>
                )}
                {order.paymentStatus === 'refunded' && (
                  <p className="text-sm text-green-600 mt-1">
                    Your refund of ₹{order.total.toLocaleString('en-IN')} has been processed.
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-2">
              <Button variant="outline" size="sm">
                Download Invoice
              </Button>
              {order.status === 'processing' && (
                <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                  Cancel Order
                </Button>
              )}
              {['delivered', 'cancelled'].includes(order.status) && (
                <Button variant="outline" size="sm">
                  Buy Again
                </Button>
              )}
              <Button size="sm">
                Need Help? <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

const EmptyState = ({ type }: { type: string }) => (
  <div className="text-center py-12">
    <Package className="h-12 w-12 text-gray-400 mx-auto" />
    <h3 className="mt-2 text-lg font-medium text-gray-900">No {type} orders</h3>
    <p className="mt-1 text-sm text-gray-500">
      {type === 'active' 
        ? 'You don\'t have any active orders at the moment.'
        : `You don't have any ${type} orders.`}
    </p>
    <div className="mt-6">
      <Link to="/shop">
        <Button>
          Continue Shopping
        </Button>
      </Link>
    </div>
  </div>
);

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState('active');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-playfair font-bold text-gray-900">My Orders</h1>
        <p className="mt-2 text-gray-600">View and manage your orders</p>
      </div>

      <Tabs defaultValue="active" className="w-full" onValueChange={setActiveTab}>
        <div className="border-b">
          <TabsList className="bg-transparent p-0 h-auto rounded-none">
            <TabsTrigger 
              value="active" 
              className="relative py-4 px-6 data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-yellow-500 rounded-none"
            >
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Active Orders
                {mockOrders.active.length > 0 && (
                  <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {mockOrders.active.length}
                  </span>
                )}
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="completed" 
              className="relative py-4 px-6 data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-yellow-500 rounded-none"
            >
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Completed
                {mockOrders.completed.length > 0 && (
                  <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {mockOrders.completed.length}
                  </span>
                )}
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="cancelled" 
              className="relative py-4 px-6 data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-yellow-500 rounded-none"
            >
              <div className="flex items-center">
                <XCircle className="h-4 w-4 mr-2" />
                Cancelled
                {mockOrders.cancelled.length > 0 && (
                  <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {mockOrders.cancelled.length}
                  </span>
                )}
              </div>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="active" className="mt-6">
          {mockOrders.active.length > 0 ? (
            mockOrders.active.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <EmptyState type="active" />
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {mockOrders.completed.length > 0 ? (
            mockOrders.completed.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <EmptyState type="completed" />
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="mt-6">
          {mockOrders.cancelled.length > 0 ? (
            mockOrders.cancelled.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <EmptyState type="cancelled" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyOrders;
