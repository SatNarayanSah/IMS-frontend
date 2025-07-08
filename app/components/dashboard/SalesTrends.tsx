import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

// Define the props type for SalesTrends
interface SalesTrendsProps {
    salesTrend: number[]; // Array of numbers representing sales data
}

export default function SalesTrends({ salesTrend }: SalesTrendsProps) {
    // Simulate a theme state (e.g., from a context or state management)
    const isDarkMode = true; // Replace with actual theme state (e.g., from useContext or useState)

    // Map the salesTrend data to include labels for the X-axis
    const chartData = salesTrend.map((value, index) => ({
        name: `Week ${index + 1}`,
        sales: value,
    }));

    // Determine stroke color based on theme
    const axisStroke = isDarkMode ? "#d1d5db" : "#666";
    const gridStroke = isDarkMode ? "#4b5563" : "#e0e0e0";
    const legendColor = isDarkMode ? "#d1d5db" : "#666";
    const tooltipStyle = isDarkMode
        ? { backgroundColor: "#1f2937", color: "#d1d5db" }
        : { backgroundColor: "#fff", color: "#333" };

    return (
        <div className="w-full bg-white p-5 mt-4 rounded-2xl shadow-md dark:bg-gray-800 dark:text-gray-200">
            <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Sales Trends</h2>
            <div className="w-full h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 30, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                        <XAxis dataKey="name" stroke={axisStroke} />
                        <YAxis
                            domain={[0, 32000]}
                            tickFormatter={(value) => `Rs.${value.toLocaleString()}`}
                            stroke={axisStroke}
                        />
                        <Tooltip
                            formatter={(value) => `Rs.${value.toLocaleString()}`}
                            contentStyle={tooltipStyle}
                        />
                        <Legend wrapperStyle={{ color: legendColor }} />
                        <Bar dataKey="sales" fill="#32CD32" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}