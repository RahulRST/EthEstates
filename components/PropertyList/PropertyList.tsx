"use client"

import React, { useState } from "react";
import { PropertyCard } from "@/components";

export const PropertyList = ({ properties }: {properties: any}) => {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-12">
        {properties.map((property: any) => (
          <PropertyCard key={property.id} property={property} />
        ))}
    </div>
  );
}
