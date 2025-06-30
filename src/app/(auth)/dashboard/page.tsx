import React from 'react';
// Import the Card components at the top
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import WeeklySalesChart from '../components/weeklySalesChart';
import EarningsSummary from '../components/earningSummarys';
import { BestSellingDayCard} from '../components/bestSellingDayCard';
import { WorstSellingDayCard } from '../components/worstSellingDayCard';
import MonthlyTotal from '../components/monthlyTotal';
import ProductsList from '../components/productList';

export default function Dashboard(){
  return (
    <div className="min-h-screen bg-background">

      <main className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
          <EarningsSummary />
          <BestSellingDayCard />
          <WorstSellingDayCard />
          <MonthlyTotal />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <WeeklySalesChart />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProductsList />
          <div className="col-span-1 grid grid-cols-1 gap-4">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Sales Trends</CardTitle>
                <CardDescription>Comparison with previous periods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Additional content could go here */}
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-medium">Monthly Growth</div>
                    <div className="flex items-center gap-2">
                      <Progress value={68} className="h-2" />
                      <span className="text-xs text-muted-foreground">68%</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-medium">Quarterly Performance</div>
                    <div className="flex items-center gap-2">
                      <Progress value={82} className="h-2" />
                      <span className="text-xs text-muted-foreground">82%</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-medium">Annual Target</div>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="h-2" />
                      <span className="text-xs text-muted-foreground">45%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};



