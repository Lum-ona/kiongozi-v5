import React from 'react';
import EditProfile from '../components/appBody/profile/EditProfile'
import Header from '../components/header/Header';

const EditProfilePage = () => {
    return (
        <React.Fragment>
            <div className='edit_profile'>
                <div className='index'>
                    <Header />
                    <div className="index_body mt-5 mx-3">
                        < EditProfile/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default EditProfilePage;
