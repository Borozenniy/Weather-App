'use client';

import { createContext, useState, type ReactNode } from 'react';

interface ModalContextType {
  isOpen: boolean;
  content: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);

  const openModal = (modalContent: ReactNode) => {
    setContent(modalContent);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContent(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, content, openModal, closeModal }}>
      {children}
      {isOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white dark:bg-zinc-900 p-6 rounded shadow-lg max-w-lg w-full relative'>
            <button
              className='absolute top-2 right-2 text-gray-600 dark:text-gray-300'
              onClick={closeModal}
            >
              ✕
            </button>
            {content}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export { ModalProvider, ModalContext };
