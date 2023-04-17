import { useState, useEffect, useRef } from "react";
import { getAllData, addData, removeData, updateData} from '../../modules/requests';

function Work(){
    const link = process.env.REACT_APP_MY_LINK;
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({ detail: 0, detailPrice: 0, workPrice: 0, order: 0 });
    const [modalVisible, setModalVisible] = useState(false);
    const isMountedRef = useRef(false);
    const [validity, setValidity] = useState({
        detail: true, 
        detailPrice: true, 
        workPrice: true, 
        order: true
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
        const result = await getAllData(`${link}/work`);
        console.log(result)
        setData(result);
      }
      //ДОБАВЛЕНИЕ
    async function AddNewData() {
        setValidity({detail: true, detailPrice: true, workPrice: true, order: true});
        if(validate()){
            const { detail, detailPrice, workPrice, order } = editData;
            const result = await addData(`${link}/work?detail=${detail}&detailPrice=${detailPrice}&order=${order}&workPrice=${workPrice}`);
            setData([...data, result.newWork])
            setModalVisible(false);
            setEditData({ detail: 0, detailPrice: 0, workPrice: 0, order: 0 });
        }
    }
    //УДАЛЕНИЕ
    async function RemoveData(id) {
        const result = await removeData(`${link}/work/${id}`);
        if (result) {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
        }
    }
    //ОБНОВЛЕНИЕ
  async function UpdateData() {
    setValidity({detail: true, detailPrice: true, workPrice: true, order: true});
    if(validate()){
        const {id, detail, detailPrice, workPrice, order} = editData;
        const result = await updateData(`${link}/work/${id}?detail=${detail}&detailPrice=${detailPrice}&order=${order}&workPrice=${workPrice}`);
        if(result){
            const newData = [...data];
            const index = newData.findIndex(item => item.id === id);
            newData[index] = { ...editData};
            setData(newData);
        }
        setModalVisible(false);
        setEditData({ detail: 0, detailPrice: 0, workPrice: 0, order: 0 });
    }
}
function EditData(item){
    setEditData(item);
    setModalVisible(true);
    setValidity({detail: true, detailPrice: true, workPrice: true, order: true});
  }
  function Cancel(){
    setModalVisible(false);
    setEditData({ detail: 0, detailPrice: 0, workPrice: 0, order: 0 });
  }
  function validate() {
    let isValid = true;
    if (!editData.detail || editData.detail < 1) {
      isValid = false;
      setValidity((prevValidity) => ({ ...prevValidity, detail: false }));
    }
    if (!editData.detailPrice || editData.detailPrice < 1) {
      isValid = false;
      setValidity((prevValidity) => ({ ...prevValidity, detailPrice: false }));
    }
    if (!editData.workPrice || editData.workPrice < 1) {
        isValid = false;
        setValidity((prevValidity) => ({ ...prevValidity, workPrice: false }));
    }
    if (!editData.order || editData.order < 1) {
        isValid = false;
        setValidity((prevValidity) => ({ ...prevValidity, order: false }));
    }
    return isValid;
  }
  return (
    <div className='content'>
      {modalVisible && (
        <div className='content__modal'>
          <div className='content__block-modal'>
            <button className='content__cancel-btn-modal' onClick={Cancel}> X</button>

            <input
              placeholder="Detail ID..."
              type={'number'} 
              value={editData.detail}
              className={!validity.detail ? "main-input-invalid": "main-input"}
              onChange={(e) =>
                setEditData({ ...editData, detail: e.target.value })
              }
            />

            <input placeholder="Detail price..." 
            type={'number'} 
            value={editData.detailPrice} 
            className={!validity.detailPrice ? "main-input-invalid": "main-input"}
              onChange={(e) =>
                setEditData({ ...editData, detailPrice: e.target.value })
              }
            />

            <input placeholder="Work price..." 
            type={'number'} 
            value={editData.workPrice} 
            className={!validity.workPrice ? "main-input-invalid": "main-input"}
              onChange={(e) =>
                setEditData({ ...editData, workPrice: e.target.value })
              }
            />

            <input placeholder="Order ID..." 
            type={'number'} 
            value={editData.order} 
            className={!validity.order ? "main-input-invalid": "main-input"}
              onChange={(e) =>
                setEditData({ ...editData, order: e.target.value })
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
          setValidity({detail: true, detailPrice: true, workPrice: true, order: true});
        }}
      >
        Add Data
      </button>
      </div>
      {!data ? ( <span className='table__no-connect'>No work found</span> ) :
        <div className='content__block-main'>
          <table className='table'>
              <tr>
                <th className='table-point'>ID</th>
                <th className='table-point'>Detail ID</th>
                <th className='table-point'>Detail Price</th>
                <th className='table-point'>Work Price</th>
                <th className='table-point'>Order ID</th>
                <th className='table-point'>Remove</th>
                <th className='table-point'>Update</th>
              </tr>
        {(
          data
            .map((item) => {
              return (
                <tr key={item.id}>
                 <th>{item.id}</th>
                 <th>{item.detail}</th>
                 <th>{item.detailPrice}</th>
                 <th>{item.workPrice}</th>
                 <th>{item.order}</th>
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

export default Work;