import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import { getAnalytics } from '@/actions/get-analytics';
import AnalyticsCard from '@/components/analytics-card';
import AnalyticsChart from '@/components/analytics-chart';

const AnalyticsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const { data, totalRevenue, totalNumberOfSales } = await getAnalytics(userId);

  return (
    <div className='p-5'>
      <div className='grid grid-cols-1 md:grid-cols-2 mb-3 gap-3'>
        <AnalyticsCard
          value={totalNumberOfSales}
          label='Total Number of Sales'
          priceFormatted={false}
        />
        <AnalyticsCard
          value={totalRevenue}
          label='Total Revenue'
          priceFormatted={true}
        />
      </div>
      <AnalyticsChart data={data} />
    </div>
  );
};

export default AnalyticsPage;
