import { useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Header from './components/Header';
import AutosList from './components/AutosList';
import { getAutos, saveAuto, updatePhoto } from './api/AutosService';
import { Routes, Route, Navigate } from 'react-router-dom';
import AutosDetail from './components/AutosDetail';
import { toastError, toastInfo } from './api/ToastService';

function App() {
  const modalRef = useRef();
  const fileRef = useRef();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [file, setFile] = useState(undefined);
  const [values, setValues] = useState({
    name: '',
    model: '',
    title: '',
    baujahr: '',
    preis: '',
    adres: '',
    phone: '',
    status: ''
  });

  const getAllAutos = async (page = 0, size = 8) => {
    try {
      setCurrentPage(page);
      const { data } = await getAutos(page, size);
      setData(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleNewAuto = async (event) => {
    event.preventDefault();
    try {
      const { data } = await saveAuto(values);
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('id', data.id);
      const { data: photoUrl } = await updatePhoto(formData);
      toggleModal(false);
      setFile(undefined);
      fileRef.current.value = null;
      setValues({
        name: '',
        model: '',
        title: '',
        baujahr: '',
        preis: '',
        adres: '',
        phone: '',
        status: ''
      })
      getAllAutos();
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const updateAuto = async(auto) =>{ 
    try {
      const { data } = await saveAuto(auto);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const updateImage = async(formData) => { 
    try {
      const { data : photoUrl } = await updatePhoto(formData);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  }; 

  const toggleModal = show => show ? modalRef.current.showModal() : modalRef.current.close();

  useEffect(() => {
    getAllAutos();
  }, []);

  return (
    <>
      <Header toggleModal={toggleModal} nbOfAutos={data.totalElements} />
      <main className='main'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Navigate to={'/autos'} />} />
            <Route path="/autos" element={<AutosList data={data} currentPage={currentPage} getAllAutos={getAllAutos} />} />
            <Route path='/autos/:id' element={<AutosDetail updateAuto={updateAuto} updateImage={updateImage}/>} />
          </Routes>
        </div>
      </main>

      {/* Modal */}
      <dialog ref={modalRef} className='modal' id='modal'>
        <div className='modal__header'>
          <h3>New Auto</h3>
          <i onClick={() => toggleModal(false)} className='bi bi-x-lg'></i>
        </div>
        <div className='divider'></div>
        <div className='modal__body'>
          <form onSubmit={handleNewAuto}>
            <div className='user-details'>
              <div className='input-box'>
                <span className='details'>Auto Name</span>
                <input type='text' value={values.name} onChange={onChange} name='name' required />
              </div>
              <div className='input-box'>
                <span className='details'>Model</span>
                <input type='text' value={values.model} onChange={onChange} name='model' required />
              </div>
              <div className='input-box'>
                <span className='details'>Feurzeugart</span>
                <input type='text' value={values.title} onChange={onChange} name='title' required />
              </div>
              <div className='input-box'>
                <span className='details'>Baujahr</span>
                <input type='text' value={values.baujahr} onChange={onChange} name='baujahr' required />
              </div>
              <div className='input-box'>
                <span className='details'>Preis</span>
                <input type='text' value={values.preis} onChange={onChange} name='preis' required />
              </div>
              <div className='input-box'>
                <span className='details'>Adres</span>
                <input type='text' value={values.adres} onChange={onChange} name='adres' required />
              </div>
              <div className='input-box'>
                <span className='details'>Phone</span>
                <input type='text' value={values.phone} onChange={onChange} name='phone' required />
              </div>
              <div className='input-box'>
                <span className='details'>Account Status</span>
                <input type='text' value={values.status} onChange={onChange} name='status' required />
              </div>
              <div className='input-box'>
                <span className='details'>Profile Photo</span>
                <input type='file' onChange={(event) => setFile(event.target.files[0])} ref={fileRef} name='photo' required />
              </div>
            </div>
            <div className='form_footer'>
              <button onClick={() => toggleModal(false)} type='button' className='btn btn-danger'>Cancel</button>
              <button type='submit' className='btn'>Save</button>
            </div>
          </form>
        </div>
      </dialog>
      <ToastContainer />
    </>
  );
}

export default App;
