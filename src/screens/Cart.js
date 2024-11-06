import React from 'react'
// import Delete from '@material-ui/icons/Delete'
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
        //   <div>
        //     {/* <div className='m-5 w-100 text-center  fs-3'>The Cart is Empty!</div> */}
            
        //   </div>
        
     <div className='m-5 w-100 text-center fs-3' style={{ color: 'white' }}> 
     The Cart is Empty!
     </div>

    )
  }
  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("https://gofood1-qin5.onrender.com/api/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("Order Response:", response)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div >

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
  <table className='table table-hover'>
    <thead style={{ borderBottom: '2px solid white' }}>
      <tr>
        <th className='text-success fs-4' scope='col'>#</th>
        <th className='text-success fs-4' scope='col'>Name</th>
        <th className='text-success fs-4' scope='col'>Quantity</th>
        <th className='text-success fs-4' scope='col'>Option</th>
        <th className='text-success fs-4' scope='col'>Amount</th>
        <th className='text-success fs-4' scope='col'></th>
      </tr>
    </thead>
    <tbody>
      {data.map((food, index) => (
        <tr key={index}>
          <th scope='row' className='text-success'>{index + 1}</th> {/* Make index green */}
          <td className='text-white'>{food.name}</td> {/* Make food name white */}
          <td className='text-white'>{food.qty}</td> {/* Make quantity value white */}
          <td className='text-white'>{food.size}</td> {/* Make option value white */}
          <td className='text-white'>{food.price}</td> {/* Make price white */}
          <td>
            <button type="button" className="btn p-0 text-white">
              <DeleteIcon onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div> {/* Make total price white */}
  <div>
    <button className='btn bg-success mt-5' onClick={handleCheckOut}> Check Out </button>
  </div>
</div>




    </div>
  )
}