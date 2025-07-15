import { json } from "@remix-run/node"; // Note: Check Remix docs for current usage if warning persists
import { useLoaderData } from "@remix-run/react";
import InventoryAlert from "../components/dashboard/InventoryAlert";
import RecentSales from "../components/dashboard/RecentSales";
import SalesTrends from "../components/dashboard/SalesTrends";
import StatsCards from "../components/dashboard/StatsCards";

// Types
type RecentSale = {
  id: number;
  customer: string;
  amount: number;
  items: number;
  date: string;
};

type InventoryAlert = {
  id: number;
  name: string;
  stock: number;
  threshold: number;
};

type DashboardData = {
  totalSales: number;
  totalProducts: number;
  lowStockItems: number;
  recentSales: RecentSale[];
  inventoryAlerts: InventoryAlert[];
  salesTrend: number[];
};

// Default data
const DEFAULT_DATA: DashboardData = {
  totalSales: 0,
  totalProducts: 0,
  lowStockItems: 0,
  recentSales: [],
  inventoryAlerts: [],
  salesTrend: [0, 0, 0, 0, 0, 0, 0],
};

// Loader function
export async function loader() {
  try {
    const data: DashboardData = {
      totalSales: 12540.75,
      totalProducts: 342,
      lowStockItems: 12,
      recentSales: [
        { id: 1, customer: "John Doe", amount: 245.50, items: 8, date: "2023-05-15" },
        { id: 2, customer: "Jane Smith", amount: 189.75, items: 5, date: "2023-05-14" },
        { id: 3, customer: "Mike Johnson", amount: 320.25, items: 10, date: "2023-05-14" },
        { id: 4, customer: "Sarah Williams", amount: 145.90, items: 4, date: "2023-05-13" },
      ],
      inventoryAlerts: [
        { id: 101, name: "Jack Daniel's No. 7", stock: 3, threshold: 5 },
        { id: 102, name: "Grey Goose Vodka", stock: 4, threshold: 5 },
        { id: 103, name: "Patrón Silver", stock: 2, threshold: 5 },
        { id: 104, name: "Johnnie Walker Black", stock: 1, threshold: 5 },
      ],
      salesTrend: [12000, 11000, 12500, 13000, 14000, 15000, 16000],
    };
    return json(data);
  } catch (error) {
    console.error("Failed to load dashboard data:", error);
    return json(DEFAULT_DATA);
  }
}

// Main Dashboard Component
export default function Dashboard() {
  const data = useLoaderData<typeof loader>() || DEFAULT_DATA;

  return (
    <div className="">
      <h1 className="text-2xl font-bold dark:text-gray-200 text-gray-800 mb-6">Dashboard Overview</h1>
      
      {/* Stats Cards - Responsive Grid */}
      <StatsCards totalSale={data.totalSales} totalProducts={data.totalProducts} lowStock={data.lowStockItems}/>

      {/* Main Content - Responsive Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sales - Takes full width on mobile, 2/3 on desktop */}
        <RecentSales sales={data.recentSales}/>

        {/* Inventory Alerts - Takes full width on mobile, 1/3 on desktop */}
        {/* <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <FiAlertTriangle className="mr-2" /> Inventory Alerts
            </h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
              View All
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {data.inventoryAlerts.length > 0 ? (
              data.inventoryAlerts.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Stock: <span className="font-semibold">{item.stock}</span> (min: {item.threshold})
                    </p>
                  </div>
                  <button className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full hover:bg-red-200 transition-colors">
                    Reorder
                  </button>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No inventory alerts at this time
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-200 text-center bg-gray-50">
            <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
              View all inventory →
            </button>
          </div>
        </div> */}
        <InventoryAlert item={data.inventoryAlerts}/>
      </div>

      {/* Add a fixed height container for SalesTrends */}
      <div className="">
        <SalesTrends salesTrend={data.salesTrend} />
      </div>
    </div>
  );
}