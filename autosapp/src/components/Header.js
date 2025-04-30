import React from 'react'

const Header = ({ toggleModal, nbOfAutos}) => {
  return (
    <header className='header'>
        <div className='container'>
            <h3>Auto List ({nbOfAutos})</h3>
            <button onClick={() => toggleModal(true)} className='btn'>
                <i className='bi bi-plus-square'></i>Add New Auto
            </button>
        </div>
    </header>
   )
}

export default Header