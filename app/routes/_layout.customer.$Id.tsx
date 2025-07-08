// app/routes/customers.$id.tsx
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Customer Details | Liquor Shop IMS" }];
};

export default function CustomerDetails() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Customer Details: John Smith</h1>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold">John Smith</h2>
            
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact</h3>
              <p className="mt-1">+1 (555) 123-4567</p>
              <p>john.smith@example.com</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</h3>
              <p className="mt-1">123 Main St, Anytown, USA</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Spent</h3>
                <p className="text-xl font-semibold">$2450.75</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Purchase</h3>
                <p className="text-xl font-semibold">05/15/2023</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Purchase History</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Order #101</h3>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                    Paid
                  </span>
                  <span className="font-semibold">$135.34</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">05/15/2023</p>
              <div className="text-sm">
                <div className="flex justify-between py-1">
                  <span>2x Jack Daniels Whiskey 750ml</span>
                  <span>$59.98</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>1x Grey Goose Vodka 1L</span>
                  <span>$39.99</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mt-1">+1 more items</p>
              </div>
            </div>
            <div className="border rounded-lg p-4 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Order #102</h3>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                    Paid
                  </span>
                  <span className="font-semibold">$80.98</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">04/28/2023</p>
              <div className="text-sm">
                <div className="flex justify-between py-1">
                  <span>1x Patrón Silver Tequila 750ml</span>
                  <span>$49.99</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>1x Bombay Sapphire Gin 750ml</span>
                  <span>$24.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}