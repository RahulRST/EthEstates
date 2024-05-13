import type { NextApiRequest, NextApiResponse } from 'next';

interface Property {
  id: number;
  image: string;
  name: string;
  location: string;
  price: string;
}

export async function GET(req: NextApiRequest, res: NextApiResponse<Property[]>) {
  const properties: Property[] = [
    { id: 1, image: "https://noun-api.com/beta/pfp?name=Property1", name: "Property 1", location: "...", price: "..." },
  ];
  return Response.json({
    status: 200,
    properties
  })
}
