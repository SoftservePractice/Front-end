import { useState, useEffect, useRef } from "react";
import { getAllData } from "../modules/requests";

function TechnicianPage(){
    const link = process.env.REACT_APP_MY_LINK;
    const [value, setValue] = useState(0);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const isMountedRef = useRef(false);
    useEffect(() => {
        if (isMountedRef.current) {
          return;
        }
        GetData();
        isMountedRef.current = true;
      }, []);

      async function GetData() {
        const result = await getAllData(`${link}/order`);
        console.log(result);
        setData(result);
      }

    const FindOrder = async () => {
        const result = await data.filter(item => item.technician == value);
        setFilteredData(result);
    }
    return (
        <div>
            <div>
                <div style={{color: 'white'}}>Your ID</div>
                <input type="number" value={value} onChange={(event) => setValue(event.target.value)}></input>
                <button onClick={FindOrder}>Find</button>
            </div>
            {!filteredData ? ( <span className='table__no-connect'>No order found</span> ) :
        <div className='content__block-main'>
          <table className='table'>
              <tr>
                <th className='table-point'>ID</th>
                <th className='table-point'>Client ID</th>
                <th className='table-point'>Start Date</th>
                <th className='table-point'>End Date</th>
                <th className='table-point'>Final Price</th>
                <th className='table-point'>Car ID</th>
                <th className='table-point'>Car Mileage</th>
                <th className='table-point'>Appointment Time</th>
              </tr>
        {(
          filteredData
            .map((item) => {
              return (
                <tr key={item.id}>
                 <th>{item.id}</th>
                 <th>{item.client}</th>
                 <th>{item.start}</th>
                 <th>{item.end}</th>
                 <th>{item.finalPrice}</th>
                 <th>{item.car}</th>
                 <th>{item.carMileage}</th>
                 <th>{item.appointmentTime}</th>
                 </tr>
              );
            })
        )}
        </table> 
      </div>
}
        </div>
    );
}

export default TechnicianPage;