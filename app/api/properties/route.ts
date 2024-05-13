import type { NextApiRequest, NextApiResponse } from 'next';

interface Property {
  id: number;
  // image: string;
  name: string;
  location: string;
  price: string;
}

const properties: Property[] = [
  {
    id: 1,
    // image: "https://noun-api.com/beta/pfp?name=Property1",
    name: "Beachfront Paradise",
    location: "Miami, Florida",
    price: "5,000 ETH/month",
  },
  {
    id: 2,
    // image: "https://noun-api.com/beta/pfp?name=Property2",
    name: "Cozy City Apartment",
    location: "New York City, NY",
    price: "2.5 ETH/month",
  },
  {
    id: 3,
    // image: "https://noun-api.com/beta/pfp?name=Property1",
    name: "Mountain Retreat Cabin",
    location: "Lake Tahoe, California",
    price: "1.0 ETH/week",
  },
];


export async function GET(req: NextApiRequest, res: NextApiResponse<Property[]>) {
  return Response.json({
    status: 200,
    properties
  })
}
