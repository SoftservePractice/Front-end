import { useState, useEffect, useRef } from "react";
import { getAllData, addData, removeData, updateData} from '../../modules/requests';

function Client(){
    const link = process.env.REACT_APP_MY_LINK;
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({ name: '', phone: 0, telegramId: 0, email: ''});
    const [modalVisible, setModalVisible] = useState(false);
    const isMountedRef = useRef(false);
    const [validity, setValidity] = useState({
        name: true, 
        phone: true, 
        telegramId: true, 
        email: true,
    });
    useEffect(() => {
        if (isMountedRef.current) {
          return;
        }
        GetData();
        isMountedRef.current = true;
      }, []);
    
      //ПОЛУЧЕНИЕ
      async function GetData() {
        const result = await getAllData(`${link}/client`);
        setData(result);
      }
      //ДОБАВЛЕНИЕ
    async function AddNewData() {
        setValidity({name: true, phone: true, telegramId: true, email: true});
        if(validate()){
            let { name, phone, telegramId, email} = editData;
            phone = phone ? phone : '';
            telegramId = telegramId ? telegramId : '';
            email = email ? email : '';
            const result = await addData(`${link}/client?name=${name}&phone=${phone}&telegramId=${telegramId}&email=${email}`);
            setData([...data, result.client])
            setModalVisible(false);
            setEditData({ name: '', phone: 0, telegramId: 0, email: ''});
        }
    }
    //УДАЛЕНИЕ
    async function RemoveData(id) {
        const result = await removeData(`${link}/client/${id}`);
        if (result) {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
        }
    }
    //ОБНОВЛЕНИЕ
  async function UpdateData() {
    setValidity({name: true, phone: true, telegramId: true, email: true});
    if(validate()){
        let { id, name, phone, telegramId, email} = editData;
        phone = phone ? phone : '';
        telegramId = telegramId ? telegramId : '';
        email = email ? email : '';
        const result = await updateData(`${link}/client/${id}?name=${name}&phone=${phone}&telegramId=${telegramId}&email=${email}`);
        if(result){
            const newData = [...data];
            const index = newData.findIndex(item => item.id === id);
            newData[index] = { ...editData};
            setData(newData);
        }
        setModalVisible(false);
        setEditData({ name: '', phone: 0, telegramId: 0, email: ''});
    }
}
function EditData(item){
    setEditData(item);
    setModalVisible(true);
    setValidity({name: true, phone: true, telegramId: true, email: true});
  }
  function Cancel(){
    setModalVisible(false);
    setEditData({ name: '', phone: 0, telegramId: 0, email: ''});
  }
  function validate() {
    let isValid = true;
    const phoneRegex = /^\+?\d{1,3}[- ]?\d{1,10}$/;
    if (!editData.name) {
      isValid = false;
      setValidity((prevValidity) => ({ ...prevValidity, name: false }));
    }
    if(!phoneRegex.test(editData.phone) && editData.phone){
        isValid = false;
        setValidity((prevValidity) => ({ ...prevValidity, phone: false }));
    }
    return isValid;
  }
  return (
    <div className='content'>
      {modalVisible && (
        <div className='content__modal'>
          <div className='content__block-modal'>
            <button className='content__cancel-btn-modal' onClick={Cancel}> X</button>

            <p style={{margin:5}}>Client Name</p>
            <input
              placeholder="Name..."
              value={editData.name}
              className={!validity.name ? "main-input-invalid": "main-input"}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />

            <p style={{margin:5}}>Phone Number</p>
            <input placeholder="Phone..." 
            value={editData.phone} 
            className={!validity.phone ? "main-input-invalid": "main-input"}
              onChange={(e) =>
                setEditData({ ...editData, phone: e.target.value })
              }
            />

            <p style={{margin:5}}>Telegram ID</p>
            <input placeholder="Telegram ID..." 
            type={'number'} 
            value={editData.telegramId} 
            className={!validity.telegramId ? "main-input-invalid": "main-input"}
              onChange={(e) =>
                setEditData({ ...editData, telegramId: e.target.value })
              }
            />

            <p style={{margin:5}}>Email</p>
            <input placeholder="Email..." 
            type={'email'} 
            value={editData.email} 
            className={!validity.email ? "main-input-invalid": "main-input"}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
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
        <button
          className='content__btn-add main-btn'
        onClick={() => {
          setModalVisible(true);
          setValidity({name: true, phone: true, telegramId: true, email: true});
        }}
      >
        Add Data
      </button>
      </div>
      {!data ? ( <span className='table__no-connect'>No client found</span> ) :
        <div className='content__block-main'>
          <table className='table'>
              <tr>
                <th className='table-point'>ID</th>
                <th className='table-point'>Name</th>
                <th className='table-point'>Phone</th>
                <th className='table-point'>Telegram ID</th>
                <th className='table-point'>Email</th>
                <th className='table-point'>Remove</th>
                <th className='table-point'>Update</th>
              </tr>
        {(
          data
            .map((item) => {
              return (
                <tr key={item.id}>
                 <th>{item.id}</th>
                 <th>{item.name}</th>
                 <th>{item.phone}</th>
                 <th>{item.telegramId}</th>
                 <th>{item.email}</th>
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

export default Client;