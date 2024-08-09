/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['pump.mypinata.cloud','cf-ipfs.com','ipfs.io','gateway.irys.xyz'],
    },
    output:'standalone'
};

export default nextConfig;
