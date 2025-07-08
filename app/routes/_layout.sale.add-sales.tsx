import { json } from "@remix-run/node";
import { useLoaderData, Form, useActionData, useNavigation, Link } from "@remix-run/react";
import { useState, useEffect } from "react";
import { FiArrowLeft, FiEdit2, FiEye, FiPlus, FiPrinter, FiSearch, FiX } from "react-icons/fi";

// Types
type Product = {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
};

type BillItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
};

type LoaderData = {
  products: Product[];
};

type ActionData = {
  success?: string;
  error?: string;
  billItems?: BillItem[];
  invoiceNumber?: string;
};

export const loader = async () => {
  const data: LoaderData = {
    products: [
      { id: 1, name: "Jack Daniel's No. 7", category: "Whiskey", brand: "Jack Daniel's", price: 45.99, stock: 15 },
      { id: 2, name: "Grey Goose Vodka", category: "Vodka", brand: "Grey Goose", price: 59.99, stock: 8 },
      { id: 3, name: "Patrón Silver", category: "Tequila", brand: "Patrón", price: 69.99, stock: 3 },
      { id: 4, name: "Johnnie Walker Black", category: "Whiskey", brand: "Johnnie Walker", price: 54.99, stock: 12 },
    ],
  };
  return json(data);
};

export const action = async ({ request }: { request: Request }) => {
  return json<ActionData>({});
};

const AddSalesComponent = () => {
  const { products } = useLoaderData<typeof loader>();
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();

  // Static form state
  const [searchTerm] = useState("");
  const [billItems] = useState<BillItem[]>([
    { id: 1, name: "Jack Daniel's No. 7", quantity: 2, price: 45.99, total: 91.98 },
    { id: 2, name: "Grey Goose Vodka", quantity: 1, price: 59.99, total: 59.99 },
  ]);
  const [invoiceNumber] = useState("INV-123456");
  const [referenceNumber] = useState("REF-789012");
  const [date] = useState("2025-07-07");
  const [customerName] = useState("John Doe");
  const [customerContact] = useState("123-456-7890");
  const [notes] = useState("Please deliver by 5 PM");
  const [isTaxEnabled] = useState(true);
  const [discount] = useState("10");

  // Calculate static totals
  const subtotal = billItems.reduce((sum, item) => sum + item.total, 0);
  const discountValue = parseFloat(discount) || 0;
  const discountAmount = discountValue / 100 * subtotal;
  const taxableAmount = subtotal - discountAmount;
  const taxRate = isTaxEnabled ? 0.18 : 0;
  const taxAmount = taxableAmount * taxRate;
  const total = taxableAmount + taxAmount;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NPR'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200 space-y-4">
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between rounded-lg items-center">
        <div className="flex items-center space-x-4">
          <Link 
            to="/invoices" 
            className="text-gray-700 dark:text-yellow-400 flex items-center hover:underline"
          >
            <FiArrowLeft className="mr-1" /> Back to Invoices
          </Link>
        </div>
        <div className="flex items-center justify-center gap-2 capitalize font-bold bg-blue-600 px-2 rounded-lg cursomr-pointer">
          <FiEye /> <span>preview</span>
        </div>
      </header>

      <div className="container mx-auto ">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors duration-200">
          <div className="flex items-center justify-between ">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 ">Create New Invoice</h1>
            <div className="underline underline-offset-4 ">
              Date: {date}
            </div>
          </div>

          {/* Search and Add Products Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Add Products</h2>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products or enter custom item"
                    // value={searchTerm}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <FiSearch className="absolute right-3 top-3.5 text-gray-500 dark:text-gray-400" />
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"

                  value={1}
                  className="w-20 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 outline-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Qty"
                />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={0}
                  className="w-24 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Price"
                />
                <button
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors flex items-center"
                >
                  <FiPlus className="mr-1" /> Add
                </button>
              </div>
            </div>
          </div>

          {/* Invoice Items Table */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Invoice Items</h2>
            {billItems.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full  border-collapse">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="p-3 text-left text-gray-800 dark:text-gray-200">Product</th>
                      <th className="p-3 text-left text-gray-800 dark:text-gray-200">Qty</th>
                      <th className="p-3 text-left text-gray-800 dark:text-gray-200">Price</th>
                      <th className="p-3 text-left text-gray-800 dark:text-gray-200">Total</th>
                      <th className="p-3 text-left text-gray-800 dark:text-gray-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billItems.map((item) => (
                      <tr 
                        key={item.id} 
                        className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="p-3 text-gray-800 dark:text-gray-200">{item.name}</td>
                        <td className="p-3 text-gray-800 dark:text-gray-200">{item.quantity}</td>
                        <td className="p-3 text-gray-800 dark:text-gray-200">{formatCurrency(item.price)}</td>
                        <td className="p-3 text-gray-800 dark:text-gray-200">{formatCurrency(item.total)}</td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <button
                              className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-1"
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-1"
                            >
                              <FiX />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-4 text-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-600 dark:text-gray-400">No items added yet. Search and add products above.</p>
              </div>
            )}
          </div>

          {/* Invoice Details and Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Invoice Details */}
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Invoice Details</h2>
              <div className="space-y-3">
                <div>
                  <label htmlFor="invoiceNumber" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Invoice Number</label>
                  <input
                    type="text"
                    value={invoiceNumber}
                    className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="date" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={date}
                    className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
                  />
                </div>
                <div>
                  <label htmlFor="customerName" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Customer Name</label>
                  <input
                    type="text"
                    value={customerName}
                    className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
                  />
                </div>
                <div>
                  <label htmlFor="cutomerContact" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Customer Contact</label>
                  <input
                    type="text"
                    value={customerContact}
                    className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
                  />
                </div>
               
              </div>
            </div>

            {/* Invoice Summary */}
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Invoice Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Subtotal:</span>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Discount:</span>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={discount}
                      className="w-16 p-1 border rounded text-right dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
                    />
                    <span className="ml-1 text-gray-700 dark:text-gray-300">%</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Discount Amount:</span>
                  <span className="text-gray-800 dark:text-gray-200">{formatCurrency(discountAmount)}</span>
                </div>
                <div className="flex justify-between items-center border-t border-gray-300 dark:border-gray-600 pt-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isTaxEnabled}
                      className="mr-2"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Tax (18%)</span>
                  </div>
                  <span className="text-gray-800 dark:text-gray-200">
                    {isTaxEnabled ? formatCurrency(taxAmount) : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-300 dark:border-gray-600 pt-2">
                  <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">Total:</span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Submission */}
          <Form method="post">
            <input type="hidden" name="billItems" value={JSON.stringify(billItems)} />
            <input type="hidden" name="invoiceNumber" value={invoiceNumber} />
            <input type="hidden" name="referenceNumber" value={referenceNumber} />
            <input type="hidden" name="date" value={date} />
            <input type="hidden" name="customerName" value={customerName} />
            <input type="hidden" name="customerContact" value={customerContact} />
            <input type="hidden" name="notes" value={notes} />
            <input type="hidden" name="isTaxEnabled" value={isTaxEnabled.toString()} />
            <input type="hidden" name="discount" value={discount} />
            
            <div className="flex justify-end space-x-4">
              <button
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Reset
              </button>
              <button
                disabled
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg dark:bg-blue-700 dark:hover:bg-blue-800 disabled:opacity-50 flex items-center"
              >
                Save & Print Invoice
                <FiPrinter className="ml-2" />
              </button>
            </div>
            
            {actionData?.error && (
              <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
                {actionData.error}
              </div>
            )}
            
            {actionData?.success && (
              <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg">
                {actionData.success}
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddSalesComponent;