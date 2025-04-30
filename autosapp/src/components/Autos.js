import React from 'react'
import { Link } from 'react-router-dom'

const Autos = ({auto}) => {
  return (
    <Link to={`/autos/${auto.id}`} className='auto__item'>
        <div className='auto__header'>
            <div className='auto__image'>
                <img src={auto.photoUrl} alt={auto.name}></img>
            </div>
            <div className='auto__details'>
                <p className='auto_name'>{auto.name.substring(0,15)}</p>
                <p className='auto_title'>{auto.title}</p>
            </div>
        </div>
        <div className='auto__body'>
            <p><i className='bi bi-envelope'></i> {auto.model}</p>
            <p><i className='bi bi-geo'></i> {auto.adres}</p>
            <p><i className='bi bi-telephone'></i> {auto.phone}</p>
            <p>{auto.status === 'Aktive' ? <i className='bi bi-check-circle'></i> : 
            <i className='bi bi-x-circle'></i>}{auto.status}</p>
        </div>
    </Link>
  ) 
}

export default Autos