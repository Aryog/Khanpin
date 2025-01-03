import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { useEffect } from "react";

const Orders = () => {
  const { restaurantOrder, getRestaurantOrders, updateRestaurantOrder } =
    useRestaurantStore();

  const handleStatusChange = async (id: string, status: string) => {
    await updateRestaurantOrder(id, status);
  };

  const calculateTotal = (cartItems: any) => {
    return cartItems.reduce((total: any, item: any) => total + (item.price * item.quantity), 0);
  };

  useEffect(() => {
    getRestaurantOrders();
  }, []);

  return (
    <div className="p-4 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Orders Overview</h2>
      <div className="space-y-4">
        {restaurantOrder.map((order) => (
          <div key={order._id} className="border rounded-lg p-4 bg-white dark:bg-gray-800 dark:border-gray-700 shadow">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="font-medium text-lg dark:text-white">{order.deliveryDetails.name}</div>
                <div className="mt-2 space-y-2">
                  {order.cartItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="dark:text-gray-300">
                        <p>{item.name}</p>
                        <p>Quantity: {item.quantity} x ₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Label className="dark:text-gray-300">Address: {order.deliveryDetails.address}</Label>
                </div>
                <div className="mt-1">
                  <Label className="dark:text-gray-300 text-lg font-semibold">
                    Total Amount: ₹{calculateTotal(order.cartItems)}
                  </Label>
                </div>
              </div>
              <div className="min-w-[200px]">
                <Label htmlFor="status" className="dark:text-gray-300">Order Status</Label>
                <Select
                  onValueChange={(newStatus) =>
                    handleStatusChange(order._id, newStatus)
                  }
                  defaultValue={order.status}
                >
                  <SelectTrigger className="dark:bg-gray-700 dark:text-white">
                    <SelectValue placeholder={order.status} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {[
                        "pending",
                        "confirmed",
                        "preparing",
                        "outfordelivery",
                        "delivered",
                      ].map((status: string, index: number) => (
                        <SelectItem key={index} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
