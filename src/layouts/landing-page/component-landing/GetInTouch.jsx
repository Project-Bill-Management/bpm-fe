import React from 'react'
import {  
    Button,
    Stack,
} from '@mui/material'
import Title from './Title'
import Paragraph from './Paragraph'
import { Link } from 'react-router-dom'

const GetInTouch = () => {

    return (
        <Stack 
        component='section'
        direction="column"
        justifyContent= 'center'
        alignItems='center'
        sx={{
            py: 10,
            mx: 6,
        }}
        >
            <Title 
            text={
                'Start by creating a Circle'
                } 
            textAlign={'center'}
            />
            <Paragraph 
            text={
                'We present a solution to your problem in managing time in your circle, by creating event management along with a split spending budget for each member.'
            }
            maxWidth = {'sm'}
            mx={0}
            textAlign={'center'}
            />
            <Button component={Link} 
            to={'/sign-in'}
            variant="contained" 
            type="submit"
            size="medium"
            sx= {{ 
                fontSize: '0.9rem',
                textTransform: 'capitalize', 
                py: 2,
                px: 4,
                mt: 3, 
                mb: 2,
                borderRadius: 0,
                backgroundColor: '#14192d',
                "&:hover": {
                    backgroundColor: '#1e2a5a',
                }
            }}
            >
                Start now!
            </Button>
 
        </Stack>
    )
}

export default GetInTouch;