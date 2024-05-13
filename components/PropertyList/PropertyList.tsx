"use client"

import React, { useState, useEffect } from "react";
import { PropertyCard } from "@/components";

export const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch property data on component mount
  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/properties");
        const data = await response.json();
        setProperties(data.properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="flex flex-row flex-wrap gap-4">
      {isLoading ? (
        <p>Loading properties...</p>
      ) : (
        properties.map((property: any) => (
          <PropertyCard key={property.id} property={property} />
        ))
      )}
    </div>
  );
}
