import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDownIcon } from 'lucide-react';
import { DailySales } from "./weeklySalesChart";

export const weeklySalesData: DailySales[] = [
    { day: 'Monday', sales: 120, revenue: 2400 },
    { day: 'Tuesday', sales: 145, revenue: 2800 },
    { day: 'Wednesday', sales: 190, revenue: 3600 },
    { day: 'Thursday', sales: 210, revenue: 4100 },
    { day: 'Friday', sales: 250, revenue: 4800 },
    { day: 'Saturday', sales: 280, revenue: 5200 },
    { day: 'Sunday', sales: 170, revenue: 3400 }
  ];

export const getWorstSellingDay = () => {
    return weeklySalesData.reduce((min, day) => 
      day.sales < min.sales ? day : min
    , weeklySalesData[0]);
  };
  

export const WorstSellingDayCard: React.FC = () => {
    const worstDay = getWorstSellingDay();
  
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Worst Selling Day</CardTitle>
            <CardDescription>Day with lowest sales</CardDescription>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <TrendingDownIcon className="h-5 w-5 text-red-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{worstDay.day}</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span>{worstDay.sales} items sold</span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Revenue: ${worstDay.revenue}
          </div>
        </CardContent>
      </Card>
    );
  };