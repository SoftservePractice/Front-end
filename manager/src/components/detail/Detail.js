import { useState, useEffect, useRef } from "react";
import styles from "../../App.css";
import {getAllData,addData,removeData,updateData} from "../../modules/requests";
import './Detail.css';
function Detail() {
  const [filterModel, setFilterModel] = useState('');
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({model: '', vendorCode: '', description: '', compatibleVehicles: '', catId: 0});
    const [modalVisible, setModalVisible] = useState(false);
    const isMountedRef = useRef(false);
    const [validity, setValidity] = useState({
        model: true,
        vendorCode: true,
        description: true,
        compatibleVehicles: true,
        catId: true,
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
    const result = await getAllData("http://egorhi-001-site1.htempurl.com/detail");
    setData(result);
  }
  //ДОБАВЛЕНИЕ
   
  async function AddData() {
    setValidity({model: true, vendorCode: true,description: true,compatibleVehicles: true,catId: true})
    if(validate()){
        const {model, vendorCode, description, compatibleVehicles, catId} = editData;
        const result = await addData(`http://egorhi-001-site1.htempurl.com/detail?model=${model}&vendorCode=${vendorCode}&description=${description}&compatibleVehicles=${compatibleVehicles}$catId=${catId}`);
        setData([...data, result]);
        setModalVisible(false);
        setEditData({model: '', vendorCode: '', description: '', compatibleVehicles: '', catId: 0});
    }
  }
  //УДАЛЕНИЕ
  async function RemoveData(id) {
    const result = await removeData(
      `http://egorhi-001-site1.htempurl.com/detail/${id}`);
    if (result) {
      const newData = data.filter((item) => item.id !== id);
      setData(newData);
    }
  }
  //ОБНОВЛЕНИЕ
  async function UpdateData() {
    setValidity({model: true, vendorCode: true,description: true,compatibleVehicles: true,catId: true})
    if(validate()){
        const {id, model, vendorCode, description, compatibleVehicles, catId} = editData;
        const result = await updateData(`http://egorhi-001-site1.htempurl.com/detail/${id}?model=${model}&vendorCode=${vendorCode}&description=${description}&compatibleVehicles=${compatibleVehicles}$catId=${catId}`);
            if(result){
                const newData = [...data];
                const index = newData.findIndex(item => item.id === Number(id));
                newData[index] = {id: Number(id), model: model, vendorCode: vendorCode, description: description, compatibleVehicles: compatibleVehicles, catId: Number(catId)};
                setData(newData);
            }
        setModalVisible(false);
        setEditData({model: '', vendorCode: '', description: '', compatibleVehicles: '', catId: 0});
    }    
  }
  function EditData(item){
    setModalVisible(true);
    setEditData(item);
    setValidity({model: true, vendorCode: true,description: true,compatibleVehicles: true,catId: true})
  }
function Cancel(){
    setModalVisible(false);
    setEditData({model: '', vendorCode: '', description: '', compatibleVehicles: '', catId: 0});
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
    if(!editData.catId || editData.catId < 1){
        isValid = false;
        setValidity((prevValidity) => ({ ...prevValidity, catId: false }));
    }
    return isValid;
  }
  return (
    <div className='content'>
      {modalVisible && (
         <div className='content__modal'>
           <div className='content__block-modal'>
           <button className='content__cancel-btn-modal' onClick={Cancel}>X</button>
           <input className='main-input' placeholder="Model..." value={editData.model}
              onChange={(e) =>
                setEditData({ ...editData, model: e.target.value })
              }
            />
           <input className='main-input' placeholder="Vendor Code..." value={editData.vendorCode}
              onChange={(e) =>
                setEditData({ ...editData, vendorCode: e.target.value })
              }
            />
            <input className='main-input' placeholder="Description..." value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
            />
            <input className='main-input' placeholder="Compatible Vehicles..." value={editData.compatibleVehicles}
              onChange={(e) =>
                setEditData({ ...editData, compatibleVehicles: e.target.value })
              }
            />
            <input className='main-input' type={"number"} placeholder="Category ID..." value={editData.catId}
              onChange={(e) =>
                setEditData({ ...editData, catId: e.target.value })
              }
            />
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
      {!data ? (<span className='table__no-connect'>No category found</span>) : (
          data
            .filter((item) =>
              item.model.toLowerCase().includes(filterModel.toLowerCase())
            )
            .map((item) => {
              return (
                <div className='block__card' key={item.id}>
                  <div className='block__info'>
                    <p className='block__field'>{item.model}</p>
                      <p className='block__field'>
                        Vendor code: {item.vendorCode}
                      </p>
                      <p className='block__field'>{item.description}</p>
                      <p className='block__field'>
                        Compatible Vehicles: {item.compatibleVehicles}
                      </p>
                      <p className='block__field'>
                        Category id: {item.catId}
                      </p>
                    
                  </div>
                  <div className="block__btns">
                  <button
                    className='block__btn main-btn'
                    onClick={() => RemoveData(item.id)}
                  >
                    Remove
                  </button>
                  <button
                    className='block__btn main-btn'
                    onClick={() => EditData(item)}
                  >
                    Update
                  </button>
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}
export default Detail;
