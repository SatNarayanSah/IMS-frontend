import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { FiPlus, FiSearch } from "react-icons/fi";

// Types
type LiquorItem = {
  id: number;
  name: string;
  stock: number;
  threshold: number;
  price: number;
  totalPrice: number;
  category: string;
  brand: string;
};

type InventoryData = {
  items: LiquorItem[];
};

export const loader = async () => {
  // Simulate fetching data from a database or API
  const data: InventoryData = {
    items: [
      { id: 1, name: "Jack Daniel's No. 7", stock: 15, threshold: 10, price: 45.99, totalPrice: 689.85, category: "Whiskey", brand: "Jack Daniel's" },
      { id: 2, name: "Grey Goose Vodka", stock: 8, threshold: 10, price: 59.99, totalPrice: 479.92, category: "Vodka", brand: "Grey Goose" },
      { id: 3, name: "Patrón Silver", stock: 3, threshold: 5, price: 69.99, totalPrice: 209.97, category: "Tequila", brand: "Patrón" },
      { id: 4, name: "Johnnie Walker Black", stock: 12, threshold: 10, price: 54.99, totalPrice: 659.88, category: "Whiskey", brand: "Johnnie Walker" },
    ],
  };
  return json(data);
};

const Inventory = () => {
  const { items } = useLoaderData<typeof loader>();

  const grandTotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="container mx-auto ">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Inventory</h1>

      {/* Header with Search and Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 bg-white text-gray-800 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-300" />
        </div>
        <button className="w-full md:w-auto flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
          <FiPlus className="mr-2" /> Add New Item
        </button>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden dark:border-2 dark:border-gray-700 dark:shadow-sm dark:shadow-gray-500 dark:bg-gray-800">
        <table className="w-full divide-x divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr className="">
              <th className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 border-r border-gray-200 dark:border-gray-700 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Item Name
              </th>
              <th className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Brand
              </th>
              <th className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Threshold
              </th>
              <th className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Price per item
              </th>
              <th className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Total Price
              </th>
              <th className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {items.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  #{item.id}
                </td>
                <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {item.name}
                </td>
                <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {item.category}
                </td>
                <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {item.brand}
                </td>
                <td
                  className={`px-4 py-3 border-r border-gray-200 dark:border-gray-700 whitespace-nowrap text-sm ${item.stock <= item.threshold
                    ? "text-red-600 dark:text-red-400"
                    : "text-gray-500 dark:text-gray-400"
                    }`}
                >
                  {item.stock}
                </td>
                <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {item.threshold}
                </td>
                <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  Rs. {item.price.toFixed(2)}
                </td>
                <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  Rs. {item.totalPrice.toFixed(2)}
                </td>
                <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 whitespace-nowrap text-sm">
                  <button className="mr-2 px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 rounded hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors">
                    Restock
                  </button>
                  <button className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                    Details
                  </button>
                </td>
              </tr>
            ))}
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td colSpan={9}>
                <div className="px-4 py-3 text-gray-800 font-bold dark:text-white text-right text-sm">
                  Total Inventory Price <span className="bg-blue-600 px-4 py-2 text-white rounded-md shadow-lg">Rs. {grandTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          No inventory items available.
        </div>
      )}
    </div>
  );
};

export default Inventory;