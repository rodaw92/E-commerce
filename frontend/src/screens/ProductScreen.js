import react from 'react';

function ProductScreen (props){
    console.log(props.match.params.id)
    return  <div>ProductScreen</div>
}

export default ProductScreen;