import { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import styles from "../../App.css";
import {getAllData,addData,removeData,updateData} from "../../modules/requests";
import './Detail.css';
function Detail() {
    const link = process.env.REACT_APP_MY_LINK;
    const [data, setData] = useState(null);
    const [editData, setEditData] = useState({model: '', vendorCode: '', description: '', compatibleVehicles: '', category: 0});
    const [modalVisible, setModalVisible] = useState(false);
    const isMountedRef = useRef(false);
    const [validity, setValidity] = useState({
        model: true,
        vendorCode: true,
        description: true,
        compatibleVehicles: true,
        category: true,
      });

  useEffect(() => {
    if (isMountedRef.current) {
      return;
    }
    GetAllData();
    isMountedRef.current = true;
  }, []);

  //ПОЛУЧЕНИЕ ВСЕХ ДЕТАЛЕЙ
  async function GetAllData() {
    const result = await getAllData(`${link}/detail`);
    console.log(result)
    setData(result);
  }
  //ДОБАВЛЕНИЕ
  async function AddData() {
    setValidity({model: true, vendorCode: true,description: true,compatibleVehicles: true,category: true})
    if(validate()){
        const {model, vendorCode, description, compatibleVehicles, category} = editData;
        const result = await addData(`${link}/detail?model=${model}&vendorCode=${vendorCode}&description=${description}&compatibleVehicles=${compatibleVehicles}$category=${category}`);
        setData([...data, result]);
        setModalVisible(false);
        setEditData({model: '', vendorCode: '', description: '', compatibleVehicles: '', category: 0});
    }
  }
  //УДАЛЕНИЕ
  async function RemoveData(id) {
    console.log(id)
    const result = await removeData( `${link}/detail/${id}`);
    if (result) {
      const newData = data.filter((item) => item.id !== id);
      setData(newData);
    }
  }
  //ОБНОВЛЕНИЕ
  async function UpdateData() {
    setValidity({model: true, vendorCode: true,description: true,compatibleVehicles: true,category: true})
    if(validate()){
        const {id, model, vendorCode, description, compatibleVehicles, category} = editData;
        const result = await updateData(`${link}/detail/${id}?model=${model}&vendorCode=${vendorCode}&description=${description}&compatibleVehicles=${compatibleVehicles}$category=${category}`);
            if(result){
                const newData = [...data];
                const index = newData.findIndex(item => item.id === Number(id));
                newData[index] = {id: Number(id), model: model, vendorCode: vendorCode, description: description, compatibleVehicles: compatibleVehicles, category: Number(category)};
                setData(newData);
            }
        setModalVisible(false);
        setEditData({model: '', vendorCode: '', description: '', compatibleVehicles: '', category: 0});
    }    
  }
  function EditData(item){
    setModalVisible(true);
    setEditData(item);
    setValidity({model: true, vendorCode: true,description: true,compatibleVehicles: true,category: true})
  }
function Cancel(){
    setModalVisible(false);
    setEditData({model: '', vendorCode: '', description: '', compatibleVehicles: '', category: 0});
}
function validate() {
    let isValid = true;
    if (!editData.model) {
      isValid = false;
      setValidity((prevValidity) => ({ ...prevValidity, model: false }));
    }
    if(!editData.vendorCode){
        isValid = false;
        setValidity((prevValidity) => ({ ...prevValidity, vendorCode: false }));
    }
    if(!editData.description){
        isValid = false;
        setValidity((prevValidity) => ({ ...prevValidity, description: false }));
    }
    if(!editData.compatibleVehicles){
        isValid = false;
        setValidity((prevValidity) => ({ ...prevValidity, compatibleVehicles: false }));
    }
    if(!editData.category || editData.category < 1){
        isValid = false;
        setValidity((prevValidity) => ({ ...prevValidity, category: false }));
    }
    return isValid;
  }
  return (
    <div className='content'>
      {modalVisible && (
         <div className='content__modal'>
           <div className='content__block-modal'>
           <button className='content__cancel-btn-modal' onClick={Cancel}>X</button>

                    <input placeholder='Model...' value={editData.model} 
                    className={!validity.model ? "main-input-invalid": "main-input"}
                    onChange={(e) => setEditData({...editData, model: e.target.value})}></input>

                    <input placeholder='Vendor Code...' value={editData.vendorCode} 
                    className={!validity.vendorCode ? "main-input-invalid": "main-input"}
                    onChange={(e) => setEditData({...editData, vendorCode: e.target.value})}></input>

                    <input placeholder='Description...' value={editData.description}
                    className={!validity.description ? "main-input-invalid": "main-input"} 
                    onChange={(e) => setEditData({...editData, description: e.target.value})}></input>

                    <input placeholder='Compatible Vehicles...' value={editData.compatibleVehicles} 
                    className={!validity.compatibleVehicles ? "main-input-invalid": "main-input"} 
                    onChange={(e) => setEditData({...editData, compatibleVehicles: e.target.value})}></input>

                    <input type={'number'} placeholder='Category ID...' value={editData.category} 
                    className={!validity.category ? "main-input-invalid": "main-input"} 
                    onChange={(e) => setEditData({...editData, category: e.target.value})}></input>

            {!editData.id ? (
              <button className='content__add-btn-modal main-btn' onClick={AddData}>
                Add
              </button>
            ) : (
              <button className='content__update-btn-modal main-btn' onClick={UpdateData}>
                Update
              </button>
            )}
          </div>
        </div>
      )}
      
      <div className='content__block-main main-block'>
      {!data ? (<span className='table__no-connect'>No detail found</span>) : 
          <div className='content__block-main'>
          <table className='table'>
              <tr>
              
                <th className='table-point'>Model</th>
                <th className='table-point'>Vendor Code</th>
                <th className='table-point'>Description</th>
                <th className='table-point'>Compatible Vehicles</th>
                <th className='table-point'>Category id</th>
                <th className='table-point'>Remove</th>
                <th className='table-point'>Update</th>
              </tr>
        {(
         data.map((item) => {
          return (
            <tr key={item.id}>
             <th>{item.model}</th>
             <th>{item.vendorCode}</th>
             <th>{item.description}</th>
             <th>{item.compatibleVehicles}</th>
             <th>{item.category}</th>
             <th> <button className="table-btn main-btn" onClick={() => RemoveData(item.id)}>Remove</button></th>
             <th><button className="table-btn main-btn" onClick={() => EditData(item)}>Update</button> </th>
             </tr>
          );
        })
    )}
    </table> 
  </div>     
      }
    </div>
    </div>
)};

export default Detail;
