import  { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../features/auth/authSlice";
import { useGetCartQuery, useRemoveTocartMutation } from "../features/cart/cartApiSlice";
import { productitem, setcartCredentials } from "../features/cart/cartSlice";
import useFetch from "../features/cart/common";
import "./cart.css";

interface Iprops {
    cart1:any;
    setcartCredentials:any;
}
const Cart:React.FC<Iprops> = ({cart1,setcartCredentials}) => {
const [rmverror, setRmverror] = useState<string>("")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, errMsg,getMsg] =useFetch()
   const [removeTocart]  =useRemoveTocartMutation()
   
   console.log("errorrr",errMsg,rmverror)
  const {
    data:cart,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCartQuery();


  
    setcartCredentials({...cart})
   useEffect(()=>{

   },[])
  //  const cart = useSelector(selectCart)
   console.log("cartformquery",cart1)
  let URL = "http://localhost:8080"
  const handleAddproduct = ({  productId,
    quantity,
  }: {
    productId: string;
    quantity: number;})=>{
    getMsg({productId,quantity})
  }
const handleRemoveitem =async (productId:string)=>{
  try {
    const removecartData = await removeTocart({productId}).unwrap();
 console.log("removeFrom cart:",removecartData)
//  dispatch(apiSlice.util.resetApiState());

  } catch (err: any) {
    if (!err?.originalStatus) {
      // isLoading: true until timeout occurs
      setRmverror("No Server Response");
    } else if (err.originalStatus === 400) {
      setRmverror("Missing Username or Password");
    } else if (err.originalStatus === 401) {
      setRmverror("Unauthorized");
    } else {
      setRmverror("Login Failed");
    }
  }


}


  return (
    <>
      {isLoading && <div style={{ marginTop: "100px" }}> Loading....</div>}
      {isError && (
        <p
          className={error ? "text-danger" : "offscreen"}
          aria-live="assertive"
          style={{ marginTop: "100px" }}
        >
          {JSON.stringify(error)}
        </p>
      )}
      {isSuccess && (
        <div className="card " style={{ marginTop: "100px" }}>
          <div className="row">
            <div className="col-md-8 cart1">
              <div className="title">
                <div className="row">
                  <div className="col">
                    <h4>
                      <b>Shopping Cart</b>
                    </h4>
                  </div>
                  <div className="col align-self-center text-right text-muted">
                    3 items
                  </div>
                </div>
              </div>

              {cart?.items?.map((product: productitem) => (
                <div className="row border-top border-bottom" key={product?.name}>
                  <div className="row main align-items-center">
                    <div className="col-2">
                      <img
                        className="img-fluid"
                        src={`${URL}${product.productPictures[0].img}`}
                        alt=""
                      />
                    </div>
                    <div className="col">
                      <div className="row text-muted">{product.name}</div>
                      <div className="row">{product.description}</div>
                    </div>
                    <div className="col">
                      <span className="m" onClick={()=>handleRemoveitem(product.productId)}>-</span>
                      <span>{product.quantity}</span>
                      <span onClick={()=>handleAddproduct({ productId: product.productId, quantity: 1 })}> + </span>
                    </div>
                    <div className="col">
                       {product.price}₹{" "}
                      <span className="close">
                        <i className="fa fa-close"></i>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="back-to-shop">
                <Link to="/product"><i className="fa-solid fa-arrow-left"></i></Link>
                <span className="text-muted">Back to shop</span>
              </div>
            </div>
            <div className="col-md-4 summary">
              <div>
                <h5>
                  <b>Summary</b>
                </h5>
              </div>
              <hr />
              <div className="row">
                <div className="col">ITEMS 3</div>
                <div className="col text-right"> {cart?.subTotal} ₹</div>
              </div>

              <div className="row totalprice">
                <div className="col">TOTAL PRICE</div>
                <div className="col text-right"> {cart?.subTotal} ₹</div>
              </div>
              <button className="btn btn btn-dark">CHECKOUT</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state:RootState)=>{
  return {
    cart1:state.api.queries.getCart?.data
  }
}

const mapDispatchToProps = {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  setcartCredentials
}
export default  connect(mapStateToProps, mapDispatchToProps)(Cart);
