import {useState, useEffect, useRef} from 'react';
import {getAllData, addData, removeData, updateData} from '../../modules/requests';

function Technician(){
    const link = process.env.REACT_APP_MY_LINK;
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({name: '', phone: '', specialization: '', startWork: '',startWorkInCompany: ''});
    const [modalVisible, setModalVisible] = useState(false);
    const [filterName, setFilterName] = useState('');
    const isMountedRef = useRef(false);
    const [validity, setValidity] = useState({
        name: true,
        phone: true,
        specialization: true,
        startWork: true,
        startWorkInCompany: true,
      });
      useEffect(() => {
        if (isMountedRef.current) {
            return;
        }
        GetAllData();
        isMountedRef.current = true;
    }, [])

    //ПОЛУЧЕНИЕ ВСЕХ УСЛУГ
    async function GetAllData(){
        const result = await getAllData(`${link}/technician`);
        setData(result);
    }
    //ДОБАВЛЕНИЕ
    async function AddData(){
        setValidity({name: true, phone: true, specialization: true, startWork: true, startWorkInCompany: true});
        if(validate()){
            const { name, phone, specialization, startWork, startWorkInCompany } = editData;
            const result = await addData(`${link}/technician?name=${name}&phone=${phone}&specialization=${specialization}&startWork=${startWork}&startWorkInCompany=${startWorkInCompany}`);
            setData([...data, result.newTechnician]);
            setModalVisible(false);
            setEditData({name: '', phone: '', specialization: '', startWork: '',startWorkInCompany: ''});
        }
    };
    //УДАЛЕНИЕ
    async function RemoveData(id){
        const result = await removeData(`${link}/technician/${id}`);
        if(result){
            const newData = data.filter(item => item.id !== id);
            setData(newData);
        }
    }
    //ОБНОВЛЕНИЕ
    async function UpdateData() {
        setValidity({name: true, phone: true, specialization: true, startWork: true, startWorkInCompany: true});
        if(validate()){
            const { id, name, phone, specialization, startWork, startWorkInCompany } = editData;
            const result = await updateData(`${link}/technician/${id}?name=${name}&phone=${phone}&specialization=${specialization}&startWork=${startWork}&startWorkInCompany=${startWorkInCompany}`);
                if(result){
                    const newData = [...data];
                    const index = newData.findIndex(item => item.id === id);
                    newData[index] = { ...editData};
                    console.log(newData[index])
                    setData(newData);
                }
                setModalVisible(false);
                setEditData({name: '', phone: '', specialization: '', startWork: '',startWorkInCompany: ''});
        }
      }
      function EditData(item){
        setEditData(item);
        setModalVisible(true);
        setValidity({name: true, phone: true, specialization: true, startWork: true, startWorkInCompany: true});
    }
    function Cancel(){
        setModalVisible(false);
        setEditData({name: '', phone: '', specialization: '', startWork: '',startWorkInCompany: ''});
    }
    function validate() {
        let isValid = true;
        const phoneRegex = /^\+?\d{1,3}[- ]?\d{1,10}$/;
        const startWorkDate = new Date(editData.startWork);
        const startWorkICompanyDate = new Date(editData.startWorkInCompany);
        const today = new Date();
        let dateInMilliseconds = today - startWorkDate;
        let dateInYears = dateInMilliseconds / (1000 * 60 * 60 * 24 * 365);
        if (!editData.name) {
          isValid = false;
          setValidity((prevValidity) => ({ ...prevValidity, name: false }));
        }
        if(!phoneRegex.test(editData.phone)){
            isValid = false;
            setValidity((prevValidity) => ({ ...prevValidity, phone: false }));
        }
        if (!editData.specialization) {
          isValid = false;
          setValidity((prevValidity) => ({ ...prevValidity, specialization: false }));
        }
        if(startWorkDate > today || !editData.startWork || dateInYears > 80){
            isValid = false;
            setValidity((prevValidity) => ({ ...prevValidity, startWork: false }));
        }

        dateInMilliseconds = today - startWorkICompanyDate;
        dateInYears = dateInMilliseconds / (1000 * 60 * 60 * 24 * 365);

        if(startWorkICompanyDate > today || !editData.startWorkInCompany || dateInYears > 80){
            isValid = false;
            setValidity((prevValidity) => ({ ...prevValidity, startWorkInCompany: false }));
        }
        return isValid;
      }
      return(
        <div className='content'>
            {modalVisible && (
            <div className='content__modal'>
                <div className='content__block-modal'>
                    <button className='content__cancel-btn-modal' onClick={Cancel}>X</button>

                    <p style={{ margin: 5 }}>Name</p>
                    <input placeholder='Name...' value={editData.name} 
                    className={!validity.name ? "main-input-invalid": "main-input"}
                    onChange={(e) => setEditData({...editData, name: e.target.value})}></input>
                    
                    <p style={{ margin: 5 }}>Phone</p>
                    <input placeholder='Phone...' value={editData.phone} 
                    className={!validity.phone ? "main-input-invalid": "main-input"}
                    onChange={(e) => setEditData({...editData, phone: e.target.value})}></input>
                    
                    <p style={{ margin: 5 }}>Specialization</p>
                    <input placeholder='Specialization...' value={editData.specialization} 
                    className={!validity.specialization ? "main-input-invalid": "main-input"}
                    onChange={(e) => setEditData({...editData, specialization: e.target.value})}></input>
                    
                    <p style={{ margin: 5 }}>Start Work</p>
                    <input type={'date'} placeholder='Start Work...' value={editData.startWork} 
                    className={!validity.startWork ? "main-input-invalid": "main-input"}
                    onChange={(e) => setEditData({...editData, startWork: e.target.value})}></input>
                    
                    <p style={{ margin: 5 }}>Start Work In Company</p>
                    <input type={'date'} placeholder='Start Work In Company...' value={editData.startWorkInCompany} 
                    className={!validity.startWorkInCompany ? "main-input-invalid": "main-input"}
                    onChange={(e) => setEditData({...editData, startWorkInCompany: e.target.value})}></input>

                    {!editData.id ? 
                    <button className='content__add-btn-modal main-btn' onClick={AddData}>Add</button> :
                    <button className='content__update-btn-modal main-btn' onClick={UpdateData}>Update</button>
                    }
                </div>
            </div>
            )}
             <div className='content__block'>
                <input className='content__input-search main-input' placeholder='Name...' value={filterName} onChange={(e) => setFilterName(e.target.value)}></input>
             <button className='content__btn-add main-btn' onClick={() => {
                setModalVisible(true);
                setValidity({name: true, phone: true, specialization: true, startWork: true, startWorkInCompany: true});
                }}>Add Data</button>
            </div>
            {!data ? ( <span className='table__no-connect'>No worklist found</span> ) :
             <div className='content__block-main'>
             <table className='table'>
                 <tr>
                   <th className='table-point'>ID</th>
                   <th className='table-point'>Name</th>
                   <th className='table-point'>Phone</th>
                   <th className='table-point'>Specialization</th>
                   <th className='table-point'>Start Work</th>
                   <th className='table-point'>Start Work In Company</th>
                   <th className='table-point'>Remove</th>
                   <th className='table-point'>Update</th>
                 </tr>
            
                      {(
                            data.filter((item) => item.name.toLowerCase().includes(filterName.toLowerCase())).map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <th>{item.id}</th>
                                        <th>{item.name}</th>
                                        <th>{item.phone}</th>
                                        <th>{item.specialization}</th>
                                        <th>{item.startWork}</th>
                                        <th>{item.startWorkICompany}</th>
                                        <th><button className="table-btn main-btn" onClick={() => RemoveData(item.id)}>Remove</button></th>
                                        <th><button className="table-btn main-btn" onClick={() => EditData(item)}>Update</button></th>
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

export default Technician;