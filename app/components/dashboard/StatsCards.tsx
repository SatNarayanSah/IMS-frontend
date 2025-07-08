import { FcSalesPerformance } from "react-icons/fc";
import { FiAlertTriangle, FiBarChart2, FiPackage, FiTrendingUp } from "react-icons/fi";

type StatsCardsProps = {
  totalSale: number;
  totalProducts: number;
  lowStock: number;
};

const StatsCards = ({ totalSale, totalProducts, lowStock }: StatsCardsProps) => {
  const data = { totalProducts, totalSale, lowStock };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Sales */}
        <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow dark:bg-gray-800">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
              <FcSalesPerformance className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Sales</p>
              <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">${data.totalSale.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <p className="text-sm text-green-600 flex items-center dark:text-green-300">
                <FiTrendingUp className="mr-1" /> 12% from last month
              </p>
            </div>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow dark:bg-gray-800">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
              <FiPackage className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Products</p>
              <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{data.totalProducts.toLocaleString()}</p>
              <p className="text-sm text-blue-500 dark:text-blue-300">15 categories</p>
            </div>
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow dark:bg-gray-800">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300">
              <FiAlertTriangle className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Low Stock</p>
              <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{data.lowStock}</p>
              <p className="text-sm text-yellow-600 dark:text-yellow-300">Items need restocking</p>
            </div>
          </div>
        </div>

        {/* Monthly Growth */}
        <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow dark:bg-gray-800">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
              <FiBarChart2 className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Growth</p>
              <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">18%</p>
              <p className="text-sm text-purple-600 dark:text-purple-300">Compared to last month</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsCards;