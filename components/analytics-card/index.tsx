import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DataCardProps {
  value: number;
  label: string;
  priceFormatted?: boolean;
}

const AnalyticsCard = ({ value, label, priceFormatted }: DataCardProps) => {
  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-medium'>
          {priceFormatted ? formattedPrice(value) : value}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
