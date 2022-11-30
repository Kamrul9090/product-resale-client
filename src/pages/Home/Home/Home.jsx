import React from 'react';
import AdvertiseProducts from '../../Dashboard/AdvertiseProducts/AdvertiseProducts';
import WatchCategories from '../WatchCategories/WatchCategories';
import Banner from './Banner/Banner';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <WatchCategories></WatchCategories>
        </div>
    );
};

export default Home;