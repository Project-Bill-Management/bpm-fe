import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const Paragraph = ({ text, maxWidth, mx, textAlign }) => {
    return (
        <Typography
            sx={{
                maxWidth: maxWidth,
                mx: mx,
                textAlign: textAlign,
                py: 3,
                color: '#7b7b7b',
            }}
        >
            {text}
        </Typography>
    );
};

Paragraph.propTypes = {
    text: PropTypes.string.isRequired,
    maxWidth: PropTypes.string,
    mx: PropTypes.string,
    textAlign: PropTypes.string,
};

export default Paragraph;
