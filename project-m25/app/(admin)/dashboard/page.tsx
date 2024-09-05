'use client'
import { FaDollarSign, FaUsers, FaShoppingCart } from 'react-icons/fa';

import Sidebar from '../sidebar/page';
import Header from '../header/page';
import Card from '../adminHome/Card';
import Chart from '../adminHome/Chart';

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <Header title="Dashboard" />
        <div className="flex flex-col flex-1 p-6 bg-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card
              title="Total Sales"
              value="$9,328.55"
              change="+15.6% +$1.4k this week"
              icon={<FaDollarSign />}
              className="bg-black text-white"
            />
            <Card
              title="Visitors"
              value="12,302"
              change="+12.7% +1.2k this week"
              icon={<FaUsers/>}
            />
            <Card
              title="Order"
              value="963"
              change="-12.7% -213"
              icon={<FaShoppingCart  />}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Chart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
