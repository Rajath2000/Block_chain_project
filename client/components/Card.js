import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useRouter } from 'next/router';


export default function MultiActionAreaCard({props}) {
  let router = useRouter();
  const shopfromSite=(link,name)=>{
    router.push(`/shoping?name=${name}`);
  }
  return (
      <>
      {console.log(props)}
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img" 
          height="140"
          image={props.logo}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.companyName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
             {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={()=>shopfromSite(props.link,props.companyName)} size="small" color="primary">
          Shop Now
        </Button>
      </CardActions>
    </Card>
    </>
  );
}
