import  { useState } from 'react';
import { IoMdCloudUpload } from 'react-icons/io';
import { useAuthContext } from '../context/auth-context';

const Confirmation = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const { userData } = useAuthContext();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {userData && (
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-center text-gray-700 mb-4">Upload Proof of Payment</h3>
        <p>{userData.email}</p>

        {/* Dropzone Container */}
        <div
          className="flex justify-center items-center p-6 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-50"
        >
          {!imagePreview ? (
            <div className="text-center text-gray-500">
              <IoMdCloudUpload size={30} className="mx-auto mb-3" />
              <p className="text-lg">Drag & Drop your image here, or click to select</p>
            </div>
          ) : (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Proof of Payment Preview"
                className="w-48 h-48 object-cover rounded-lg"
              />
              <button
                onClick={() => setImagePreview(null)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                X
              </button>
            </div>
          )}
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => setImagePreview(reader.result);
              if (file) reader.readAsDataURL(file);
            }}
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Upload Image
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default Confirmation;
