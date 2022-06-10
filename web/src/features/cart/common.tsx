import { useState } from "react";
import { useAddTocartMutation } from "./cartApiSlice";


function useFetch(
  
    ) {
    const [addTocart] = useAddTocartMutation();
  const [errMsg, setErrMsg] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const getMsg = async ({
    productId,
    quantity,
  }: {
    productId: string;
    quantity: number;
  }) => {
    try {
      const productmsg = await addTocart({ productId, quantity }).unwrap();
      setMsg(productmsg.message);
      console.log("productmsg:", productmsg);
      setErrMsg("");
      // navigate("/welcome");
    } catch (err: any) {
      setMsg("");
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };
  
  return [msg, errMsg,getMsg] as const;
}
export default useFetch