import { Button } from '@/components/ui/button';

const CourseEnrollButton = ({
  courseId,
  price,
}: {
  courseId: string;
  price: number;
}) => {
  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };
  return (
    <Button variant='secondary' size='sm' className='w-full md:w-auto'>
      Enroll for {formattedPrice(price)}
    </Button>
  );
};

export default CourseEnrollButton;
