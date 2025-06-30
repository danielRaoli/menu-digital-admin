import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CalendarIcon } from 'lucide-react';
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

export const getMonthlyTotal = () => {
    const totalRevenue = weeklySalesData.reduce((sum, day) => sum + day.revenue, 0);
    // Multiply by 4 to simulate a month (4 weeks)
    return {
      total: totalRevenue * 4,
      target: 100000, // Mock target
      percentage: Math.round((totalRevenue * 4) / 1000) // Percentage of target
    };
  };
  

const MonthlyTotal: React.FC = () => {
  const monthlyData = getMonthlyTotal();
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(monthlyData.total);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium">Monthly Total</CardTitle>
          <CardDescription>Total revenue accumulated this month</CardDescription>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          <CalendarIcon className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formattedTotal}</div>
        <Progress value={monthlyData.percentage} className="mt-2 h-2" />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span>{monthlyData.percentage}% of target</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyTotal;