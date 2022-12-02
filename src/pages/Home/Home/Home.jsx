import React from 'react';
import AdvertiseProducts from '../../Dashboard/AdvertiseProducts/AdvertiseProducts';
import ExtraSection from '../../ExtraSection/ExtraSection';
import WatchCategories from '../WatchCategories/WatchCategories';
import Banner from './Banner/Banner';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <WatchCategories></WatchCategories>
            <AdvertiseProducts></AdvertiseProducts>
            <ExtraSection></ExtraSection>
        </div>
    );
};

export default Home;