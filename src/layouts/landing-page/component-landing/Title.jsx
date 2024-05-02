import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const Title = ({ text, textAlign }) => {
    return (
        <Typography
            variant='h4'
            component='h3'
            sx={{
                fontWeight: '700',
                textAlign: textAlign,
            }}
        >
            {text}
        </Typography>
    );
};

Title.propTypes = {
    text: PropTypes.string.isRequired,
    textAlign: PropTypes.string.isRequired,
};

export default Title;
