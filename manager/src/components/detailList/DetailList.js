import {useState, useEffect, useRef} from 'react';
import {getAllData, addData, removeData, updateData} from '../../modules/requests';

function DetailList(){
    const link = process.env.REACT_APP_MY_LINK;
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({warehouse: 0, detail: 0, count: 0});
    const [modalVisible, setModalVisible] = useState(false);
    const isMountedRef = useRef(false);
    const [validity, setValidity] = useState({
        warehouse: true,
        detail: true,
        count: true,
      });

    useEffect(() => {
        if (isMountedRef.current) {
            return;
        }
        GetAllData();
        isMountedRef.current = true;
    }, [])

     //ПОЛУЧЕНИЕ ВСЕХ СПИСКОВ
     async function GetAllData(){
        const result = await getAllData(`${link}/detailList`);
        console.log(result)
        setData(result);
    }   
    //ДОБАВЛЕНИЕ
    async function AddData(){
        setValidity({warehouse: true, detail: true, count: true})
        if(validate()){
            const {warehouse, detail, count} = editData;
            const result = await addData(`${link}/detailList?warehouseId=${warehouse}&detailId=${detail}&count=${count}`);
            setData([...data, result]);
            setModalVisible(false);
            setEditData({warehouse: 0, detail: 0, count: 0});
            setValidity({warehouse: true, detail: true, count: true})
        }
    };
    //УДАЛЕНИЕ
    async function RemoveData(id){
        const result = await removeData(`${link}/detailList/${id}`);
        if(result){
            const newData = data.filter(item => item.id !== id);
            setData(newData);
        }
    }    
     //ОБНОВЛЕНИЕ
     async function UpdateData() {
        setValidity({warehouse: true, detail: true, count: true})
        if(validate()){
            const {id, warehouse, detail, count} = editData;
            const result = await updateData(`${link}/detailList/${id}?warehouseId=${warehouse}&detailId=${detail}&count=${count}`);
                if(result){
                    const newData = [...data];
                    const index = newData.findIndex(item => item.id === Number(id));
                    newData[index] = {id: Number(id), warehouse: warehouse, detail: detail, count: count};
                    setData(newData);
                }
            setModalVisible(false);
            setEditData({warehouse: 0, detail: 0, count: 0});
        }       
      }
    function EditData(item){
        setModalVisible(true);
        setEditData(item);
        setValidity({warehouse: true, detail: true, count: true})
    }
    function Cancel(){
        setModalVisible(false);
        setEditData({warehouse: 0, detail: 0, count: 0});
    }

    function validate() {
        let isValid = true;
        if (!editData.warehouse || editData.warehouse < 1) {
          isValid = false;
          setValidity((prevValidity) => ({ ...prevValidity, warehouse: false }));
        }
        if (!editData.detail || editData.detail < 1) {
            isValid = false;
            setValidity((prevValidity) => ({ ...prevValidity, detail: false }));
        }
        if (!editData.count || editData.count < 0) {
            isValid = false;
            setValidity((prevValidity) => ({ ...prevValidity, count: false }));
        }
        return isValid;
      }
    return(
        <div className='content'>
            {modalVisible && (
            <div className='content__modal'>
                <div className='content__block-modal'>
                    <button className='content__cancel-btn-modal' onClick={Cancel}>X</button>
                    <p style={{margin:5}}>Warehouse ID</p>
                    <input className={!validity.warehouse ? "main-input-invalid": "main-input"} type={'number'} placeholder='Warehouse ID...' value={editData.warehouse} onChange={(e) => setEditData({...editData, warehouse: e.target.value})}></input>
                    <p style={{margin:5}}>Detail ID</p>
                    <input className={!validity.detail ? "main-input-invalid": "main-input"} type={'number'} placeholder='Detail Id...' value={editData.detail} onChange={(e) => setEditData({...editData, detail: e.target.value})}></input>
                    <p style={{margin:5}}>Count</p>
                    <input className={!validity.count ? "main-input-invalid": "main-input"} type={'number'} placeholder='Count...' value={editData.count}  onChange={(e) => setEditData({...editData, count: e.target.value})}></input>
                    {!editData.id ? 
                    <button className='content__add-btn-modal main-btn' onClick={AddData}>Add</button> :
                    <button className='content__update-btn-modal main-btn' onClick={UpdateData}>Update</button>
                    }
                    
                </div>
            </div>
            )}

            <button className='content__btn-add main-btn' onClick={() => {
                setModalVisible(true);
                setValidity({warehouse: true, detail: true, count: true})
                }}>Add Data</button>
            {!data ? (<span className='table__no-connect'>No category found</span>) : 
               <div className='content__block-main'>
                  <table className='table'>
                    <tr>
                      <th className='table-point'>ID</th>
                      <th className='table-point'>Warehouse ID</th>
                      <th className='table-point'>Detail ID</th>
                      <th className='table-point'>Count</th>
                      <th className='table-point'>Remove</th>
                      <th className='table-point'>Update</th>
                    </tr>
                    {!data ? (<span style={{fontSize: "2rem", margin:"5%"}}>No detail found</span>) : 
                      data.map((item) => {
                        return (
                          <tr key={item.id}>
                             <th>{item.id}</th>
                              <th>{item.warehouse}</th>
                              <th>{item.detail}</th>
                              <th>{item.count}</th>
                              <th><button className="table-btn main-btn" onClick={() => RemoveData(item.id)}>Remove</button></th>
                              <th><button className="table-btn main-btn" onClick={() => EditData(item)}>Update</button></th>
                            </tr>
                          );
                      })}  
                  </table>     
              </div>
            }
        </div>
              
    );
}

export default DetailList;