import type { NextApiRequest, NextApiResponse } from 'next';

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
  leaseStart?: number;
  leaseEnd?: number;
}
const properties: Property[] = [
  {
    id: crypto.randomUUID(),
    image: "https://picsum.photos/id/1011/400/300", // Replace with your image URL
    name: "Oceanfront Oasis",
    location: "Tulum, Mexico",
    price: 2.5, // Assuming price is in ETH per week
    description: "Unwind and soak up the sun at this stunning beachfront property. Enjoy breathtaking ocean views, private balcony, and easy access to the beach.",
    owner: "0x1234567890AbCdEf1234567890AbCdEf123", // Replace with actual owner address
    leased: false,
  },
  {
    id: crypto.randomUUID(),
    image: "https://picsum.photos/id/1024/400/300", // Replace with your image URL
    name: "Modern City Loft",
    location: "Chicago, Illinois",
    price: 1.8, // Assuming price is in ETH per week
    description: "Live in the heart of the city at this stylish loft apartment. Enjoy open floor plan, high ceilings, and close proximity to restaurants and nightlife.",
    owner: "0x9876543210FeDcBa9876543210FeDcBa987", // Replace with actual owner address
    leased: true,
    lessee: "0xFeDcBa98765432101234567890AbCdEf12", // Replace with lessee address (optional)
  },
  {
    id: crypto.randomUUID(),
    image: "https://picsum.photos/id/1014/400/300", // Replace with your image URL
    name: "Cozy Cabin Retreat",
    location: "Whistler, Canada",
    price: 1.2, // Assuming price is in ETH per week
    description: "Escape to the mountains and enjoy the tranquility of nature at this cozy cabin. Perfect for a weekend getaway or a longer stay amidst stunning scenery.",
    owner: "0xAbCdEf123456789001234567890AbCdEf", // Replace with actual owner address
    leased: false,
  },
];



export async function GET(req: NextApiRequest, res: NextApiResponse<Property[]>) {
  return Response.json({
    status: 200,
    properties
  })
}
