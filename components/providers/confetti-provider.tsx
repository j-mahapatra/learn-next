'use client';

import ReactConfertti from 'react-confetti';
import { useConfettiStore } from '@/hooks/use-confetti-store';

const ConfettiProvider = () => {
  const confetti = useConfettiStore();

  if (!confetti.isOpen) return null;

  return (
    <ReactConfertti
      className='pointer-events-none z-[500]'
      numberOfPieces={500}
      recycle={false}
      onConfettiComplete={() => {
        confetti.onClose();
      }}
    />
  );
};

export default ConfettiProvider;
