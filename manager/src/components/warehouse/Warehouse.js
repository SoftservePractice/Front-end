import { useState, useEffect, useRef } from "react";
import { getAllData, addData, removeData, updateData} from '../../modules/requests';

import styles from "../../App.css";

function Warehouse() {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({ name: "", address: "" });
  const [modalVisible, setModalVisible] = useState(false);
  const [filterName, setFilterName] = useState("");
  const isMountedRef = useRef(false);
  const [validity, setValidity] = useState({
    name: true,
    address: true,
  });

  useEffect(() => {
    if (isMountedRef.current) {
      return;
    }
    GetData();
    isMountedRef.current = true;
  }, []);

  //ПОЛУЧЕНИЕ ВСЕХ СКЛАДОВ
  async function GetData() {
    const result = await getAllData("http://egorhi-001-site1.htempurl.com/warehouse");
    setData(result);
  }
  //ДОБАВЛЕНИЕ
  async function AddNewData() {
    setValidity({name: true, address: true});
    if(validate()){
        const { name, address } = editData;
        const result = await addData(`http://egorhi-001-site1.htempurl.com/warehouse?name=${name}&adress=${address}`);
        setData([...data, result])
        setModalVisible(false);
        setEditData({ name: '', address: '' });
    }
  }
  //УДАЛЕНИЕ
  async function RemoveData(id) {
    const result = await removeData(`http://egorhi-001-site1.htempurl.com/warehouse/${id}`);
    if (result) {
      const newData = data.filter((item) => item.id !== id);
      setData(newData);
    }
  }
  //ОБНОВЛЕНИЕ
  async function UpdateData() {
    setValidity({name: true, address: true});
    if(validate()){
        const {id, name, address} = editData;
        const result = await updateData(`http://egorhi-001-site1.htempurl.com/warehouse/${id}?name=${name}&adress=${address}`);
        if(result){
            const newData = [...data];
            const index = newData.findIndex(item => item.id === id);
            newData[index] = { ...editData};
            console.log(newData[index])
            setData(newData);
        }
        setModalVisible(false);
        setEditData({ name: '', address: '' });
    }
}
function EditData(item){
  setEditData(item);
  setModalVisible(true);
  setValidity({name: true, address: true})
}
function Cancel(){
  setModalVisible(false);
  setEditData({ name: '', address: '' });
}
function validate() {
  let isValid = true;
  if (!editData.name) {
    isValid = false;
    setValidity((prevValidity) => ({ ...prevValidity, name: false }));
  }
  if (!editData.address) {
    isValid = false;
    setValidity((prevValidity) => ({ ...prevValidity, address: false }));
  }
  return isValid;
}
  return (
    <div className='content'>
      {modalVisible && (
        <div className='content__modal'>
          <div className='content__block-modal'>
            <button className='content__cancel-btn-modal' onClick={Cancel}> X</button>
            <input placeholder="Name..." value={editData.name} className={!validity.name ? "main-input-invalid": "main-input"}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />
            <input
              placeholder="Address..."
              value={editData.address}
              className={!validity.address ? "main-input-invalid": "main-input"}
              onChange={(e) =>
                setEditData({ ...editData, address: e.target.value })
              }
            />
            {!editData.id ? (
              <button className='content__add-btn-modal main-btn'onClick={AddNewData}>
                Add
              </button>
            ) : (
              <button className='content__add-btn-modal main-btn' onClick={UpdateData}>
                Update
              </button>
            )}
          </div>
        </div>
      )}
      <div className='content__block'>
        <input
          className='content__input-search main-input'
          placeholder="Name..."
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <button
          className='content__btn-add main-btn'
        onClick={() => {
          setModalVisible(true);
          setValidity({ name: true, address: true });
        }}
      >
        Add Data
      </button>
      </div>
      {!data ? ( <span className='table__no-connect'>No warehouse found</span> ) :
        <div className='content__block-main'>
          <table className='table'>
              <tr>
                <th className='table-point'>ID</th>
                <th className='table-point'>Name</th>
                <th className='table-point'>Adresss</th>
                <th className='table-point'>Remove</th>
                <th className='table-point'>Update</th>
              </tr>
        {(
          data
            .filter((item) =>
              item.name.toLowerCase().includes(filterName.toLowerCase())
            )
            .map((item) => {
              return (
                <tr>
                 <th>{item.id}</th>
                 <th>{item.name}</th>
                 <th>{item.address}</th>
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
  );
}

export default Warehouse;
