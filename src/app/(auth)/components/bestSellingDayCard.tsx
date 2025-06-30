import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUpIcon } from 'lucide-react';
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

export const getBestSellingDay = () => {
    return weeklySalesData.reduce((max, day) => 
      day.sales > max.sales ? day : max
    , weeklySalesData[0]);
  };

export const BestSellingDayCard: React.FC = () => {
    const bestDay = getBestSellingDay();
  
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Best Selling Day</CardTitle>
            <CardDescription>Day with highest sales</CardDescription>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <TrendingUpIcon className="h-5 w-5 text-green-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{bestDay.day}</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span>{bestDay.sales} items sold</span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Revenue: ${bestDay.revenue}
          </div>
        </CardContent>
      </Card>
    );
  };
  