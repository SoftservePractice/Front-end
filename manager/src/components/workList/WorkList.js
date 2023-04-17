import {useState, useEffect, useRef} from 'react';
import {getAllData, addData, removeData, updateData} from '../../modules/requests';
import { WorkListContext } from '../../modules/context';

function WorkList(){
    const link = process.env.REACT_APP_MY_LINK;
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({name: '', description: '', price: 0, duration: 0});
    const [modalVisible, setModalVisible] = useState(false);
    const [filterName, setFilterName] = useState('');
    const isMountedRef = useRef(false);
    const [validity, setValidity] = useState({
        name: true,
        description: true,
        price: true,
        duration: true,
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
        const result = await getAllData(`${link}/worklist`);
        setData(result);
    }
    //ДОБАВЛЕНИЕ
    async function AddData(){
        setValidity({name: true, description: true, price: true, duration: true});
        if(validate()){
            const {name, description, price, duration} = editData;
            const result = await addData(`${link}/worklist?name=${name}&description=${description}&price=${price}&duration=${duration}`);
            setData([...data, result]);
            setModalVisible(false);
            setEditData({name: '', description: '', price: 0, duration: 0});
        }
    };
    //УДАЛЕНИЕ
    async function RemoveData(id){
        const result = await removeData(`${link}/worklist/${id}`);
        if(result){
            const newData = data.filter(item => item.id !== id);
            setData(newData);
        }
    }
    //ОБНОВЛЕНИЕ
    async function UpdateData() {
        setValidity({name: true, description: true, price: true, duration: true});
        if(validate()){
            const {id, name, description, price, duration} = editData;
            const result = await updateData(`${link}/worklist/${id}?name=${name}&description=${description}&price=${price}&duration=${duration}`, {
                    id: Number(id),
                    name: name,
                    description: description,
                    price: Number(price),
                    duration: Number(duration)
                });
                if(result){
                    const newData = [...data];
                    const index = newData.findIndex(item => item.id === Number(id));
                    newData[index] = {id: Number(id), name: name, description: description, price: Number(price), duration: Number(duration)};
                    setData(newData);
                }
            setModalVisible(false);
            setEditData({name: '', description: '', price: 0, duration: 0});
        }
      }
      function EditData(item){
        setModalVisible(true);
        setEditData(item);
        setValidity({name: true, description: true, price: true, duration: true});
    }
    function Cancel(){
        setModalVisible(false);
        setEditData({name: '', description: '', price: 0, duration: 0});
    }
    function validate() {
        let isValid = true;
        if (!editData.name) {
          isValid = false;
          setValidity((prevValidity) => ({ ...prevValidity, name: false }));
        }
        if (!editData.description) {
          isValid = false;
          setValidity((prevValidity) => ({ ...prevValidity, description: false }));
        }
        if (!editData.price || editData.price < 1) {
          isValid = false;
          setValidity((prevValidity) => ({ ...prevValidity, price: false }));
        }
        if (!editData.duration || editData.duration < 1) {
          isValid = false;
          setValidity((prevValidity) => ({ ...prevValidity, duration: false }));
        }
        return isValid;
      }
    return(
        <WorkListContext.Provider value={data}>
        <div className='content'>
            {modalVisible && (
            <div className='content__modal'>
                <div className='content__block-modal'>
                    <button className='content__cancel-btn-modal' onClick={Cancel}>X</button>

                    <input placeholder='Name...' value={editData.name} 
                    className={!validity.name ? "main-input-invalid": "main-input"}
                    onChange={(e) => setEditData({...editData, name: e.target.value})}></input>
                    
                    <input placeholder='Description...' value={editData.description} 
                    className={!validity.description ? "main-input-invalid": "main-input"}
                    onChange={(e) => setEditData({...editData, description: e.target.value})}></input>
                    
                    <input type={'number'} placeholder='Price...' value={editData.price} 
                    className={!validity.price ? "main-input-invalid": "main-input"}
                    onChange={(e) => setEditData({...editData, price: e.target.value})}></input>
                    
                    <input type={'number'} placeholder='Duration...' value={editData.duration} 
                    className={!validity.duration ? "main-input-invalid": "main-input"}
                    onChange={(e) => setEditData({...editData, duration: e.target.value})}></input>
                    
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
                setValidity({name: true, description: true, price: true, duration: true});
                }}>Add Data</button>
            </div>
            {!data ? ( <span className='table__no-connect'>No worklist found</span> ) :
             <div className='content__block-main'>
             <table className='table'>
                 <tr>
                   <th className='table-point'>ID</th>
                   <th className='table-point'>Name</th>
                   <th className='table-point'>Description</th>
                   <th className='table-point'>Price</th>
                   <th className='table-point'>Duration</th>
                   <th className='table-point'>Remove</th>
                   <th className='table-point'>Update</th>
                 </tr>
            
                      {(
                            data.filter((item) => item.name.toLowerCase().includes(filterName.toLowerCase())).map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <th>{item.name}</th>
                                        <th>{item.description}</th>
                                        <th>{item.price}</th>
                                        <th>{item.duration}</th>
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
        </WorkListContext.Provider>
    );
}

export default WorkList;