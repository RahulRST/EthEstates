import { useClientAuth } from "@/hooks";
import { Card, CardContent, Typography, Button, CardActionArea, CardMedia, Avatar, Box } from "@mui/material";

interface Property {
  id: string; // Change data type based on actual storage on-chain
  name: string;
  description: string;
  price: number; // Assuming price is returned as a number
  location: string;
  image: string;
  owner: string;
  leased: boolean;
  lessee?: string; // Optional lessee
  leaseStart?: number; // Optional lease start timestamp (converted to a number)
  leaseEnd?: number;   // Optional lease end timestamp (converted to a number)
}

export const PropertyCard = ({ property }: { property: Property }) => {
  const { image, name, owner, location, price, description, leased } = property;
  const { isAuthenticated } = useClientAuth();
  // Logic for handling "Lease Now" button click (replace with actual functionality)
  const handleLeaseNow = async () => {
    if (!isAuthenticated) {
      alert("Please connect your wallet to lease this property.");
      return;
    } else if (leased) {
      alert("This property is already leased.");
      return;
    }
    alert("Lease Now button clicked!");
  };

  return (
    <Card className="bg-black text-white shadow-md w-80 shadow-blue-500 rounded-lg overflow-hidden">
      <CardActionArea 
        onClick={handleLeaseNow}
      >
        <CardMedia
          component="img"
          image={image ? image : "https://via.placeholder.com/150"} // Placeholder image
          alt={name}
          className="h-40 w-full object-cover rounded-t-lg"
        />
        <CardContent className="flex flex-col justify-between p-4">
          <Box>
            <Typography className="text-wrap" gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mb-2">
              {location}
            </Typography>
            <Typography variant="body2" component="p" className="mb-2">
              Owned by: {owner}
            </Typography>
            <Typography variant="body2" component="p">
              {description}
            </Typography>
          </Box>
          <Box className="flex justify-end items-center">
            <Typography variant="body2" component="p" className="mr-2">
              {price} ETH/month
            </Typography>
            {/* Lease status indicator */}
            {leased ? (
              <Typography variant="body2" color="error" className="mb-2">
                Leased
              </Typography>
            ) : (<></>
              // <Button variant="contained" color="primary" onClick={handleLeaseNow} className="rounded-full px-4 py-2 bg-transparent hover:bg-opacity-75 text-white font-bold shadow-sm backdrop-blur-sm backdrop-filter backdrop-grayscale-0 hover:backdrop-grayscale-5">
              //   Lease Now
              // </Button>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}