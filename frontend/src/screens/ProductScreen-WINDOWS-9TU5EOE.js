import React, { useEffect, useState } from 'react';
import data from '../data';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { detailsProduct } from '../actions/productActions';
 
function ProductScreen (props){
   // console.log(props.match.params.id);
   // const product = data.products.find(x => x._id === props.match.params.id);
   const [qty, setQty] = useState(1); // default value is 1
   const productDetails = useSelector(state => state.productDetails);
   const {product, loading, error} = productDetails;
   const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            //
        };
    }, []); //it is an empty array which means that the line after useEffect will be run after the stuff render into the screen
  const constHandleAddToCart = () => {
       props.history.push("/cart/" + props.match.params.id + "?qty=" + qty) // the method to redirect user to another url
   }
   return  <div>
            <div className="back-to-result">
                <Link to='/' >Back to result</Link>
            </div>
            {loading? <div>Loading ...</div>:
            error? <div>{error}</div>:
            (
                <div className="details">
                <div className="details-image">
                    <img src={product.image} alt="Product"></img>
                </div>
                <div className="details-info">
                    <ul>
                        <li>
                            <h4>{product.name}</h4>
                        </li>
                        <li>
                            {product.rating} Stars ({product.numReivews} Reviews)
                        </li>
                        <li>
                           Price: <b>${product.price}</b>
                        </li>
                        <li>
                            Description:
                            <div>
                                {product.description}
                            </div>
                        </li>
                    </ul>
                    </div>
                    <div className="details-action">
                        <ul>
                            <li>
                               Price: {product.price}
                            </li>
                            <li>
                               Status:  {product.countInStock>0? "In Stoke": "Out Of Stoke." }
                            </li>
                            <li>
                               Qty: <select value={qty} onChange= {(e) => {setQty(e.target.value)}}>
                             { [...Array(product.countInStock).keys()].map(x=>
                             <option key={x+1} value={x+1}>{x+1}</option> 
                                ) }
                               </select>
                            </li>
                            <li>
                                {product.countInStock>0 &&
                                <button onClick={constHandleAddToCart} className="button">
                                    Add to Cart
                                </button>}

                            </li>
                        </ul>
  
                    </div>
              </div>
            )
            

            }
        </div>
}
export default ProductScreen;