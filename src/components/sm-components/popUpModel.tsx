
import { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function PopupModel({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-95">
      <div className=" p-4 rounded shadow-lg  max-w-lg w-full">
        <button className="absolute top-20 right-20" onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
}
