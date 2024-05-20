import { useClientAuth } from "@/hooks";
import { propertyAbi, propertyAddress } from "@/lib";
import { Card, CardContent, Typography, CardActionArea, CardMedia, Box } from "@mui/material";
import { useWriteContract } from "wagmi";

interface Property {
  id: string; 
  name: string;
  description: string;
  price: number;
  location: string;
  image: string;
  owner: string;
  leased: boolean;
  lessee?: string;
}

export const PropertyCard = ({ property }: { property: Property }) => {
  const { id, image, name, owner, location, price, description, leased } = property;
  const { isAuthenticated } = useClientAuth();

  const { writeContract } = useWriteContract();
  
  const handleLeaseNow = async () => {
    if (!isAuthenticated) {
      alert("Please connect your wallet to lease this property.");
      return;
    } else if (leased) {
      alert("This property is already leased.");
      return;
    }
    // Call the lease function in the smart contract
    writeContract({
      address: propertyAddress,
      abi: propertyAbi,
      functionName: "requestLease",
      args: [id],
    });
    alert("Lease request sent. Please wait for the owner to approve.")
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
              {price+""} ETH/month
            </Typography>
            {leased ? (
              <Typography variant="body2" color="error" className="mb-2">
                Leased
              </Typography>
            ) : (<></>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}