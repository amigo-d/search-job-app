import { Box } from '@mui/system'
import React from 'react'

const Card: React.FC = ({children}) => {
    return (
        <Box
            sx={{
                border: "1px solid #e2e2e2",
                borderRadius: "10px",
                padding: 2
            }}
        >
            {children}
        </Box>
    )
}

export default Card
