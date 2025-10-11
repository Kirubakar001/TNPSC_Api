// src/components/TopOrders.jsx
import Card from "../../components/card";
import { topProducts } from "@/constants";
import { Star, PencilLine, Trash } from "lucide-react";

const TopOrders = () => (
  <Card title="Top Orders" className="w-full">
    <div className="overflow-auto">
      <table className="min-w-full text-sm">
        <thead className="border-b border-gray-200 dark:border-gray-700">
          <tr>
            <th>#</th><th>Product</th><th>Price</th><th>Status</th><th>Rating</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {topProducts.map((product) => (
            <tr key={product.number} className="border-b border-gray-100 dark:border-gray-700">
              <td>{product.number}</td>
              <td className="flex items-center gap-x-3">
                <img src={product.image} className="size-12 rounded-lg object-cover" />
                <div>
                  <p>{product.name}</p>
                  <p className="text-gray-500 text-sm">{product.description}</p>
                </div>
              </td>
              <td>${product.price}</td>
              <td>{product.status}</td>
              <td className="flex items-center gap-x-1">
                <Star className="fill-yellow-500 stroke-yellow-500" size={16} />
                {product.rating}
              </td>
              <td className="flex gap-x-2">
                <button className="text-blue-500"><PencilLine size={18} /></button>
                <button className="text-red-500"><Trash size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

export default TopOrders;
