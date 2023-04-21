import { useState, useEffect, useRef } from "react";
import { getAllData } from "../modules/requests";

function CategoryDetails(){
    const link = process.env.REACT_APP_MY_LINK;
    const [details, setDetails] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState([]);
    const isMountedRef = useRef(false); 
    useEffect(() => {
        if (isMountedRef.current) {
          return;
        }
        GetData();
        isMountedRef.current = true;
      }, []);
      async function GetData() {
        const result = await getAllData(`${link}/category`);
        const detailsRes = await getAllData(`${link}/detail`);
        setCategories(result);
        setDetails(detailsRes);
      }
      const FindDetail = async (catId) => {
        setSelected(catId);
        const result = await getAllData(`${link}/detail?catId=${catId}`);
        setDetails(result);
      }
      const selectedStyles = {
        backgroundColor: "#2b3554",
      };
      return (
        <>
        <div>
            {!categories ? ( <span className='table__no-connect'>No category found</span> ) :
        <div className='content__block-main'>
          <table className='table'>
              <tr>
                <th className='table-point'>Category</th>
              </tr>
        {(
          categories
            .map((item) => {
              return (
                <tr key={item.id} onClick={() => FindDetail(item.id)}>
                    <th style={selected == item.id ? selectedStyles : null}>{item.name}</th>
                 </tr>
              );
            })
        )}
        </table> 
      </div>
}
        </div>

        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            <div style={{color: "white", alignSelf: 'center', marginTop: "5%"}}>DETAILS</div>
            {!details ? ( <span className='table__no-connect'>No detail found</span> ) :
        <div className='content__block-main'>
          <table className='table'>
              <tr>
                    <th className='table-point'>model</th>
                    <th className='table-point'>vendorCode</th>
                    <th className='table-point'>description</th>
                    <th className='table-point'>compatibleVehicles</th>
              </tr>
        {(
          details
            .map((item) => {
              return (
                <tr key={item.id}>
                 <th>{item.model}</th>
                 <th>{item.vendorCode}</th>
                 <th>{item.description}</th>
                 <th>{item.compatibleVehicles}</th>
                 </tr>
              );
            })
        )}
        </table> 
      </div>
}
        </div>
        </>
    );
}

export default CategoryDetails;