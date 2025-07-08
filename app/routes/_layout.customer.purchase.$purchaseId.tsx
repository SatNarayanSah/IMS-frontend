// app/routes/customers.purchase.$purchaseId.tsx
import { MetaFunction, json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { FiPrinter, FiArrowLeft } from "react-icons/fi";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Purchase Invoice | Liquor Shop IMS" }];
};

interface PurchaseItem {
  name: string;
  category: string;
  quantity: number;
  price: number;
}

interface PurchaseData {
  id: string;
  customer: {
    name: string;
    phone: string;
  };
  date: string;
  paymentMethod: string;
  paymentStatus: string;
  items: PurchaseItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
}

export async function loader({ params }: LoaderFunctionArgs) {
  // In a real app, you would fetch this data from your database/API
  const mockPurchase: PurchaseData = {
    id: params.purchaseId || "101",
    customer: {
      name: "John Smith",
      phone: "+1 (555) 123-4567"
    },
    date: "2023-05-15",
    paymentMethod: "cash",
    paymentStatus: "paid",
    items: [
      {
        name: "Jack Daniels Whiskey 750ml",
        category: "Whiskey",
        quantity: 2,
        price: 29.99
      },
      {
        name: "Grey Goose Vodka 1L",
        category: "Vodka",
        quantity: 1,
        price: 39.99
      },
      {
        name: "Corona Extra 6-pack",
        category: "Beer",
        quantity: 3,
        price: 9.99
      }
    ],
    subtotal: 129.94,
    tax: 10.40,
    discount: 5.00,
    total: 135.34
  };

  return json({ purchase: mockPurchase });
}

export default function CustomerPurchaseDetails() {
  const { purchase } = useLoaderData<typeof loader>();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200 py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link
            to="/customers"
            className="flex items-center  text-blue-600 dark:text-blue-400 hover:underline gap-2"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back to Customers
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="flex  sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">Invoice #{purchase.id}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Issued: {new Date(purchase.date).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow hover:shadow-md whitespace-nowrap"
              >
                <FiPrinter className="h-5 w-5" />
                <span>Print Invoice</span>
              </button>
            </div>

            {/* Customer and Payment Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Customer
                </h3>
                <p className="font-medium">{purchase.customer.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {purchase.customer.phone}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Payment Method
                </h3>
                <p className="capitalize">{purchase.paymentMethod}</p>
                <span
                  className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                    purchase.paymentStatus === 'paid'
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  }`}
                >
                  {purchase.paymentStatus}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Invoice Total
                </h3>
                <p className="text-2xl font-bold">${purchase.total.toFixed(2)}</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-8 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {purchase.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 sm:hidden capitalize">
                          {item.category}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 capitalize hidden sm:table-cell">
                        {item.category}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">{item.quantity}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap font-medium">
                        ${(item.quantity * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-full md:w-1/2 lg:w-1/3 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                  <span>${purchase.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Tax</span>
                  <span>${purchase.tax.toFixed(2)}</span>
                </div>
                {purchase.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Discount</span>
                    <span className="text-red-500">-${purchase.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700 font-bold text-lg">
                  <span>Total</span>
                  <span>${purchase.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}