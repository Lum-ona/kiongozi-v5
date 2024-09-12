import React from 'react'
import Explore from '../components/appBody/explore/Explore';
import Header from '../components/header/Header';

const ExplorePage = () => {
    return (
        <React.Fragment>
            <div className='index'>
                <Header />
                <div className="index_body mt-5 mx-3">
                    <Explore />
                </div>
            </div>
        </React.Fragment>
    )
}

export default ExplorePage;
