import { FiAlertTriangle } from "react-icons/fi";

type InventoryAlert = {
  id: number;
  name: string;
  stock: number;
  threshold: number;
};

type InventoryAlertProps = {
  item: InventoryAlert[];
};

const InventoryAlert = ({ item }: InventoryAlertProps) => {
  return (
    <>
      <div className="bg-white rounded-lg dark:border-2 dark:border-gray-700 dark:shadow-sm dark:shadow-gray-500 shadow overflow-hidden dark:bg-gray-800">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
            <FiAlertTriangle className="mr-2 text-yellow-600 dark:text-yellow-300" /> Inventory Alerts
          </h2>
          <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
            View All
          </button>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {item.length > 0 ? (
            item.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate">{item.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Stock: <span className="font-semibold">{item.stock}</span> (min: {item.threshold})
                  </p>
                </div>
                <button className="px-3 py-1 bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300 text-xs font-medium rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-colors">
                  Reorder
                </button>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No inventory alerts at this time
            </div>
          )}
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center bg-gray-50 dark:bg-gray-900">
          <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium">
            View all inventory →
          </button>
        </div>
      </div>
    </>
  );
};

export default InventoryAlert;