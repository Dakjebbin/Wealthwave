import { useState } from 'react';
import { IoMdCloudUpload } from 'react-icons/io';
import { useAuthContext } from '../context/auth-context';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Confirmation = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const { userData } = useAuthContext();
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState("");  // State to handle image error messages

  const location = useLocation();
  const { amount, plan } = location.state || {}; 

  axios.defaults.withCredentials = true;

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      
      if (file.size > 5242880) {
        setImageError("Image should not exceed 5MB.");
        setImage(null);  // Clear image if it exceeds size limit
        setImagePreview(null);  // Clear preview
        return;
      } else {
        setImageError("");  // Reset error if image size is valid
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } 
  };

  const baseUrl = import.meta.env.VITE_BASEURL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image before submitting.");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/transactions/image-Upload`, {
        image: image,  // Send base64 string
        type: 'Deposit', // Add any other fields as required
        amount: amount, 
        plan: plan,
      }, {
        headers: {
          'Content-Type': 'application/json', // Send data as JSON
        },
        withCredentials: true,
      });


      if (response.status === 200) {
        toast.success("Image uploaded successfully!");
        window.location.assign("/dashboard");
      } else {
        toast.error("Image upload failed. Please try again.");
      
      }
    } catch (error) {
      toast.error("An error occurred during the upload." + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {userData && (
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-center text-gray-700 mb-4">Upload Proof of Payment</h3>

          {/* Enhanced user email display */}
          <p className="text-lg font-semibold text-gray-800 text-center mb-4">{userData.email}</p>

          {/* Image upload container */}
          <div className="relative flex justify-center items-center p-6 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-50">
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
                  type="button"
                  onClick={() => setImagePreview(null)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  X
                </button>
              </div>
            )}

            {/* Hidden file input */}
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
          </div>

          {/* Warning for image size */}
          {imageError && (
            <div className="mt-4 text-red-600 text-sm text-center">
              <p>{imageError}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              className="bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={handleSubmit}
            >
              Upload Image
            </button>
          </div>
          <ToastContainer/>
        </div>
        
      )}
   
    </div>
  );
};

export default Confirmation;
