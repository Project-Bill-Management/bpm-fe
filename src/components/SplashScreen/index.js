import BillManagement from '../SplashScreen/BillManagement.png';
import '../SplashScreen/style.css';
// withSplashScreen.js

import React, { Component } from 'react';

const splashStyle = {
    width: '100%',
    height: 'auto',
    maxWidth: '100%'
};

const imgStyle = {
    maxWidth: '100%',
    height: 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

function SplashMessage() {
    return (
        <div style={splashStyle}>
            <img src={BillManagement} alt="BillManagement" style={imgStyle} />
        </div>
    );
}

export default function withSplashScreen(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
            };
        }

        async componentDidMount() {
            try {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                    });
                }, 1000)
            } catch (err) {
                console.log(err);
                this.setState({
                    loading: false,
                });
            }
        }

        render() {
            if (this.state.loading) return <SplashMessage />;
            return <WrappedComponent {...this.props} />;
        }
    };
}
