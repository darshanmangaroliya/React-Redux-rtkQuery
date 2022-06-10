import { Link } from "react-router-dom";
import { useGetCartQuery } from "../features/cart/cartApiSlice";
import useFetch from "../features/cart/common";
import { Product, useGetProductsQuery } from "../features/product/productApiSlice";

const ProductList = () => {
 

 const [msg, errMsg,getMsg] =useFetch()

const handleAddproduct = ({  productId,
  quantity,
}: {
  productId: string;
  quantity: number;})=>{
  getMsg({productId,quantity})
}
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsQuery();
  const {
    data:cart,
    
  } = useGetCartQuery();


 const productIdArrayOfCart = cart?.items.map((e)=>e.productId)

  let URL = "http://localhost:8080"
  let content = <></>;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = (
      <>
        <div className="wrapper">
          <div className="container ">
          {errMsg && (
            <p
              className={errMsg ? "text-danger" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
          )}            
          {msg && (
            <p
              className={msg ? "text-success" : "offscreen"}
              aria-live="assertive"
            >
              {msg}
            </p>
          )}            
          
          <div className="row g-3">
              <h1>Product List</h1>{" "}
              {products.map((product: Product) => {
                return (
                  <div className="col-md-3" key={product._id}>
                    <div className="card p-3">
                      <div className="text-center">
                        <img
                          src={`${URL}${product?.productPictures[0].img}`}
                          width="200"
                          alt={product.name}
                        />
                      </div>

                      <div className="product-details">
                        <span className="font-weight-bold d-block mb-2">Name :{product.name}</span>
                        <span>Price : {product.price}₹</span>

                        <div className="buttons d-flex flex-row">
                          {/* <div className="cart">
                            <i className="fa fa-shopping-cart"></i>
                          </div>{" "} */}
                          <button className="btn btn-success cart-button btn-block" onClick={()=>handleAddproduct({ productId: product._id, quantity: 1 })}>
                           {productIdArrayOfCart?.includes(product._id)?"added":"Add to cart"}
                          </button>
                        </div>

                        
                      </div>
                    </div>
                  </div>
                );
              })}
             
            </div>
          </div>
        </div>{" "}
        <Link to="/welcome">Back to Welcome</Link>)
      </>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};
export default ProductList;
