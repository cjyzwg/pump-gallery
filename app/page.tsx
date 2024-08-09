"use client"; // Ensure this component is a Client Component
// Page.tsx or similar file
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import ClientComponent from './components/ClientComponent';
import DatePickerComponent from './components/DatePickerComponent';
import moment from 'moment-timezone';

interface ImageData {
  id: number;
  url: string;
  name: string;
  address: string;
  profits: string;
}

async function fetchImages(date?: Date): Promise<ImageData[]> {
  try {
    console.log('Fetching images from /api/images');
    const host = process.env.NEXT_PUBLIC_API_HOST;

    // 检查 date 是否存在，如果不存在，则使用当前日期
    const timeZone = 'Asia/Shanghai';
    const formattedDate = date
      ? moment(date).tz(timeZone).format('YYYY-MM-DD')
      : moment().tz(timeZone).format('YYYY-MM-DD'); // 使用当前日期作为默认值
    const res = await fetch(`http://${host}:3000/api/images?date=${formattedDate}`);
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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Default to today’s date

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    } else {
      setSelectedDate(new Date()); // Default to today’s date if null is received
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const images = await fetchImages(selectedDate);
      setImages(images);
      setLoading(false);
    };

    fetchData(); // Initial fetch based on selectedDate

    // Set up interval for fetching data every 20 seconds
    const intervalId = setInterval(() => {
      fetchData();
    }, 20000); // 20s in milliseconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [selectedDate]); // Fetch data when selectedDate changes

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <DatePickerComponent
        initialDate={selectedDate}
        onDateChange={handleDateChange} // Pass the handler function here
      />
      <div className='md:flex'>
        <h1 className="text-3xl font-bold m-4">图片集1</h1>
        <h1 className="text-3xl font-bold m-4">
          <Link href="/load" className="text-blue-500 hover:underline">
            图片集2
          </Link>
        </h1>
      </div>
      
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
    </div>
  );
}
