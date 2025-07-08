import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { useState } from "react";
import { FcPaid } from "react-icons/fc";
import { FiPlus, FiSearch, FiFilter, FiFileText, FiDollarSign } from "react-icons/fi";
import { TbCashOff } from "react-icons/tb";

// Types
type SaleItem = {
  id: number;
  serialNumber: number;
  itemName: string;
  category: string;
  brand: string;
  customerName: string;
  billNumber: string;
  customerContact: string;
  quantity: number;
  price: number;
  total: number;
  date: string;
  paid: boolean;
};

type SalesData = {
  sales: SaleItem[];
};

export const loader = async () => {
  // Simulate fetching sales data from a database or API
  const data: SalesData = {
    sales: [
      { id: 1, serialNumber: 1, itemName: "Jack Daniel's No. 7", category: "Whiskey", brand: "Jack Daniel's", customerName: "John Doe", billNumber: "BILL-001", customerContact: "9876543210", quantity: 5, price: 45.99, total: 229.95, date: "2025-07-06", paid: true },
      { id: 2, serialNumber: 2, itemName: "Grey Goose Vodka", category: "Vodka", brand: "Grey Goose", customerName: "Jane Smith", billNumber: "BILL-002", customerContact: "9876543211", quantity: 3, price: 59.99, total: 179.97, date: "2025-07-06", paid: false },
      { id: 3, serialNumber: 3, itemName: "Patrón Silver", category: "Tequila", brand: "Patrón", customerName: "Mike Johnson", billNumber: "BILL-003", customerContact: "9876543212", quantity: 2, price: 69.99, total: 139.98, date: "2025-07-05", paid: true },
      { id: 4, serialNumber: 4, itemName: "Johnnie Walker Black", category: "Whiskey", brand: "Johnnie Walker", customerName: "Sarah Lee", billNumber: "BILL-004", customerContact: "9876543213", quantity: 4, price: 54.99, total: 219.96, date: "2025-07-05", paid: false },
      { id: 5, serialNumber: 5, itemName: "Bacardi Superior", category: "Rum", brand: "Bacardi", customerName: "Robert Brown", billNumber: "BILL-005", customerContact: "9876543214", quantity: 2, price: 29.99, total: 59.98, date: "2025-07-05", paid: true },
    ],
  };
  return json(data);
};

const Sales = () => {
  const { sales: initialSales } = useLoaderData<typeof loader>();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPaid, setFilterPaid] = useState<"all" | "paid" | "unpaid">("all");
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Group sales by date
  const salesByDate = initialSales.reduce((acc, sale) => {
    const date = sale.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(sale);
    return acc;
  }, {} as Record<string, SaleItem[]>);

  // Get unique dates
//   const dates = Object.keys(salesByDate).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  // Filter sales by selected date
  const filteredSalesByDate = selectedDate
    ? { [selectedDate]: salesByDate[selectedDate] || [] }
    : salesByDate;

  // Filter and search logic
  const filterAndSearchSales = (sales: SaleItem[]) => {
    return sales.filter((sale) => {
      const matchesSearch =
        sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.customerContact.includes(searchTerm);
      const matchesPaid =
        filterPaid === "all" ||
        (filterPaid === "paid" && sale.paid) ||
        (filterPaid === "unpaid" && !sale.paid);
      return matchesSearch && matchesPaid;
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Daily Sales Report</h1>

      {/* Header with Search, Filter, Date Picker, and Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative flex items-center w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by customer name, bill number, or contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 bg-white focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" />
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="flex gap-4">
            <button
              onClick={() => setFilterPaid("all")}
              className={`px-3 py-1 rounded-lg flex items-center gap-2 ${filterPaid === "all" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200"} hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors`}
            >
              <FiFilter className="inline mr-1" /> <span>All</span>
            </button>
            <button
              onClick={() => setFilterPaid("paid")}
              className={`px-3 py-1 rounded-lg flex items-center gap-2 ${filterPaid === "paid" ? "bg-green-900 text-white" : "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200"} hover:bg-green-700 dark:hover:bg-green-500 transition-colors`}
            >
              <FcPaid /> <span>Paid</span>
            </button>
            <button
              onClick={() => setFilterPaid("unpaid")}
              className={`px-3 py-1 rounded-lg flex items-center gap-2 ${filterPaid === "unpaid" ? "bg-red-600 text-white" : "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200"} hover:bg-red-700 dark:hover:bg-red-500 transition-colors`}
            >
              <TbCashOff /> <span>Unpaid</span>
            </button>
          </div>

          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2  border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              max={new Date().toISOString().split("T")[0]} // Restrict to current date or earlier
            />
          </div>
        <Link to="/sale/add-sales">
          <button className="w-full md:w-auto flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 transition-colors">
            <FiPlus className="mr-2" /> Add Sale
          </button>
          </Link>
        </div>
      </div>

      {/* Sales Tables by Date */}
      {Object.keys(filteredSalesByDate).length === 0 ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          No sales records available.
        </div>
      ) : (
        Object.entries(filteredSalesByDate).map(([date, sales]) => {
          const filteredSales = filterAndSearchSales(sales);
          if (filteredSales.length === 0) return null;

          const dateTotal = filteredSales.reduce((sum, sale) => sum + sale.total, 0);

          return (
            <div key={date} className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </h2>
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Day Total: Rs. {dateTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden dark:bg-gray-800 dark:border dark:border-gray-700">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-r border-gray-200 dark:border-gray-700">
                        Invoice No.
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-r border-gray-200 dark:border-gray-700">
                        Customer Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-r border-gray-200 dark:border-gray-700">
                        Customer Contact
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-r border-gray-200 dark:border-gray-700">
                        Total Amount (Rs.)
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-r border-gray-200 dark:border-gray-700">
                        Paid Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredSales.map((sale) => (
                      <tr
                        key={sale.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200 border-r border-gray-200 dark:border-gray-700">
                          {sale.billNumber}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">
                          {sale.customerName}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">
                          {sale.customerContact}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">
                          Rs. {sale.total.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm border-r border-gray-200 dark:border-gray-700">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${sale.paid ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                            {sale.paid ? 'Paid' : 'Unpaid'}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <Link
                              to={`/sales/invoice/${sale.id}`}
                              className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center"
                            >
                              <FiFileText className="mr-1" /> Invoice
                            </Link>
                            <button
                              className={`px-2 py-1 rounded flex items-center ${sale.paid ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed" : "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"} transition-colors`}
                              disabled={sale.paid}
                            >
                              <FiDollarSign className="mr-1" /> Payment
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Sales;