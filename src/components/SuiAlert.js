import React from 'react';
import PropTypes from 'prop-types'; // Import prop-types

function SuiAlert({ children }) {
  return <div>{children}</div>;
}

SuiAlert.propTypes = {
  children: PropTypes.node.isRequired, // Tambahkan prop-types untuk children
};

export default SuiAlert;
