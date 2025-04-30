import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAuto } from '../api/AutosService';
import { toastError, toastSuccess } from '../api/ToastService';

const AutosDetail = ({ updateAuto, updateImage }) => {
    //const [values, setValues] = useState({
    const inputRef = useRef();
    const [auto, setAuto] = useState({
        id:  '',
        name: '',
        model: '',
        title: '',
        baujahr: '',
        preis: '',
        adres: '',
        phone: '',
        status: '',
        photoUrl: ''
    });

    const { id } = useParams();

    const fetchAutos = async (id) => {
        try {
            const { data } = await getAuto(id);
            setAuto(data);
            console.log(data);
            //toastSuccess('Auto retrieved');
        } catch (error) {
            console.log(error);
            toastError(error.message);
        }
    };

    const selectPhoto = () => { 
        inputRef.current.click();
    };

    const updatePhoto = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file, file.name);
            formData.append('id', id);

            await updateImage(formData);
            setAuto((prev) => ({ ...prev, photoUrl: '${prev.photoUrl}?updated_at=${new Date().getTime()}' }));
            toastSuccess('Photo updated');
        } catch (error) {
            console.log(error);
            toastError(error.message);
        }
    };

    const onChange =(event) => {
        setAuto({ ...auto, [event.target.name]: event.target.value });
        console.log(auto);
    };

    const onUpdateAuto = async (event) =>{
        event.preventDefault();
        await updateAuto(auto);
        fetchAutos(id);
        toastSuccess("Auto updated");
    };

    useEffect(() => {
        fetchAutos(id);
    }, []);

    return (
        <>
            <Link to={'/autos'} className='link'><i className='bi bi-arrow-left'></i>Back to list</Link>
            <div className='profile'>
                <div className='profile__details'>
                {auto.photoUrl && auto.photoUrl.trim() !== "" ? (
                    <img src={auto.photoUrl} alt={`Profile photo of ${auto.name}`} />
                ) : null}
                    <div className='profile__metadata'>
                        <p className='profile__name'>{auto.name}</p>
                        <p className='profile__muted'>JPG, PNG or GIF. Max size of 10 MB</p>
                        <button onClick={selectPhoto} className='btn'><i className='bi bi-cloud-uploud'></i>Change Photo</button>
                    </div>
                </div>
                <div className='profile__settings'>
                    <div>
                        <form onSubmit={onUpdateAuto} className='form'>
                            <div className='user-details'>
                                <input type='hidden' defaultValue={auto.id} name='id' required />
                                <div className='input-box'>
                                    <span className='details'>Auto Name</span>
                                    <input type='text' value={auto.name} onChange={onChange} name='name' required />
                                </div>
                                <div className='input-box'>
                                    <span className='details'>Model</span>
                                    <input type='text' value={auto.model} onChange={onChange} name='model' required />
                                </div>
                                <div className='input-box'>
                                    <span className='details'>Fahrzeugart</span>
                                    <input type='text' value={auto.title} onChange={onChange} name='title' required />
                                </div>
                                <div className='input-box'>
                                    <span className='details'>Baujahr</span>
                                    <input type='text' value={auto.baujahr} onChange={onChange} name='baujahr' required />
                                </div>
                                <div className='input-box'>
                                    <span className='details'>Preis</span>
                                    <input type='text' value={auto.preis} onChange={onChange} name='preis' required />
                                </div>
                                <div className='input-box'>
                                    <span className='details'>Adres</span>
                                    <input type='text' value={auto.adres} onChange={onChange} name='adres' required />
                                </div>
                                <div className='input-box'>
                                    <span className='details'>Phone</span>
                                    <input type='text' value={auto.phone} onChange={onChange} name='phone' required />
                                </div>
                                <div className='input-box'>
                                    <span className='details'>Status</span>
                                    <input type='text' value={auto.status} onChange={onChange} name='status' required />
                                </div>
                            </div>
                            <div className='form_footer'>
                                <button type='submit' className='btn'>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <form style={{ display: 'none' }}>
                <input type='file' ref={inputRef} onChange={(event) => updateAuto(event.target.files[0])} name='file' accept='image/*' />
            </form>
        </>
    )
}

export default AutosDetail