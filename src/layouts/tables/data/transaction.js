import React, { useState, useEffect } from 'react';
import { Card } from '@mui/material';
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "bootstrap/dist/css/bootstrap.min.css";
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';


function Transaction () {

    return (
        <DashboardLayout>
             <Card>
              <SoftBox pb={3} />
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={3}>
                  <SoftTypography variant="h6" fontWeight="medium">
                      Transaction
                  </SoftTypography>
              </SoftBox>
              <SoftBox pb={3} />
          </Card>
        </DashboardLayout>
    )
}