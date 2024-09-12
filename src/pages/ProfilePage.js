import React from 'react';
import Profile from '../components/appBody/profile/Profile'
import Header from '../components/header/Header';

const ProfilePage = () => {
    return (
        <React.Fragment>
            <div className='profile'>
                <div className='index'>
                    <Header />
                    <div className="index_body mt-5 mx-3">
                        < Profile/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProfilePage;
