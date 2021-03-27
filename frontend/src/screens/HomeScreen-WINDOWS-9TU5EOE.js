import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
/*import data from '../data'; */
//import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import { listProducts } from '../actions/productActions';
//import ProductScreen from './ProductScreen';

function HomeScreen (props){

   // const [products, setProduct] = useState([]); // instead of getting data using useState, we use useSelector
    const productList = useSelector(state => state.productList);
    const {products, loading, error} = productList;
    const dispatch = useDispatch();


    useEffect (() => { // instead of fetch data we need to dipatch an action
       dispatch(listProducts());
         
       /* const fetchData= async () => {
            const {data}= await axios.get("/api/products"); /*render data between {} because the object returned from axio.get has data value  */
        //    setProduct(data)
       // } /* axios library only used to fetch data from server */
       // fetchData(); 
        return () => {
            
        };
    }, []) /* an empty array means that 'effect' only run at component did mont when all your stuff inside render are rendered */
    return  loading? <div>Loading ...</div> :
    error? <div>{error}</div>:
    <ul className="products">
    { 
        products.map (product =>
        <li key={product._id}>  
            <div className="product">
            <Link to={'/product/' + product._id}><img className="product-image" src={product.image} alt="product"/></Link>

                
                <div className="product-name">
                    <Link to={'/product/' + product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">{product.rating} Stars ({product.numReivews})</div>
            </div>
        </li>)
            }
      </ul>
}
export default HomeScreen;