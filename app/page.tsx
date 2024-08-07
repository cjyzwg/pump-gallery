"use client"; // Ensure this component is a Client Component

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ClientComponent from './components/ClientComponent';

interface ImageData {
  id: number;
  url: string;
  name: string;
  address: string;
  profits: string;
}

async function fetchImages(): Promise<ImageData[]> {
  try {
    console.log('Fetching images from /api/images');
    const res = await fetch('http://192.168.31.30:3000/api/images');
    if (!res.ok) {
      throw new Error('Failed to fetch images');
    }
    const images: ImageData[] = await res.json();
    console.log('Fetched images:', images.length); // Log the number of images fetched
    return images;
  } catch (error) {
    console.error('Error fetching images:', (error as Error).message);
    return []; // Return an empty array to avoid rendering errors
  }
}

export default function Page() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredImageId, setHoveredImageId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const images = await fetchImages();
      setImages(images);
      setLoading(false);
    };

    fetchData(); // Initial fetch

    // Set up interval for fetching data every 2 minutes
    const intervalId = setInterval(() => {
      fetchData();
    }, 20000); // 20s in milliseconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">图片集</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.length > 0 ? (
          images.map((image) => (
            <div
              key={image.id}
              className="relative w-full h-64 overflow-hidden"
              onMouseEnter={() => setHoveredImageId(image.id)}
              onMouseLeave={() => setHoveredImageId(null)}
            >
              <a 
                href={`https://gmgn.ai/sol/token/${image.address}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block w-full h-full" // Ensure the link covers the entire image
              >
                <Image
                  src={image.url}
                  alt={image.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg shadow-md"
                />
              </a>
              {hoveredImageId === image.id && (
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-sm font-bold p-2 rounded">
                  {image.profits}
                </div>
              )}
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-sm font-bold p-2 rounded">
                {image.name}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-red-500">没有图片可显示</p>
        )}
      </div>
      <ClientComponent /> {/* Integrate ClientComponent here */}
    </div>
  );
}
