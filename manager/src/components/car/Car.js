import {useState, useEffect, useRef} from 'react';
import {getAllData, addData, removeData, updateData} from '../../modules/requests';

function Car() {
    const link = process.env.REACT_APP_MY_LINK;
    const [filterModel, setFilterModel] = useState('');
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({mark: '', year: '', vin: '', carNumber: '', client: 0});
    const [modalVisible, setModalVisible] = useState(false);
    const isMountedRef = useRef(false);
    const [validity, setValidity] = useState({
        mark: true,
        year: true,
        vin: true,
        carNumber: true,
        client: true,
    });

    useEffect(() => {
        if (isMountedRef.current) {
            return;
        }
        GetAllData();
        isMountedRef.current = true;
    }, [])

    //ПОЛУЧЕНИЕ ВСЕХ ДЕТАЛЕЙ
    async function GetAllData() {
        const result = await getAllData(`${link}/car`);
        setData(result);
    }

    //ДОБАВЛЕНИЕ
    async function AddData() {
        setValidity({mark: true, year: true, vin: true, carNumber: true, client: true})
        if (validate()) {
            const {mark, year, vin, carNumber, client} = editData;
            const result = await addData(`${link}/car?mark=${mark}&year=${year}&vin=${vin}&carNumber=${carNumber}&clientId=${client}`);
            setData([...data, result.car]);
            setModalVisible(false);
            setEditData({mark: '', year: '', vin: '', carNumber: '', client: 0});
        }
    }

    //УДАЛЕНИЕ
    async function RemoveData(id) {
        const result = await removeData(`${link}/car/${id}`);
        if (result) {
            const newData = data.filter(item => item.id !== id);
            setData(newData);
        }
    }

    //ОБНОВЛЕНИЕ
    async function UpdateData() {
        setValidity({mark: true, year: true, vin: true, carNumber: true, client: true})
        if (validate()) {
            const {id, mark, year, vin, carNumber, client} = editData;
            const result = await updateData(`${link}/car/${id}?mark=${mark}&year=${year}&vin=${vin}&carNumber=${carNumber}&client=${client}`);
            if (result) {
                const newData = [...data];
                const index = newData.findIndex(item => item.id === Number(id));
                newData[index] = {
                    id: Number(id),
                    mark: mark,
                    year: year,
                    vin: vin,
                    carNumber: carNumber,
                    client: Number(client)
                };
                setData(newData);
            }
            setModalVisible(false);
            setEditData({mark: '', year: '', vin: '', carNumber: '', client: 0});
        }
    }

    function EditData(item) {
        setModalVisible(true);
        setEditData(item);
        setValidity({mark: true, year: true, vin: true, carNumber: true, client: true})
    }

    function Cancel() {
        setModalVisible(false);
        setEditData({mark: '', year: '', vin: '', carNumber: '', client: 0});
    }

    function validate() {
        let isValid = true;
        if (!editData.mark) {
            isValid = false;
            setValidity((prevValidity) => ({...prevValidity, mark: false}));
        }
        if (!editData.year) {
            isValid = false;
            setValidity((prevValidity) => ({...prevValidity, year: false}));
        }
        if (!editData.vin) {
            isValid = false;
            setValidity((prevValidity) => ({...prevValidity, vin: false}));
        }
        if (!editData.carNumber) {
            isValid = false;
            setValidity((prevValidity) => ({...prevValidity, carNumber: false}));
        }
        if (!editData.client || editData.client < 1) {
            isValid = false;
            setValidity((prevValidity) => ({...prevValidity, client: false}));
        }
        return isValid;
    }

    return (
        <div className={'content'}>
            {modalVisible && (
                <div className='content__modal'>
                    <div className='content__block-modal'>
                        <button className='content__cancel-btn-modal' onClick={Cancel}>X</button>

                        <input placeholder='Mark...' value={editData.mark}
                               className={!validity.mark ? "main-input-invalid": "main-input"}
                               onChange={(e) => setEditData({...editData, mark: e.target.value})}></input>

                        <input placeholder='Year...' value={editData.year}
                               className={!validity.year ? "main-input-invalid": "main-input"}
                               onChange={(e) => setEditData({...editData, year: e.target.value})}></input>

                        <input placeholder='VIN...' value={editData.vin}
                               className={!validity.vin ? "main-input-invalid": "main-input"}
                               onChange={(e) => setEditData({...editData, vin: e.target.value})}></input>

                        <input placeholder='Car Number...' value={editData.carNumber}
                               className={!validity.carNumber ? "main-input-invalid": "main-input"}
                               onChange={(e) => setEditData({...editData, carNumber: e.target.value})}></input>

                        <input type={'number'} placeholder='Client ID...' value={editData.client}
                               className={!validity.client ? "main-input-invalid": "main-input"}
                               onChange={(e) => setEditData({...editData, client: e.target.value})}></input>

                        {!editData.id ?
                            <button className='content__add-btn-modal main-btn' onClick={AddData}>Add</button> :
                            <button className='content__update-btn-modal main-btn' onClick={UpdateData}>Update</button>
                        }

                    </div>
                </div>
            )}
            <div className='content__block'>
                <input className='content__block' placeholder='Mark...' value={filterModel}
                       onChange={(e) => setFilterModel(e.target.value)}></input>
           
            <button className='content__btn-add main-btn' onClick={() => {
                setModalVisible(true);
                setValidity({mark: true, year: true, vin: true, carNumber: true, client: true});
            }}>Add Data
            </button>
            </div>
            {!data ? (<span className='table__no-connect'>No category found</span>) : 
          <div className='content__block-main'>
            <table className='table'>
              <tr>
                <th className='table-point'>Mark</th>
                <th className='table-point'>Year</th>
                <th className='table-point'>Vin</th>
                <th className='table-point'>Car Number</th>
                <th className='table-point'>Client id</th>
                <th className='table-point'>Remove</th>
                <th className='table-point'>Update</th>
              </tr>
                    {data.filter((item) => item.mark.toLowerCase().includes(filterModel.toLowerCase())).map((item) => {
                        return (
                            <tr key={item.id}>
                                        <th>{item.mark}</th>
                                        <th>{item.year}</th>
                                        <th>{item.vin}</th>
                                        <th>{item.carNumber}</th>
                                        <th>{item.client}</th>
                                        <th><button  className="table-btn main-btn" onClick={() => RemoveData(item.id)}>Remove</button></th>
                                        <th><button  className="table-btn main-btn" onClick={() => EditData(item)}>Update</button></th>
                                </tr>
                        );
                    })}
                     </table> 
            </div>
}
        </div>

    );

}
export default Car;