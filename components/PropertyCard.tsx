import { useClientAuth } from "@/hooks";
import { propertyAbi, propertyAddress } from "@/lib";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Button,
  Chip
} from "@mui/material";
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
  const { id, image, name, location, price, description, owner, leased, lessee } =
    property;
  const actualPrice =
    Number.parseFloat(price.toString()) /
    10**18;
  const { address, isAuthenticated } = useClientAuth();

  const { writeContract } = useWriteContract();

  const handleLeaseNow = async () => {
    if (!isAuthenticated) {
      alert("Please connect your wallet to lease this property.");
      return;
    } else if (leased) {
      writeContract({
        address: propertyAddress,
        abi: propertyAbi,
        functionName: "endLease",
        args: [id],
      });
      return;
    } else {
    // Call the lease function in the smart contract
    writeContract({
      address: propertyAddress,
      abi: propertyAbi,
      functionName: "requestLease",
      args: [id],
      value: BigInt(price),
    });
  }
  };

  return (
    <Card className="bg-black text-white shadow-md w-80 shadow-blue-500 rounded-lg overflow-hidden">
      <CardMedia
        component="img"
        image={image ? image : "https://via.placeholder.com/150"} // Placeholder image
        alt={name}
        className="h-40 w-full object-cover rounded-t-lg"
      />
      <CardContent className="flex flex-col gap-y-5 justify-between p-4">
        <Box display={"flex"} gap={4} flexDirection={"column"}>
          <Typography
            className="text-wrap"
            variant="h5"
            component="div"
          >
            {name}
          </Typography>
          <Chip variant="outlined" color="primary" label={location} />
          <Typography variant="body2" component="p">
            {description}
          </Typography>
        </Box>
        <Box className="flex justify-between items-center">
          <Typography variant="body2" component="p" className="mr-2">
            {actualPrice} ETH
          </Typography>
          {!leased ? <Button onClick={handleLeaseNow} className="bg-blue-500 text-white">
              Request Lease 
          </Button>: address == lessee || address == owner ? <Button onClick={handleLeaseNow} className="bg-blue-500 text-white">
              End Lease 
          </Button> : <Chip variant="outlined" color="error" label="Leased" />}
        </Box>
      </CardContent>
    </Card>
  );
};
