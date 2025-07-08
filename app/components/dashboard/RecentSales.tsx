import { FiShoppingCart } from "react-icons/fi";

type RecentSale = {
    id: number;
    customer: string;
    amount: number;
    items: number;
    date: string;
};

type RecentSalesProps = {
    sales: RecentSale[];
};

const RecentSales = ({ sales }: RecentSalesProps) => {
    return (
        <>
            <div className="relative lg:col-span-2 bg-white rounded-lg shadow  dark:border-2 dark:border-gray-700 dark:shadow-sm dark:shadow-gray-500 overflow-hidden dark:bg-gray-800">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                        <FiShoppingCart className="mr-2 text-blue-700 dark:text-blue-300" /> Recent Sales
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Items</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {sales.map((sale) => (
                                <tr key={sale.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">#{sale.id}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{sale.customer}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Rs. {sale.amount.toFixed(2)}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{sale.items}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{sale.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700 text-center bg-gray-50 dark:bg-gray-900">
                    <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium">
                        View all sales →
                    </button>
                </div>
            </div>
        </>
    );
};

export default RecentSales;