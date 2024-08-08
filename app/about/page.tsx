// pages/about.tsx
import React from 'react';
import Image from 'next/image';
const AboutPage = () => {
  return (
    // <div className="container mx-auto p-4">
    //   <h1 className="text-3xl font-bold mb-4">About Us</h1>
    //   <p>This is the About page of the application.</p>
    // </div>
        <div className="container mx-auto p-4">
          {/* <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
            <img
              className="w-24 h-24 md:w-48 md:h-auto md:rounded rounded-full mx-auto"
              src="https://pump.mypinata.cloud/ipfs/QmXbE7jWiHaX3DNQ3fyEKA5XKEmC3prHjsF6jzLEjNkGHE"
              alt="Sarah Dayan"
              width="384"
              height="512"
            />
            <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
              <blockquote>
                <p className="text-lg font-medium">
                  “Tailwind CSS is the only framework that I've seen scale
                  on large teams. It’s easy to customize, adapts to any design,
                  and the build size is tiny.”
                </p>
              </blockquote>
              <figcaption className="font-medium">
                <div className="text-sky-500 dark:text-sky-400">
                  Sarah Dayan
                </div>
                <div className="text-slate-700 dark:text-slate-500">
                  Staff Engineer, Algolia
                </div>
              </figcaption>
            </div>
          </figure> */}
          <figure className="md:flex justify-center bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
          <Image className="w-48 md:p-2 md:h-auto rounded-full mx-auto" src="https://pump.mypinata.cloud/ipfs/QmXbE7jWiHaX3DNQ3fyEKA5XKEmC3prHjsF6jzLEjNkGHE" alt="" width="384" height="512"/>
            <div className="pt-6 space-y-4 text-center md:p-8 md:text-left">
              <blockquote>
                <p className="text-lg font-medium">
                  “Tailwind CSS is the only framework that I've seen scale
                  on large teams. It’s easy to customize, adapts to any design,
                  and the build size is tiny.”
                </p>
              </blockquote>
              <figcaption className='font-medium'>
                <div className='text-sky-700 dark:text-red-200'>
                  Sarah Dayan
                </div>
                <div className='text-slate-700 dark:text'>
                  Staff Engineer, Algolia
                </div>
              </figcaption>
            </div>
          </figure>
      </div>
  );
};

export default AboutPage;
