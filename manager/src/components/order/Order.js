import { useState, useEffect, useRef } from "react";
import { getAllData, addData, removeData, updateData} from '../../modules/requests';
import { OrderContext } from "../../modules/context";

function Order(){
    const link = process.env.REACT_APP_MY_LINK;
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({ client: 0, technician: 0, start: 0, end: 0, finalPrice: 0, car: 0, carMileage: 0, appointmentTime: 0 });
    const [modalVisible, setModalVisible] = useState(false);
    const isMountedRef = useRef(false);
    const [validity, setValidity] = useState({
        client: true, 
        technician: true, 
        start: true, 
        end: true,
        finalPrice: true,
        car: true,
        carMileage: true,
        appointmentTime: true,
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
        const result = await getAllData(`${link}/order`);
        setData(result);
      }
      //ДОБАВЛЕНИЕ
    async function AddNewData() {
        setValidity({client: true, 
            technician: true, 
            start: true, 
            end: true,
            finalPrice: true,
            car: true,
            carMileage: true,
            appointmentTime: true});
        if(validate()){
            let { client, technician, start, end, finalPrice, car, carMileage, appointmentTime } = editData;
            technician = technician ? technician : '';
            start = start ? start : '';
            end = end ? end : '';
            finalPrice = finalPrice ? finalPrice : '';
            car = car ? car : '';
            const result = await addData(`${link}/order?clientId=${client}&technician=${technician}&start=${start}&end=${end}&finalPrice=${finalPrice}&car=${car}&carMileage=${carMileage}&appointmentTime=${appointmentTime}`);
            setData([...data, result])
            setModalVisible(false);
            setEditData({ client: 0, technician: 0, start: 0, end: 0, finalPrice: 0, car: 0, carMileage: 0, appointmentTime: 0 });
        }
    }
    //УДАЛЕНИЕ
    async function RemoveData(id) {
        const result = await removeData(`${link}/order/${id}`);
        if (result) {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
        }
    }
    //ОБНОВЛЕНИЕ
  async function UpdateData() {
    setValidity({client: true, 
        technician: true, 
        start: true, 
        end: true,
        finalPrice: true,
        car: true,
        carMileage: true,
        appointmentTime: true});
    if(validate()){
        let { id, client, technician, start, end, finalPrice, car, carMileage, appointmentTime } = editData;
            technician = technician ? technician : '';
            start = start ? start : '';
            end = end ? end : '';
            finalPrice = finalPrice ? finalPrice : '';
            car = car ? car : '';
        const result = await updateData(`${link}/order/${id}?client=${client}&technician=${technician}&start=${start}&end=${end}&finalPrice=${finalPrice}&car=${car}&carMileage=${carMileage}&appointmentTime=${appointmentTime}`);
        if(result){
            const newData = [...data];
            const index = newData.findIndex(item => item.id === id);
            newData[index] = { ...editData};
            setData(newData);
        }
        setModalVisible(false);
        setEditData({ client: 0, technician: 0, start: 0, end: 0, finalPrice: 0, car: 0, carMileage: 0, appointmentTime: 0 });
    }
}
function EditData(item){
    setEditData(item);
    setModalVisible(true);
    setValidity({client: true, 
        technician: true, 
        start: true, 
        end: true,
        finalPrice: true,
        car: true,
        carMileage: true,
        appointmentTime: true});
  }
  function Cancel(){
    setModalVisible(false);
    setEditData({ client: 0, technician: 0, start: 0, end: 0, finalPrice: 0, car: 0, carMileage: 0, appointmentTime: 0 });
  }
  function validate() {
    let isValid = true;
    if (!editData.client || editData.client < 1) {
      isValid = false;
      setValidity((prevValidity) => ({ ...prevValidity, client: false }));
    }
    if (!editData.carMileage || editData.carMileage < 0) {
      isValid = false;
      setValidity((prevValidity) => ({ ...prevValidity, carMileage: false }));
    }
    if (!editData.appointmentTime) {
      isValid = false;
      setValidity((prevValidity) => ({ ...prevValidity, appointmentTime: false }));
    }
    return isValid;
  }
  return (
    <OrderContext.Provider value={data}>
    <div className='content'>
      {modalVisible && (
        <div className='content__modal'>
          <div className='content__block-modal'>
            <button className='content__cancel-btn-modal' onClick={Cancel}> X</button>

            <input
              placeholder="Client ID..."
              type={'number'} 
              value={editData.client}
              className={!validity.client ? "main-input-invalid": "main-input"}
              onChange={(e) =>
                setEditData({ ...editData, client: e.target.value })
              }
            />

            <input placeholder="Technician ID..." 
            type={'number'} 
            value={editData.technician} 
            className={!validity.technician ? "main-input-invalid": "main-input"}
              onChange={(e) =>
                setEditData({ ...editData, technician: e.target.value })
              }
            />

            <input placeholder="Start Date..." 
            type={'date'} 
            value={editData.start} 
            className={!validity.start ? "main-input-invalid": "main-input"}
              onChange={(e) =>
                setEditData({ ...editData, start: e.target.value })
              }
            />

            <input placeholder="End Date..." 
            type={'date'} 
            value={editData.end} 
            className={!validity.end ? "main-input-invalid": "main-input"}
              onChange={(e) =>
                setEditData({ ...editData, end: e.target.value })
              }
            />

            <input placeholder="Final Price..." 
            type={'number'} 
            value={editData.finalPrice} 
            className={!validity.finalPrice ? "main-input-invalid": "main-input"}
              onChange={(e) =>
                setEditData({ ...editData, finalPrice: e.target.value })
              }
            />

            <input placeholder="Car ID..." 
            type={'number'} 
            value={editData.car} 
            className={!validity.car ? "main-input-invalid": "main-input"}
              onChange={(e) =>
                setEditData({ ...editData, car: e.target.value })
              }
            />

            <input placeholder="Car Mileage..." 
            type={'number'} 
            value={editData.carMileage} 
            className={!validity.carMileage ? "main-input-invalid": "main-input"}
              onChange={(e) =>
                setEditData({ ...editData, carMileage: e.target.value })
              }
            />

            <input placeholder="Appointment Time..." 
            type={'date'} 
            value={editData.appointmentTime} 
            className={!validity.appointmentTime ? "main-input-invalid": "main-input"}
              onChange={(e) =>
                setEditData({ ...editData, appointmentTime: e.target.value })
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
          setValidity({client: true, 
            technician: true, 
            start: true, 
            end: true,
            finalPrice: true,
            car: true,
            carMileage: true,
            appointmentTime: true});
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
                <th className='table-point'>Client ID</th>
                <th className='table-point'>Technician ID</th>
                <th className='table-point'>Start Date</th>
                <th className='table-point'>End Date</th>
                <th className='table-point'>Final Price</th>
                <th className='table-point'>Car ID</th>
                <th className='table-point'>Car Mileage</th>
                <th className='table-point'>Appointment Time</th>
                <th className='table-point'>Remove</th>
                <th className='table-point'>Update</th>
              </tr>
        {(
          data
            .map((item) => {
              return (
                <tr key={item.id}>
                 <th>{item.id}</th>
                 <th>{item.client}</th>
                 <th>{item.technician}</th>
                 <th>{item.start}</th>
                 <th>{item.end}</th>
                 <th>{item.finalPrice}</th>
                 <th>{item.car}</th>
                 <th>{item.carMileage}</th>
                 <th>{item.appointmentTime}</th>
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
    </OrderContext.Provider>
  );
}

export default Order;