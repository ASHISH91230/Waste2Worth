// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import {
//   addRecepientDetails,
//   editRecepientDetails,
// } from "../../../../../services/operations/recepientAPI";
// import { setRecepient } from "../../../../../slices/recepientSlice";
// import { toast } from "react-hot-toast";
// import Map from "../../DonorUsers/AddDonor/map";
// function AddRecepientDetailsForm() {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     formState: { errors },
//   } = useForm();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const { recepient, editRecepient } = useSelector((state) => state.recepient);
//   const frequency = ["Daily", "Weekly", "Occasionally"];
//   const type = ["Perishable", "Non-Perishable", "Cooked", "Raw Ingredients"];
//   const delivery = ["PickUp", "Delivery"];
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     //Set To Previous Values If Editing
//     if (editRecepient) {
//       setValue("frequencyOfNeed", recepient.frequencyOfNeed);
//       setValue("requestDescription", recepient.requestDescription);
//       setValue("typeOfFood", recepient.typeOfFood);
//       setValue("quantity", recepient.quantity);
//       setValue("receivingOption", recepient.receivingOption);
//       setValue("prefferedPickUpTime", recepient.prefferedPickUpTime);

//       setValue("latitude", recepient.latitude); // 👈 [ADDED]
//       setValue("longitude", recepient.longitude); // 👈 [ADDED]
      
//     } else {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             setValue("latitude", position.coords.latitude);
//             setValue("longitude", position.coords.longitude);
//           },
//           (error) => {
//             console.error("Geolocation error:", error);
//             toast.error("Unable to fetch your location.");
//           }
//         );
//       } else {
//         toast.error("Geolocation is not supported by this browser.");
//       }
//     }
//   }, []);

//   //To Check Whether The Form Is Updated Or Not
//   const isFormUpdated = () => {
//     const currentValues = getValues();
//     if (
//       currentValues.frequencyOfNeed !== recepient.frequencyOfNeed ||
//       currentValues.requestDescription !== recepient.requestDescription ||
//       currentValues.typeOfFood !== recepient.typeOfFood ||
//       currentValues.quantity !== recepient.quantity ||
//       currentValues.receivingOption !== recepient.receivingOption ||
//       currentValues.prefferedPickUpTime !== recepient.prefferedPickUpTime ||
//       currentValues.latitude !== recepient.latitude ||
//       currentValues.longitude !== recepient.longitude
//     ) {
//       return true;
//     } else return false;
//   };

//   // Handle Form Submission
//   const onSubmit = async (data) => {
//     if (editRecepient) {
//       if (isFormUpdated()) {
//         const currentValues = getValues();
//         const formData = new FormData();
//         formData.append("recepientId", recepient._id);
//         if (currentValues.frequencyOfNeed !== recepient.frequencyOfNeed)
//           formData.append("frequencyOfNeed", data.frequencyOfNeed);
//         if (currentValues.requestDescription !== recepient.requestDescription)
//           formData.append("requestDescription", data.requestDescription);
//         if (currentValues.typeOfFood !== recepient.typeOfFood)
//           formData.append("typeOfFood", data.typeOfFood);
//         if (currentValues.quantity !== recepient.quantity)
//           formData.append("quantity", data.quantity);
//         if (currentValues.receivingOption !== recepient.receivingOption)
//           formData.append("receivingOption", data.receivingOption);
//         if (currentValues.prefferedPickUpTime !== recepient.prefferedPickUpTime)
//           formData.append("prefferedPickUpTime", data.prefferedPickUpTime);

//         if (currentValues.latitude !== recepient.latitude)
//           formData.append("latitude", data.latitude);
//         if (currentValues.longitude !== recepient.longitude)
//           formData.append("longitude", data.longitude);        

//         setLoading(true);
//         const result = await editRecepientDetails(formData, token, navigate);
//         setLoading(false);
//         if (result) {
//           dispatch(setRecepient(result));
//         }
//       } else {
//         toast.error("No Changes Made So Far");
//       }
//       return;
//     }

//     // Creating New Request
//     const formData = new FormData();
//     formData.append("frequencyOfNeed", data.frequencyOfNeed);
//     formData.append("requestDescription", data.requestDescription);
//     formData.append("typeOfFood", data.typeOfFood);
//     formData.append("quantity", data.quantity);
//     formData.append("receivingOption", data.receivingOption);
//     formData.append("prefferedPickUpTime", data.prefferedPickUpTime);

//     formData.append("latitude", data.latitude);
//     formData.append("longitude", data.longitude);

//     setLoading(true);
//     const result = await addRecepientDetails(formData, token, navigate);
//     if (result) {
//       dispatch(setRecepient(result));
//     }
//     setLoading(false);
//   };
//   return (
//     <div>
//       <Map />

//       {/* Allowing Only Approved Users To Update Details  */}
//       {user?.approved === true ? (
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className=" relative space-y-8 rounded-m border-richblack-700 bg-richblack-800 p-6"
//         >
//           <div className="flex flex-col space-y-2">
//             <label>
//               <p className="mb-1 text-[1rem] leading-[1.5rem] text-richblack-5">
//                 Latitude <sup className="text-pink-500">*</sup>
//               </p>
//             </label>
//             <input
//               type="text"
//               name="latitude"
//               id="latitude"
//               placeholder="Enter Latitude"
//               {...register("latitude", { required: true })}
//               className="form-style w-full border-2 border-solid p-2 rounded-lg"
//             />
//             {errors.latitude && (
//               <span className="ml-2 text-xs tracking-wide text-pink-200">
//                 Latitude is required**
//               </span>
//             )}
//           </div>

//           <div className="flex flex-col space-y-2">
//             <label>
//               <p className="mb-1 text-[1rem] leading-[1.5rem] text-richblack-5">
//                 Longitude <sup className="text-pink-500">*</sup>
//               </p>
//             </label>
//             <input
//               type="text"
//               name="longitude"
//               id="longitude"
//               placeholder="Enter Longitude"
//               {...register("longitude", { required: true })}
//               className="form-style w-full border-2 border-solid p-2 rounded-lg"
//             />
//             {errors.longitude && (
//               <span className="ml-2 text-xs tracking-wide text-pink-200">
//                 Longitude is required**
//               </span>
//             )}
//           </div>

//           <div className="flex flex-col space-y-2">
//             <label>
//               <p className="mb-1 text-[1rem] leading-[1.5rem] text-richblack-5">
//                 Frequency Of Need <sup className="text-pink-500">*</sup>
//               </p>
//             </label>
//             <select
//               name="frequencyOfNeed"
//               id="frequencyOfNeed"
//               {...register("frequencyOfNeed", { required: true })}
//               className="form-style w-full border-2 border-solid p-2 rounded-lg"
//             >
//               <option value="" disabled selected>
//                 Select A Frequency
//               </option>
//               {!loading &&
//                 frequency.map((freq, index) => (
//                   <option key={index} value={freq}>
//                     {freq}
//                   </option>
//                 ))}
//             </select>
//             {errors.frequencyOfNeed && (
//               <span className="ml-2 text-xs tracking-wide text-pink-200">
//                 Frequency Of Need Is Required**
//               </span>
//             )}
//           </div>

//           <div className="flex flex-col space-y-2">
//             <label>
//               <p className="mb-1 text-[1rem] leading-[1.5rem] text-richblack-5">
//                 Request Description <sup className="text-pink-500">*</sup>
//               </p>
//             </label>
//             <textarea
//               id="requestDescription"
//               placeholder="Enter Request Description"
//               name="requestDescription"
//               {...register("requestDescription", { required: true })}
//               className="form-style resize-x-none min-h-[130px] w-full border-2 border-solid p-2 rounded-lg"
//             />
//             {errors.requestDescription && (
//               <span className="ml-2 text-xs tracking-wide text-pink-200">
//                 Request Description Is Required**
//               </span>
//             )}
//           </div>

//           <div className="flex flex-col space-y-2">
//             <label>
//               <p className="mb-1 text-[1rem] leading-[1.5rem] text-richblack-5">
//                 Type Of Food <sup className="text-pink-500">*</sup>
//               </p>
//             </label>
//             <select
//               id="typeOfFood"
//               name="typeOfFood"
//               {...register("typeOfFood", { required: true })}
//               className="form-style w-full border-2 border-solid p-2 rounded-lg"
//             >
//               <option value="" disabled selected>
//                 Select The Type
//               </option>
//               {!loading &&
//                 type.map((t, index) => (
//                   <option key={index} value={t}>
//                     {t}
//                   </option>
//                 ))}
//             </select>
//             {errors.typeOfFood && (
//               <span className="ml-2 text-xs tracking-wide text-pink-200">
//                 Type Of Food Is Required**
//               </span>
//             )}
//           </div>

//           <div className="flex flex-col space-y-2">
//             <label>
//               <p className="mb-1 text-[1rem] leading-[1.5rem] text-richblack-5">
//                 Quantity <sup className="text-pink-500">*</sup>
//               </p>
//             </label>
//             <input
//               type="text"
//               name="quantity"
//               id="quantity"
//               placeholder="Enter The Quantity Available With Units"
//               {...register("quantity", { required: true })}
//               className="form-style w-full border-2 border-solid p-2 rounded-lg"
//             />
//             {errors.quantity && (
//               <span className="ml-2 text-xs tracking-wide text-pink-200">
//                 Quantity Is Required**
//               </span>
//             )}

//             <label>
//               <p className="mb-1 text-[1rem] leading-[1.5rem] text-richblack-5">
//                 Receiving Option <sup className="text-pink-500">*</sup>
//               </p>
//             </label>
//             <select
//               id="receivingOption"
//               name="receivingOption"
//               {...register("receivingOption", { required: true })}
//               className="form-style w-full border-2 border-solid p-2 rounded-lg"
//             >
//               <option value="" disabled selected>
//                 Select A Receiving Option
//               </option>
//               {!loading &&
//                 delivery.map((del, index) => (
//                   <option key={index} value={del}>
//                     {del}
//                   </option>
//                 ))}
//             </select>
//             {errors.receivingOption && (
//               <span className="ml-2 text-xs tracking-wide text-pink-200">
//                 Receiving Option Is Required**
//               </span>
//             )}

//             <label>
//               <p className="mb-1 text-[1rem] leading-[1.5rem] text-richblack-5">
//                 Preffered Time <sup className="text-pink-500">*</sup>
//               </p>
//             </label>
//             <input
//               id="prefferedPickUpTime"
//               type="text"
//               name="prefferedPickUpTime"
//               placeholder="Enter Preffered Pick Up Time"
//               {...register("prefferedPickUpTime", { required: true })}
//               className="form-style w-full border-2 border-solid p-2 rounded-lg"
//             />
//             {errors.prefferedPickUpTime && (
//               <span className="ml-2 text-xs tracking-wide text-pink-200">
//                 Preffered Pick-Up Time Is Required**
//               </span>
//             )}
//           </div>
          
//           <div className="flex justify-end gap-x-2">
//             {editRecepient && (
//               <button
//                 disabled={loading}
//                 onClick={() => navigate("/dashboard/my-profile")}
//                 className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
//               >
//                 Continue Without Saving
//               </button>
//             )}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
//             >
//               {!editRecepient ? "Save" : "Save Changes"}
//             </button>
//           </div>
//         </form>
//       ) : (
//         <div className="text-brown-600 text-center font-bold text-4xl">
//           Please Wait Until Verification To Proceed!
//         </div>
//       )}
//     </div>
//   );
// }

// export default AddRecepientDetailsForm;




import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  addRecepientDetails,
  editRecepientDetails,
} from "../../../../../services/operations/recepientAPI";
import { setRecepient } from "../../../../../slices/recepientSlice";
import { toast } from "react-hot-toast";
import Map from "../../DonorUsers/AddDonor/map";

function AddRecepientDetailsForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { recepient, editRecepient } = useSelector((state) => state.recepient);
  const frequency = ["Daily", "Weekly", "Occasionally"];
  const type = ["Perishable", "Non-Perishable", "Cooked", "Raw Ingredients"];
  const delivery = ["PickUp", "Delivery"];
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editRecepient) {
      setValue("frequencyOfNeed", recepient.frequencyOfNeed);
      setValue("requestDescription", recepient.requestDescription);
      setValue("typeOfFood", recepient.typeOfFood);
      setValue("quantity", recepient.quantity);
      setValue("receivingOption", recepient.receivingOption);
      setValue("prefferedPickUpTime", recepient.prefferedPickUpTime);
      setValue("latitude", recepient.latitude);
      setValue("longitude", recepient.longitude);
      setValue("phonenumber", recepient.phonenumber);
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setValue("latitude", position.coords.latitude);
            setValue("longitude", position.coords.longitude);
          },
          (error) => {
            console.error("Geolocation error:", error);
            toast.error("Unable to fetch your location.");
          }
        );
      } else {
        toast.error("Geolocation is not supported by this browser.");
      }
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.frequencyOfNeed !== recepient.frequencyOfNeed ||
      currentValues.requestDescription !== recepient.requestDescription ||
      currentValues.typeOfFood !== recepient.typeOfFood ||
      currentValues.quantity !== recepient.quantity ||
      currentValues.receivingOption !== recepient.receivingOption ||
      currentValues.prefferedPickUpTime !== recepient.prefferedPickUpTime ||
      currentValues.latitude !== recepient.latitude ||
      currentValues.longitude !== recepient.longitude ||
      currentValues.phonenumber !== recepient.phonenumber
    );
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (editRecepient) {
      if (isFormUpdated()) {
        formData.append("recepientId", recepient._id);
        Object.entries(data).forEach(([key, value]) => {
          if (value !== recepient[key]) formData.append(key, value);
        });
        setLoading(true);
        const result = await editRecepientDetails(formData, token, navigate);
        setLoading(false);
        if (result) dispatch(setRecepient(result));
      } else {
        toast.error("No Changes Made So Far");
      }
    } else {
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value)
      );
      setLoading(true);
      const result = await addRecepientDetails(formData, token, navigate);
      setLoading(false);
      if (result) dispatch(setRecepient(result));
    }
  };

  return (
    <div>
      <Map />
      {user?.approved === true ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative space-y-8 rounded-m border-richblack-700 bg-richblack-800 p-6"
        >
          {/* Latitude */}
          <div className="flex flex-col space-y-2">
            <label>
              <p className="mb-1 text-[1rem] text-richblack-5">
                Latitude <sup className="text-pink-500">*</sup>
              </p>
            </label>
            <input
              type="text"
              {...register("latitude", { required: true })}
              className="form-style w-full border-2 p-2 rounded-lg"
            />
            {errors.latitude && (
              <span className="text-pink-200 text-xs">Latitude is required**</span>
            )}
          </div>

          {/* Longitude */}
          <div className="flex flex-col space-y-2">
            <label>
              <p className="mb-1 text-[1rem] text-richblack-5">
                Longitude <sup className="text-pink-500">*</sup>
              </p>
            </label>
            <input
              type="text"
              {...register("longitude", { required: true })}
              className="form-style w-full border-2 p-2 rounded-lg"
            />
            {errors.longitude && (
              <span className="text-pink-200 text-xs">Longitude is required**</span>
            )}
          </div>

         

          {/* Frequency */}
          <div className="flex flex-col space-y-2">
            <label>
              <p className="mb-1 text-[1rem] text-richblack-5">
                Frequency Of Need <sup className="text-pink-500">*</sup>
              </p>
            </label>
            <select
              {...register("frequencyOfNeed", { required: true })}
              className="form-style w-full border-2 p-2 rounded-lg"
            >
              <option value="">Select A Frequency</option>
              {frequency.map((freq, index) => (
                <option key={index} value={freq}>
                  {freq}
                </option>
              ))}
            </select>
            {errors.frequencyOfNeed && (
              <span className="text-pink-200 text-xs">
                Frequency Of Need Is Required**
              </span>
            )}
          </div>

          {/* Request Description */}
          <div className="flex flex-col space-y-2">
            <label>
              <p className="mb-1 text-[1rem] text-richblack-5">
                Request Description <sup className="text-pink-500">*</sup>
              </p>
            </label>
            <textarea
              {...register("requestDescription", { required: true })}
              className="form-style resize-none min-h-[130px] w-full border-2 p-2 rounded-lg"
            />
            {errors.requestDescription && (
              <span className="text-pink-200 text-xs">Request Description Is Required**</span>
            )}
          </div>

          {/* Type Of Food */}
          <div className="flex flex-col space-y-2">
            <label>
              <p className="mb-1 text-[1rem] text-richblack-5">
                Type Of Food <sup className="text-pink-500">*</sup>
              </p>
            </label>
            <select
              {...register("typeOfFood", { required: true })}
              className="form-style w-full border-2 p-2 rounded-lg"
            >
              <option value="">Select The Type</option>
              {type.map((t, index) => (
                <option key={index} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errors.typeOfFood && (
              <span className="text-pink-200 text-xs">Type Of Food Is Required**</span>
            )}
          </div>

          {/* Quantity */}
          <div className="flex flex-col space-y-2">
            <label>
              <p className="mb-1 text-[1rem] text-richblack-5">
                Quantity <sup className="text-pink-500">*</sup>
              </p>
            </label>
            <input
              type="text"
              placeholder="Enter The Quantity Available With Units"
              {...register("quantity", { required: true })}
              className="form-style w-full border-2 p-2 rounded-lg"
            />
            {errors.quantity && (
              <span className="text-pink-200 text-xs">Quantity Is Required**</span>
            )}
          </div>

          {/* Receiving Option */}
          <div className="flex flex-col space-y-2">
            <label>
              <p className="mb-1 text-[1rem] text-richblack-5">
                Receiving Option <sup className="text-pink-500">*</sup>
              </p>
            </label>
            <select
              {...register("receivingOption", { required: true })}
              className="form-style w-full border-2 p-2 rounded-lg"
            >
              <option value="">Select A Receiving Option</option>
              {delivery.map((del, index) => (
                <option key={index} value={del}>
                  {del}
                </option>
              ))}
            </select>
            {errors.receivingOption && (
              <span className="text-pink-200 text-xs">Receiving Option Is Required**</span>
            )}
          </div>

          {/* Preferred Pickup Time */}
          <div className="flex flex-col space-y-2">
            <label>
              <p className="mb-1 text-[1rem] text-richblack-5">
                Preferred Time <sup className="text-pink-500">*</sup>
              </p>
            </label>
            <input
              type="text"
              placeholder="Enter Preferred Pick Up Time"
              {...register("prefferedPickUpTime", { required: true })}
              className="form-style w-full border-2 p-2 rounded-lg"
            />
            {errors.prefferedPickUpTime && (
              <span className="text-pink-200 text-xs">Preferred Pick-Up Time Is Required**</span>
            )}
          </div>
           {/* Phone Number */}
           <div className="flex flex-col space-y-2">
            <label>
              <p className="mb-1 text-[1rem] text-richblack-5">
                Phone Number <sup className="text-pink-500">*</sup>
              </p>
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              {...register("phonenumber", {
                required: "Phone Number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number",
                },
              })}
              className="form-style w-full border-2 p-2 rounded-lg"
            />
            {errors.phonenumber && (
              <span className="text-pink-200 text-xs">{errors.phonenumber.message}</span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-x-2">
            {editRecepient && (
              <button
                disabled={loading}
                onClick={() => navigate("/dashboard/my-profile")}
                className="rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
              >
                Continue Without Saving
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
            >
              {!editRecepient ? "Save" : "Save Changes"}
            </button>
          </div>
        </form>
      ) : (
        <div className="text-yellow-200">You are not approved to submit this form.</div>
      )}
    </div>
  );
}

export default AddRecepientDetailsForm;
