"use client"

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';

export interface DailySales {
    day: string;
    sales: number;
    revenue: number;
  }
  

export const weeklySalesData: DailySales[] = [
    { day: 'Monday', sales: 120, revenue: 2400 },
    { day: 'Tuesday', sales: 145, revenue: 2800 },
    { day: 'Wednesday', sales: 190, revenue: 3600 },
    { day: 'Thursday', sales: 210, revenue: 4100 },
    { day: 'Friday', sales: 250, revenue: 4800 },
    { day: 'Saturday', sales: 280, revenue: 5200 },
    { day: 'Sunday', sales: 170, revenue: 3400 }
  ];


const WeeklySalesChart = () => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Weekly Performance</CardTitle>
        <CardDescription>
          View your sales and revenue for each day of the week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              <TabsTrigger value="stacked">Stacked</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="bar" className="w-full">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={weeklySalesData}
                margin={{
                  top: 16,
                  right: 16,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="day"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Revenue']} 
                  cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
                />
                <Legend />
                <Bar
                  dataKey="revenue"
                  name="Revenue"
                  radius={[4, 4, 0, 0]}
                  className="fill-primary"
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="stacked" className="w-full">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={weeklySalesData}
                margin={{
                  top: 16,
                  right: 16,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="day"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  formatter={(value, name) => [
                    name === "revenue" ? `$${value}` : value,
                    name === "revenue" ? "Revenue" : "Sales"
                  ]}
                  cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
                />
                <Legend />
                <Bar
                  dataKey="sales"
                  name="Sales Count"
                  stackId="a"
                  radius={[4, 4, 0, 0]}
                  className="fill-chart-1"
                />
                <Bar
                  dataKey="revenue"
                  name="Revenue"
                  stackId="a"
                  radius={[4, 4, 0, 0]}
                  className="fill-chart-2"
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WeeklySalesChart;