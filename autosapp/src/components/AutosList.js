import React from 'react'
import Autos from "./Autos"

const AutosList = ({ data, currentPage, getAllAutos }) => {
    return (
        <main className='main'>
            {data?.content?.length === 0 && <div>No Autos. Please add new a Auto</div>}

            <ul className='auto__list'>
                {data?.content?.length > 0 && data.content.map(auto => <Autos auto={auto} key={auto.id} />)}
            </ul>

            {data?.content?.length > 0 && data?.totalPages >1 &&  
                <div className='pagination'>
                    <a onClick={()=> getAllAutos(currentPage -1)} className={0 === currentPage ? 'disabled' : ''}> &laquo;</a>
                        {data && [...Array(data.totalPages).keys()].map((page, index) =>  
                            <a onClick={ () => getAllAutos(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</a>)}
                    <a onClick={()=> getAllAutos(currentPage +1)} className={data.totalPages === currentPage +1 ? 'disabled' : ''}>&raquo;</a>
                </div>
            }
        </main>
    )
}

export default AutosList