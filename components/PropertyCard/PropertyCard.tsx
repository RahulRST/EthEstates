import { Card, CardContent, Typography, Button, CardActionArea, CardMedia, Avatar } from '@mui/material';

export const PropertyCard = ({ property }: { property: any }) => {
  const { image, name, location, price } = property;

  return (
        <Card className="bg-black text-white shadow-md shadow-blue-500"
        >
        <CardActionArea>
          <CardMedia
            component="div"
            className='items-center justify-center flex p-4'
          >
            <Avatar sx={{ width: 56, height: 56 }} alt={name} src={"https://noun-api.com/beta/pfp?name="+name} />
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography> */}
            <Typography color="textSecondary" className="mb-2">
          {location}
        </Typography>
        <Typography variant="body2" component="p" className="mb-2">
          {price}
        </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
  );
}