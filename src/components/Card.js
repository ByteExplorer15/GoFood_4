import React, { useState, useRef, useEffect } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'
export default function Card(props) {

    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();

    let options = props.options;
    let priceOptions = Object.keys(options);
    
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")

    const handleAddToCart= async()=>{
        let food = []
       for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
       }
     }
      
     if (food !== []){         
        if (food.size === size) {
          await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
          return
        }

      else if (food.size !== size){
        await dispatch({ type: "ADD", id:props.foodItem._id, name:props.foodItem.name, price: finalPrice, qty: qty, size: size })
        return  
    }// await console.log(data);
         
       return
    }

    await dispatch({ type: "ADD", id:props.foodItem._id, name:props.foodItem.name, price: finalPrice, qty: qty, size: size })
}
   
let finalPrice = qty * parseInt(options[size]);   //This is where Price is changing
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    
    return (
        <div>
            <div>
                <div className="card mt-3" style={{ width: "18rem", minHeight: "190px" }}>
                    <img src={props.foodItem.img} className="card-img-top" alt=".." style={{ objectFit: "cover", height: "180px" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>   {/*card tile ko change hua*/}
                        {/* <p className="card-text">This is some important text.</p> */}
                        <div className="container w-100">
                            <div className="d-flex justify-content-between align-items-center">
                                <select className="form-select bg-success text-white rounded" style={{ width: "60px", marginRight: "10px" }} onChange={(e) => setQty(e.target.value)}>
                                    {Array.from(Array(6), (e, i) => {
                                        return (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        );
                                    })}
                                </select>

                                <select className="form-select bg-success text-white rounded" style={{ width: "80px", marginRight: "10px" }} ref={priceRef} onChange={(e) => setSize(e.target.value)}>

                                {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                                 })}

                                </select>

                                <div className="fs-30" style={{ whiteSpace: "nowrap" }}> ₹{finalPrice}/- </div>
                            </div>
                            <hr></hr>
                            <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart}>Add to Cart</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
