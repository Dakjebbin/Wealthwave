import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

const PinModal = ({ setShowModal, onPinVerified }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  
  // Reference to the modal container
  const modalRef = useRef(null);

  // Close the modal if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    // Add event listener for clicks outside the modal
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowModal]);

  const pinSubmit = import.meta.env.VITE_PIN

  console.log(pinSubmit);
  
  const handlePinSubmit = () => {
    if (pin === pinSubmit) {
      toast.success('Withdrawal confirmed!');
      onPinVerified(pin);
    } else {
      setError('Invalid PIN. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div 
        ref={modalRef} 
        className="bg-white p-6 rounded-lg shadow-lg w-80"
      >
        <button
          className="absolute top-2 right-2 text-xl text-gray-500"
          onClick={() => setShowModal(false)} // Close modal manually on close button click
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4 text-center">Enter PIN to Confirm Withdrawal</h2>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Enter PIN"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          onClick={handlePinSubmit}
          className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default PinModal;
