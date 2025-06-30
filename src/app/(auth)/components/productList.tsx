"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChartIcon, Search, SortAscIcon, SortDescIcon } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface Product {
    id: string;
    name: string;
    category: string;
    salesCount: number;
    revenue: number;
  }

export const productData: Product[] = [
    { id: '1', name: 'Premium Coffee Beans', category: 'Beverages', salesCount: 342, revenue: 5130 },
    { id: '2', name: 'Organic Green Tea', category: 'Beverages', salesCount: 265, revenue: 3180 },
    { id: '3', name: 'Whole Grain Bread', category: 'Bakery', salesCount: 189, revenue: 945 },
    { id: '4', name: 'Free-Range Eggs', category: 'Dairy', salesCount: 156, revenue: 780 },
    { id: '5', name: 'Artisanal Cheese', category: 'Dairy', salesCount: 132, revenue: 2640 },
    { id: '6', name: 'Fresh Avocados', category: 'Produce', salesCount: 120, revenue: 600 },
    { id: '7', name: 'Organic Spinach', category: 'Produce', salesCount: 110, revenue: 440 },
    { id: '8', name: 'Dark Chocolate Bar', category: 'Confectionery', salesCount: 98, revenue: 490 },
    { id: '9', name: 'Sourdough Bagels', category: 'Bakery', salesCount: 87, revenue: 435 },
    { id: '10', name: 'Chia Seeds', category: 'Health Foods', salesCount: 72, revenue: 576 }
  ];
  
  // Sort products by sales (highest to lowest)
  export const getTopSellingProducts = () => {
    return [...productData].sort((a, b) => b.salesCount - a.salesCount);
  };
  
  // Sort products by sales (lowest to highest)
  export const getLowestSellingProducts = () => {
    return [...productData].sort((a, b) => a.salesCount - b.salesCount);
  };

interface ProductsListProps {
  className?: string;
}

const ProductsList: React.FC<ProductsListProps> = ({ className }) => {
  const [showTopSelling, setShowTopSelling] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const products = showTopSelling 
    ? getTopSellingProducts() 
    : getLowestSellingProducts();

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className={cn("col-span-2", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Product Sales</CardTitle>
            <CardDescription>
              {showTopSelling ? 'Best selling products' : 'Lowest selling products'}
            </CardDescription>
          </div>
          <Toggle
            variant="outline"
            aria-label="Toggle best/worst selling"
            pressed={!showTopSelling}
            onPressedChange={() => setShowTopSelling(!showTopSelling)}
          >
            {showTopSelling ? (
              <SortDescIcon className="h-4 w-4 mr-2" />
            ) : (
              <SortAscIcon className="h-4 w-4 mr-2" />
            )}
            {showTopSelling ? 'Best Selling' : 'Worst Selling'}
          </Toggle>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-12 text-xs font-medium text-muted-foreground">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-right">Category</div>
            <div className="col-span-2 text-right">Sales</div>
            <div className="col-span-2 text-right">Revenue</div>
          </div>
          <div className="space-y-2">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="grid grid-cols-12 items-center gap-2 rounded-md p-2 hover:bg-muted/50 transition-colors">
                  <div className="col-span-6 flex items-center gap-2 font-medium">
                    <BarChartIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{product.name}</span>
                  </div>
                  <div className="col-span-2 text-right text-xs">{product.category}</div>
                  <div className="col-span-2 text-right text-xs">{product.salesCount}</div>
                  <div className="col-span-2 text-right text-xs">${product.revenue}</div>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No products found.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsList;