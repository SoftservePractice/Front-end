import {useState, useEffect, useRef} from 'react';
import {getAllData, addData, removeData, updateData} from '../../modules/requests';

function DetailList(){
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({warehouseId: 0, detailId: 0, count: 0});
    const [modalVisible, setModalVisible] = useState(false);
    const isMountedRef = useRef(false);
    const [validity, setValidity] = useState({
        warehouseId: true,
        detailId: true,
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
        const result = await getAllData("http://egorhi-001-site1.htempurl.com/detailList");
        console.log(result)
        setData(result);
    }   
    //ДОБАВЛЕНИЕ
    async function AddData(){
        setValidity({warehouseId: true, detailId: true, count: true})
        if(validate()){
            const {warehouseId, detailId, count} = editData;
            const result = await addData(`http://egorhi-001-site1.htempurl.com/detailList?warehouseId=${warehouseId}&detailId=${detailId}&count=${count}`);
            setData([...data, result]);
            setModalVisible(false);
            setEditData({warehouseId: 0, detailId: 0, count: 0});
            setValidity({warehouseId: true, detailId: true, count: true})
        }
    };
    //УДАЛЕНИЕ
    async function RemoveData(id){
        const result = await removeData(`http://egorhi-001-site1.htempurl.com/detailList/${id}`);
        if(result){
            const newData = data.filter(item => item.id !== id);
            setData(newData);
        }
    }    
     //ОБНОВЛЕНИЕ
     async function UpdateData() {
        setValidity({warehouseId: true, detailId: true, count: true})
        if(validate()){
            const {id, warehouseId, detailId, count} = editData;
            const result = await updateData(`http://egorhi-001-site1.htempurl.com/detailList/${id}?warehouseId=${warehouseId}&detailId=${detailId}&count=${count}`);
                if(result){
                    const newData = [...data];
                    const index = newData.findIndex(item => item.id === Number(id));
                    newData[index] = {id: Number(id), warehouseId: warehouseId, detailId: detailId, count: count};
                    setData(newData);
                }
            setModalVisible(false);
            setEditData({warehouseId: 0, detailId: 0, count: 0});
        }       
      }
    function EditData(item){
        setModalVisible(true);
        setEditData(item);
        setValidity({warehouseId: true, detailId: true, count: true})
    }
    function Cancel(){
        setModalVisible(false);
        setEditData({warehouseId: 0, detailId: 0, count: 0});
    }

    function validate() {
        let isValid = true;
        if (!editData.warehouseId || editData.warehouseId < 1) {
          isValid = false;
          setValidity((prevValidity) => ({ ...prevValidity, warehouseId: false }));
        }
        if (!editData.detailId || editData.detailId < 1) {
            isValid = false;
            setValidity((prevValidity) => ({ ...prevValidity, detailId: false }));
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
                    <input className={!validity.warehouseId ? "main-input-invalid": "main-input"} type={'number'} placeholder='Warehouse ID...' value={editData.warehouseId} onChange={(e) => setEditData({...editData, warehouseId: e.target.value})}></input>
                    <input className={!validity.detailId ? "main-input-invalid": "main-input"} type={'number'} placeholder='Detail Id...' value={editData.detailId} onChange={(e) => setEditData({...editData, detailId: e.target.value})}></input>
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
                setValidity({warehouseId: true, detailId: true, count: true})
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
                              <th>{item.warehouseId}</th>
                              <th>{item.detailId}</th>
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