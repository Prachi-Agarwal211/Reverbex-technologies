'use client';
import dynamic from 'next/dynamic';
const PointCloud = dynamic(() => import('./PointCloud'), { ssr: false });
export default function PointCloudLazy() { return <PointCloud />; }
