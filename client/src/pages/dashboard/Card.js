import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Icon } from '@mui/material';

export default function ActionAreaCard({ title, description, icon }) {
  return (
    <Card >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color="primary.main">{title}</Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="main">{description}</Typography>
            <Icon sx={{ color: 'primary.main' }}>{icon}</Icon>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}