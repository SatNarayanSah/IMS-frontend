import { json } from "@remix-run/node";
import { useLoaderData, Form, useActionData, useNavigation, Link } from "@remix-run/react";
import { useState } from "react";
import { FiArrowLeft, FiPlus, FiSearch, FiEdit2, FiTrash2, FiPrinter } from "react-icons/fi";

// Types
type Product = {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
};

type PurchaseItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
  supplier: string;
};

type LoaderData = {
  products: Product[];
};

type ActionData = {
  success?: string;
  error?: string;
  purchaseItems?: PurchaseItem[];
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
  const formData = await request.formData();
  const purchaseItems = JSON.parse(formData.get("purchaseItems") as string || "[]") as PurchaseItem[];
  if (purchaseItems.length > 0) {
    return json<ActionData>({ success: "Purchase order created successfully!", purchaseItems });
  }
  return json<ActionData>({ error: "No items in purchase order!" });
};

const PurchasePage = () => {
  const { products } = useLoaderData<typeof loader>();
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>([]);
  const [supplier, setSupplier] = useState("Supplier A");
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split("T")[0]);
  const [currentQty, setCurrentQty] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(0);



  const handleSelectProduct = (product: Product) => {
    if (product.stock === 0) return;
    const newItem = {
      id: Date.now(),
      name: product.name,
      quantity: currentQty,
      price: product.price,
      total: currentQty * product.price,
      supplier,
    };
    setPurchaseItems([...purchaseItems, newItem]);
    setSearchTerm("");
    setCurrentQty(1);
    setCurrentPrice(0);
  };

  const handleAddManualItem = () => {
    if (!searchTerm.trim() || currentQty <= 0 || currentPrice <= 0) return;
    const newItem = {
      id: Date.now(),
      name: searchTerm,
      quantity: currentQty,
      price: currentPrice,
      total: currentQty * currentPrice,
      supplier,
    };
    setPurchaseItems([...purchaseItems, newItem]);
    setSearchTerm("");
    setCurrentQty(1);
    setCurrentPrice(0);
  };

  const handleRemoveItem = (id: number) => {
    setPurchaseItems(purchaseItems.filter((item) => item.id !== id));
  };

  const subtotal = purchaseItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 space-y-4">
      <header className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex justify-between items-center">
        <Link to="/purchases" className="text-gray-700 dark:text-yellow-400 flex items-center hover:underline">
          <FiArrowLeft className="mr-1" /> Back to Purchases
        </Link>
        
      </header>

      <div className="container mx-auto ">
        <div className="bg-white dark:bg-gray-800 rounded-lg  shadow-md p-4 transition-colors duration-300">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Create Purchase Order</h1>

          {/* Search and Add Products */}
          <div className="">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Add Products</h2>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products or enter custom item"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <FiSearch className="absolute right-3 top-3.5 text-gray-500 dark:text-gray-400" />
                </div>
                {searchTerm && (
                  <div className="mt-2 max-h-60 overflow-y-auto bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-lg">
                    {products
                      .filter((product) =>
                        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleSelectProduct(product)}
                          className="p-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex justify-between items-center"
                        >
                          <div>
                            <p className="text-gray-800 dark:text-gray-200">{product.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{product.brand} - {product.category}</p>
                          </div>
                          <p className="text-gray-800 dark:text-gray-200">{formatCurrency(product.price)}</p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <div className="flex h-12 gap-2">
                <input
                  type="number"
                  min="1"
                  value={currentQty}
                  onChange={(e) => setCurrentQty(parseInt(e.target.value) || 1)}
                  className="w-20 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Qty"
                />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={currentPrice}
                  onChange={(e) => setCurrentPrice(parseFloat(e.target.value) || 0)}
                  className="w-24 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Price"
                />
                <button
                  onClick={handleAddManualItem}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors flex items-center"
                >
                  <FiPlus className="mr-1" /> Add
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label htmlFor="supplier" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Supplier</label>
                <select
                  id="supplier"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Supplier A">Supplier A</option>
                  <option value="Supplier B">Supplier B</option>
                  <option value="Supplier C">Supplier C</option>
                </select>
              </div>
              <div className="w-full md:w-1/2">
                <label htmlFor="purchaseDate" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Purchase Date</label>
                <input
                  id="purchaseDate"
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Purchase Items Table */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Purchase Items</h2>
            {purchaseItems.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="p-3 text-left text-gray-800 dark:text-gray-200">Product</th>
                      <th className="p-3 text-left text-gray-800 dark:text-gray-200">Qty</th>
                      <th className="p-3 text-left text-gray-800 dark:text-gray-200">Price</th>
                      <th className="p-3 text-left text-gray-800 dark:text-gray-200">Total</th>
                      <th className="p-3 text-left text-gray-800 dark:text-gray-200">Supplier</th>
                      <th className="p-3 text-left text-gray-800 dark:text-gray-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseItems.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="p-3 text-gray-800 dark:text-gray-200">{item.name}</td>
                        <td className="p-3 text-gray-800 dark:text-gray-200">{item.quantity}</td>
                        <td className="p-3 text-gray-800 dark:text-gray-200">{formatCurrency(item.price)}</td>
                        <td className="p-3 text-gray-800 dark:text-gray-200">{formatCurrency(item.total)}</td>
                        <td className="p-3 text-gray-800 dark:text-gray-200">{item.supplier}</td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {/* Handle edit */}}
                              className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-1"
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-1"
                            >
                              <FiTrash2 />
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
                <p className="text-gray-600 dark:text-gray-400">No items added yet. Add products above.</p>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Summary</h2>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">Subtotal:</span>
                <span className="text-gray-800 dark:text-gray-200 font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-300 dark:border-gray-600 pt-2">
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">Total:</span>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{formatCurrency(subtotal)}</span>
              </div>
            </div>
          </div>

          {/* Form Submission */}
          <Form method="post">
            <input type="hidden" name="purchaseItems" value={JSON.stringify(purchaseItems)} />
            <input type="hidden" name="supplier" value={supplier} />
            <input type="hidden" name="purchaseDate" value={purchaseDate} />
            <button
              type="submit"
              disabled={purchaseItems.length === 0 || navigation.state === "submitting"}
              className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors disabled:opacity-50"
            >
              {navigation.state === "submitting" ? "Processing..." : "Save & Print Purchase Order"}
              <FiPrinter className="ml-2" />
            </button>
            {actionData?.success && (
              <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg">
                {actionData.success}
              </div>
            )}
            {actionData?.error && (
              <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
                {actionData.error}
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export default PurchasePage;