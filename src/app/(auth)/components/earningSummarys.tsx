import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownIcon, ArrowUpIcon, MoonIcon } from 'lucide-react';
import { DailySales } from './weeklySalesChart';


export const weeklySalesData: DailySales[] = [
    { day: 'Monday', sales: 120, revenue: 2400 },
    { day: 'Tuesday', sales: 145, revenue: 2800 },
    { day: 'Wednesday', sales: 190, revenue: 3600 },
    { day: 'Thursday', sales: 210, revenue: 4100 },
    { day: 'Friday', sales: 250, revenue: 4800 },
    { day: 'Saturday', sales: 280, revenue: 5200 },
    { day: 'Sunday', sales: 170, revenue: 3400 }
  ];

export const getTodayData = () => {
    const today = new Date().getDay(); // 0 is Sunday, 1 is Monday, etc.
    const todayIndex = today === 0 ? 6 : today - 1; // Convert to our array index
    return weeklySalesData[todayIndex];
  };
  
  export const getNightEarnings = () => {
    const todayData = getTodayData();
    // Mock calculation: 30% of daily revenue is from night sales
    return {
      total: Math.round(todayData.revenue * 0.3),
      percentageDiff: 12.5 // Mock percentage difference from previous day
    };
  };
  

const EarningsSummary: React.FC = () => {
  const nightEarnings = getNightEarnings();
  const todayData = getTodayData();
  const isPositive = nightEarnings.percentageDiff > 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium">Night Earnings</CardTitle>
          <CardDescription>Total earnings during night hours</CardDescription>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          <MoonIcon className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${nightEarnings.total}</div>
        <div className="flex items-center gap-1 pt-1 text-xs text-muted-foreground">
          <span className={`flex items-center gap-0.5 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? (
              <ArrowUpIcon className="h-3 w-3" />
            ) : (
              <ArrowDownIcon className="h-3 w-3" />
            )}
            {Math.abs(nightEarnings.percentageDiff)}%
          </span>
          <span>from yesterday</span>
        </div>
        <div className="mt-3 text-xs text-muted-foreground">
          {todayData.day}&apos;s total: ${todayData.revenue}
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsSummary;