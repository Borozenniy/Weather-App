import { useContext } from 'react';
import { ModalContext } from '@/providers/modal-provider/modal-provider';

function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

export { useModal };
