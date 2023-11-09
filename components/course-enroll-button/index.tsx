'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import axios from 'axios';

const CourseEnrollButton = ({
  courseId,
  price,
}: {
  courseId: string;
  price: number;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/courses/${courseId}/checkout`);
      window.location.assign(response.data.url);
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  return (
    <Button
      variant='secondary'
      size='sm'
      className='w-full md:w-auto'
      onClick={onClick}
      disabled={isLoading}
    >
      Enroll for {formattedPrice(price)}
    </Button>
  );
};

export default CourseEnrollButton;
