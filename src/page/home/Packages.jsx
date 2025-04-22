// import { GoCheck } from "react-icons/go";

// import { useGetAllPackageQuery, usePaymentCheckoutMutation, usePlanDetailsQuery } from "../../redux/features/baseApi";
// import { toast } from "react-toastify";

// const Packages = () => {
// const {data:packages} = useGetAllPackageQuery();
// const [paymentCheckout] = usePaymentCheckoutMutation();
// const {data:activatedPlan} = usePlanDetailsQuery()
// console.log("plan", activatedPlan)



// const handleSelectedId = async (planId)=>{
//   console.log(planId);


//   try {

//     const response = await paymentCheckout(planId).unwrap();
//     console.log("----",response);

//     toast.success("Subscription request processed! Redirecting...", {
//       position: "top-right",
//       autoClose: 3000,
//     });
//     window.location.href = response?.checkout_url;

    
//   } catch (error) {
//     console.log('error subcription', error)
//     toast.error(`Failed to process subscription. ${error?.data?.detail || "Please try again."}`, {
//       position: "top-right",
//       autoClose: 3000,
//     });
//   }
// }
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#221F42] p-4">
//       <div className="container p-10 py-20 w-full shadow-md bg-gray-100 dark:bg-[#1E1C3B] shadow-gray-900 rounded-lg">
//         <h2 className="text-3xl text-gray-900 dark:text-[#D0CDEF] font-semibold text-center mb-8">Packages</h2>

   

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:px-20 mx-auto">
//         {packages?.map((plan) => (
//    <div key={plan?.id} className="bg-gray-200 dark:bg-[#15132F] py-10">
//    <div className="overflow-hidden relative">
//      <div className="dark:bg-none py-3 px-6 relative w-2/3 rounded-r-lg"
//      style={{
//        backgroundImage: "url('https://i.ibb.co.com/pvsQKNHj/Vector-63.png')",
//        backgroundSize: "cover",
//        backgroundPosition: "center",
//        backgroundRepeat: "no-repeat"
//      }}
//      >
//        <h3 className="text-gray-900 dark:text-white font-medium">{plan?.name}</h3>
//      </div>

//      <div className="p-6">
//        <div className="mb-6">
//          <div className="flex items-end">
//            <span className="text-4xl font-bold text-gray-900 dark:text-white">3</span>
//            <span className="text-sm text-gray-700 dark:text-white ml-2 mb-1">Query/Day</span>
//          </div>
//          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Measurable results</p>
//        </div>

//        <button 
//        type="submit"
//        onClick={()=>handleSelectedId(plan?.id)}
//        className="w-full cursor-pointer bg-gray-300 dark:bg-[#2c1f52] text-gray-900 dark:text-white py-2 rounded-md mb-4">
//          Select
//        </button>

//        <p className="text-gray-600 dark:text-gray-400 text-xs mb-6">Contact us for more details</p>

//        <div className="mb-4">
//          <div className="flex items-center mb-2">
//            <span className="text-gray-900 dark:text-white font-medium">Features</span>
//            <div className="ml-2 w-5 h-5 rounded-full bg-blue-300 dark:bg-[#ABA9E6] flex items-center justify-center">
//              <span className="text-black font-semibold text-base">
//                <GoCheck />
//              </span>
//            </div>
//          </div>

//          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
//            <li>Includes general source databases</li>
//            <li>Limited free queries per full day</li>
//            <li>No access to specific company or private databases</li>
//          </ul>
//        </div>
//      </div>
//    </div>
//  </div>
//   ))}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Packages;

import { GoCheck } from "react-icons/go";
import { useGetAllPackageQuery, usePaymentCheckoutMutation, usePlanDetailsQuery } from "../../redux/features/baseApi";
import { toast } from "react-toastify";

const Packages = () => {
  const { data: packages } = useGetAllPackageQuery();
  const [paymentCheckout] = usePaymentCheckoutMutation();
  const { data: activatedPlan } = usePlanDetailsQuery();
  console.log("plan", activatedPlan);

  const handleSelectedId = async (planId) => {
    console.log(planId);

    try {
      const response = await paymentCheckout(planId).unwrap();
      console.log("----", response);

      toast.success("Subscription request processed! Redirecting...", {
        position: "top-right",
        autoClose: 3000,
      });
      window.location.href = response?.checkout_url;
    } catch (error) {
      console.log("error subscription", error);
      toast.error(`Failed to process subscription. ${error?.data?.detail || "Please try again."}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#221F42] p-4">
      <div className="container md:p-10 md:py-20 w-full shadow-md bg-gray-100 dark:bg-[#1E1C3B] shadow-gray-900 rounded-lg">
        <h2 className="text-3xl text-gray-900 dark:text-[#D0CDEF] font-semibold text-center mb-8 mt-5 md:mt-0">Packages</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:px-20 mx-auto">
          {packages?.map((plan) => {
            // Check if the current plan is the activated one
            const isPlanActive = activatedPlan?.is_active && activatedPlan?.plan === plan?.id;

            return (
              <div key={plan?.id} className="bg-gray-200 dark:bg-[#15132F] py-10">
                <div className="overflow-hidden relative">
                  <div
                    className="dark:bg-none py-3 px-6 relative w-2/3 rounded-r-lg"
                    style={{
                      backgroundImage: "url('https://i.ibb.co.com/pvsQKNHj/Vector-63.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <h3 className="text-gray-900 dark:text-white font-medium">{plan?.name}</h3>
                  </div>

                  <div className="p-6">
                    <div className="mb-6">
                      <div className="flex items-end">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan?.message_limit || 3}</span>
                        <span className="text-sm text-gray-700 dark:text-white ml-2 mb-1">Query/Day</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Measurable results</p>
                    </div>

                    {isPlanActive ? (
                      <div className="w-full cursor-pointer text-center bg-[#2c1f52] text-white py-2 rounded-md mb-4">
                        Activated
                      </div>
                    ) : (
                      <button
                        type="submit"
                        onClick={() => handleSelectedId(plan?.id)}
                        disabled={activatedPlan?.is_active} // Disable if any plan is active
                        className={`w-full cursor-pointer py-2 rounded-md mb-4 ${
                          activatedPlan?.is_active
                            ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                            : "bg-gray-300 dark:bg-[#2c1f52] text-gray-900 dark:text-white"
                        }`}
                      >
                        Select
                      </button>
                    )}

                    <p className="text-gray-600 dark:text-gray-400 text-xs mb-6">Contact us for more details</p>

                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <span className="text-gray-900 dark:text-white font-medium">Features</span>
                        <div className="ml-2 w-5 h-5 rounded-full bg-blue-300 dark:bg-[#ABA9E6] flex items-center justify-center">
                          <span className="text-black font-semibold text-base">
                            <GoCheck />
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <li>Includes general source databases</li>
                        <li>Limited free queries per full day</li>
                        <li>No access to specific company or private databases</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Packages;