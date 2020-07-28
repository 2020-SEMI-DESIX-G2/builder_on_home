import React, { useEffect } from "react";
import { Container } from 'semantic-ui-react';
import Header from '../component/Header';
export default function LayoutBasic(props) {
    console.log(props);
    const { children } = props;
    return (
        <>
            <Header/>
            <Container>
                {children}
            </Container>

        </>
    );
}