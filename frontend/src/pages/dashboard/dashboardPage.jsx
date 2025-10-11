import { useTheme } from "@/hooks/use-theme";
import OverviewCardGrid from "../../UI/dashboard/overviewCard";
import OverviewChart from "../../UI/dashboard/overviewChart";
import RecentSales from "../../UI/dashboard/recentSales";
import TopOrders from "../../UI/dashboard/topOrder";
import { Footer } from "../../components/footer";

const DashboardPage = () => {
    const { theme } = useTheme();
    const data = localStorage.getItem("authToken");
    console.log("authToken", data);

    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">Dashboard</h1>

            {/* Cards showing totals */}
            <OverviewCardGrid />

            {/* Charts */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                <OverviewChart />
                <RecentSales />
            </div>

            {/* Table */}
            <TopOrders />

            <Footer />
        </div>
    );
};

export default DashboardPage;
