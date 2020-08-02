import './Home.scss';

import React from 'react';
import { useQuery } from "@apollo/client";
import userAuth from "../../hooks/useAuth";
import HomeServices from './HomeServices'
// import './Service.css';

export default function HomePage() {
    const { auth } = userAuth();


    return (
        <>
            <React.Fragment>
                <div className="container">
                    <div className="col-lg-12 float-left">
                        <HomeServices />
                    </div>
                    <div className="col-lg-6 float-right">

                    </div>
                </div>
            </React.Fragment>
        </>
    );
}