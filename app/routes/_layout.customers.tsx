// app/routes/customers.tsx
import { MetaFunction, json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { BsCashCoin } from "react-icons/bs";
import { FiExternalLink, FiCalendar, FiUser, FiPhone, FiMail, FiPlus } from "react-icons/fi";

export const meta: MetaFunction = () => {
  return [{ title: "Customer List | Liquor Shop IMS" }];
};

// Mock data - replace with your actual data source
const mockCustomers = [
  {
    id: "1",
    name: "John Smith",
    phone: "+1 (555) 123-4567",
    email: "john.smith@example.com",
    totalSpent: 2450.75,
    lastPurchaseDate: "2023-05-15",
    latestBill: { id: "101", amount: 135.34 }
  },
  {
    id: "2",
    name: "Sarah Johnson",
    phone: "+1 (555) 987-6543",
    email: null,
    totalSpent: 1200.50,
    lastPurchaseDate: "2023-05-10",
    latestBill: { id: "103", amount: 200.75 }
  },
  {
    id: "3",
    name: "Michael Brown",
    phone: "+1 (555) 456-7890",
    email: "michael.b@example.com",
    totalSpent: 1800.25,
    lastPurchaseDate: "2023-05-05",
    latestBill: { id: "104", amount: 150.50 }
  }
];

export async function loader({ request }: LoaderFunctionArgs) {
  // In a real app, you would fetch data from your database/API here
  return json({ customers: mockCustomers });
}

export default function Customers() {
  const { customers } = useLoaderData<typeof loader>();

  return (
    <div className=" dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 ">
      <div className=" mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Customers
          </h1>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search customers..."
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow md:flex-grow-0"
            />
            <Link
              to="/customers/new"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 shadow hover:shadow-lg whitespace-nowrap flex items-center gap-2"
            >
              <FiPlus/>
              Add Customer
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="p-4 text-left text-gray-600 dark:text-gray-300 uppercase tracking-wider font-medium">
                    <div className="flex items-center gap-2">
                      <FiUser className="text-gray-500" /> Name
                    </div>
                  </th>
                  <th className="p-4 text-left text-gray-600 dark:text-gray-300 uppercase tracking-wider font-medium">
                    <div className="flex items-center gap-2">
                      <FiPhone className="text-gray-500" /> Phone
                    </div>
                  </th>
                  <th className="p-4 text-left text-gray-600 dark:text-gray-300 uppercase tracking-wider font-medium">
                    <div className="flex items-center gap-2">
                      <FiMail className="text-gray-500" /> Email
                    </div>
                  </th>
                  <th className="p-4 text-left text-gray-600 dark:text-gray-300 uppercase tracking-wider font-medium">
                    <div className="flex items-center gap-2">
                      <BsCashCoin  className="text-gray-500" /> Total Spent
                    </div>
                  </th>
                  <th className="p-4 text-left text-gray-600 dark:text-gray-300 uppercase tracking-wider font-medium">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-gray-500" /> Last Purchase
                    </div>
                  </th>
                  <th className="p-4 text-left text-gray-600 dark:text-gray-300 uppercase tracking-wider font-medium">
                    Latest Bill
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {customers.map((customer) => (
                  <tr 
                    key={customer.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 cursor-pointer"
                  >
                    <td className="p-4 font-medium">
                      <Link 
                        to={`/customer/${customer.id}`}
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                      >
                        {customer.name}
                      </Link>
                    </td>
                    <td className="p-4">{customer.phone}</td>
                    <td className="p-4">
                      {customer.email || <span className="text-gray-400">-</span>}
                    </td>
                    <td className="p-4 font-medium">
                      Rs. {customer.totalSpent.toFixed(2)}
                    </td>
                    <td className="p-4">
                      {new Date(customer.lastPurchaseDate).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <Link
                        to={`/customer/purchase/${customer.latestBill.id}`}
                        className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        #{customer.latestBill.id} (Rs. {customer.latestBill.amount.toFixed(2)})
                        <FiExternalLink className="text-sm" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <div>Showing {customers.length} of {customers.length} customers</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}