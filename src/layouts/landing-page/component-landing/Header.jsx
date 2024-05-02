import React from 'react'
import { Box, Button, styled, Typography } from "@mui/material";
import { Link } from 'react-router-dom'
//img
import headerImg from '../../../assets/pexels-binyamin-mellish-186078.png'

const Header = () => {

    const CustomBox = styled(Box) (({ theme }) => ({
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        // tamanhos
        gap: theme.spacing(10),
        paddingTop: theme.spacing(18),
        // cor de fundo
        backgroundColor: '#00BFFF',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
        }
    }));

    const BoxText = styled(Box) (({ theme }) => ({
        flex: '1',
        paddingLeft: theme.spacing(12),
        [theme.breakpoints.down('md')]: {
            flex: '2',
            textAlign: 'center',
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
        },
    }));


  return  (
        <CustomBox component='header'>
            {/*  Box text  */}
            <BoxText 
            component='section'
            >
                <Typography
                variant='h3'
                component= 'h2'
                sx={{
                    fontWeight: 600,
                    color: '#fff',
                }}
                >
                    Welcome!
                </Typography>
                <Typography
                variant='h3'
                component= 'h2'
                sx={{
                    fontWeight: 600,
                    color: '#fff',
                }}
                >
                    Bill Management
                </Typography>

                <Typography
                variant='p'
                component='p'
                sx={{
                    py: 2,
                    lineHeight: 1.6,
                    color: '#fff',
                }}
                >
Start your days by scheduling every agenda regularly with friends or family and find out how much budget is needed with a split bill system.
                </Typography>

                <Box>
                    <Button 
                    component={Link} 
                    to={'/'}
                    variant='outlined'
                    sx={{
                        px: 2, 
                        py: 1,
                        fontSize:'0.9rem',
                        textTransform: 'capitalize',
                        borderRadius: 0,
                        color: '#fff',
                        backgroundColor: 'transparent',
                        borderColor: '#fff',
                        "&&:hover": {
                            color: '#343a55',
                            borderColor: '#343a55',
                        },
                        "&&:focus": {
                            color: '#343a55',
                            borderColor: '#343a55',
                        }
                    }}
                    >
                        explore
                    </Button>
                </Box>
            </BoxText>

            <Box sx={theme => ({
                [theme.breakpoints.down('md')]:{
                    flex: '1',
                    paddingTop: '30px',
                    alignSelf: 'center',
                },
                [theme.breakpoints.up('md')]:{
                    flex: '2',
                    alignSelf: 'flex-end',
                },
            })}
            >
                <img
                src={headerImg}
                alt="headerImg"
                style={{ 
                    width: "100%", 
                    marginBottom: -15,
                }}
                />
            </Box>

        </CustomBox>
    )
}

export default Header