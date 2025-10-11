// src/pages/dashboard/OverviewCardGrid.jsx
import { Package, DollarSign, Users, CreditCard } from "lucide-react";
import Card from "@/components/Card"; // import Card from components

const cardsData = [
  { title: "Total Products", value: "25,154", icon: <Package size={26} />, percent: 25 },
  { title: "Total Paid Orders", value: "$16,000", icon: <DollarSign size={26} />, percent: 12 },
  { title: "Total Customers", value: "15,400k", icon: <Users size={26} />, percent: 15 },
  { title: "Sales", value: "12,340", icon: <CreditCard size={26} />, percent: 19 },
];

const OverviewCardGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cardsData.map((card) => (
        <Card
          key={card.title}
          title={card.title}
          value={card.value}
          icon={card.icon}
          percent={card.percent}
        />
      ))}
    </div>
  );
};

export default OverviewCardGrid;
