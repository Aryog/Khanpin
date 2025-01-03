import { IndianRupee } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useOrderStore } from "@/store/useOrderStore";
import { useEffect } from "react";
import { CartItem } from "@/types/cartTypes";

const Success = () => {
  const { orders, getOrderDetails } = useOrderStore();
  useEffect(() => {
    getOrderDetails();
  }, []);

  const calculateTotal = (cartItems: CartItem[]) => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (orders.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300">
          Order not found!
        </h1>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-[#FF5A5A] uppercase">
            Order Summary
          </h1>
        </div>
        <div className="mb-6">
          <Separator className="my-4" />
          {orders.map((order: any, index: number) => (
            <div key={index}>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Order Status: <span className="text-[#FF5A5A] uppercase">{order.status}</span>
                </h2>
              </div>
              {order.cartItems.map((item: CartItem, itemIndex: number) => (
                <div key={itemIndex} className="mb-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-md object-cover"
                      />
                      <div className="space-y-1">
                        <h3 className="text-gray-800 dark:text-gray-200 font-medium">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-800 dark:text-gray-200 flex items-center">
                        <IndianRupee size={16} />
                        <span className="text-lg font-medium">
                          {item.price * item.quantity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        (₹{item.price} × {item.quantity})
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-4 mb-6">
                <div className="flex justify-between items-center text-lg font-semibold text-gray-800 dark:text-gray-200">
                  <span>Total Amount</span>
                  <div className="flex items-center">
                    <IndianRupee size={18} />
                    <span>{calculateTotal(order.cartItems)}</span>
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
            </div>
          ))}
        </div>
        <Link to="/cart">
          <Button className="bg-orange hover:bg-hoverOrange w-full py-3 rounded-md shadow-lg">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
