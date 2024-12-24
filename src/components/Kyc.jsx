
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const KYCForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();


  const onSubmit = async (data) => {
    // Handle form submission
    try {
      // Simulate API call
      toast.success("KYC form submitted successfully!");
      
    } catch (error) {
      toast.error( error || "Error submitting KYC form.");
    }
  };

  

  return (
    <div className="container mx-auto my-5 p-5">
      <h2 className="text-2xl font-bold text-center mb-4">KYC Form</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        
        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your full name"
            {...register("fullName", { required: "Full Name is required" })}
          />
          {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required", pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email"
            }})}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("dob", { required: "Date of birth is required" })}
          />
          {errors.dob && <p className="text-red-500 text-xs">{errors.dob.message}</p>}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your address"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
        </div>


        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Submit KYC
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default KYCForm;
