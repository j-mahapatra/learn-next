'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { Card } from '@/components/ui/card';

interface ChartProps {
  data: {
    name: string;
    total: number;
  }[];
}

const AnalyticsChart = ({ data }: ChartProps) => {
  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };
  return (
    <Card className='p-4'>
      <ResponsiveContainer width='100%' height={400}>
        <BarChart data={data} maxBarSize={25}>
          <XAxis
            dataKey='name'
            stroke='#f5f6f7'
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke='#f5f6f7'
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${formattedPrice(value)}`}
          />
          <Bar dataKey='total' fill='#074b83' radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default AnalyticsChart;
