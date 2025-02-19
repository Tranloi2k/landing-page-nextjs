/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useEffect, useRef, useState } from 'react';

const imageUrls = [
   'https://picsum.photos/id/1015/600/400',
   'https://picsum.photos/id/1016/600/400',
   'https://picsum.photos/id/1018/600/400',
   'https://picsum.photos/id/1020/600/400',
   'https://picsum.photos/id/1021/600/400',
   'https://picsum.photos/id/1024/600/400',
   'https://picsum.photos/id/1025/600/400',
   'https://picsum.photos/id/1026/600/400',
   'https://picsum.photos/id/1027/600/400',
   'https://picsum.photos/id/1028/600/400',
   'https://picsum.photos/id/1031/600/400',
   'https://picsum.photos/id/1032/600/400',
   'https://picsum.photos/id/1033/600/400',
   'https://picsum.photos/id/1035/600/400',
   'https://picsum.photos/id/1036/600/400',
   'https://picsum.photos/id/1037/600/400',
   'https://picsum.photos/id/1038/600/400',
   'https://picsum.photos/id/1039/600/400',
   'https://picsum.photos/id/1040/600/400',
   'https://picsum.photos/id/1041/600/400',
   'https://picsum.photos/id/1042/600/400',
   'https://picsum.photos/id/1043/600/400',
   'https://picsum.photos/id/1044/600/400',
   'https://picsum.photos/id/1045/600/400',
   'https://picsum.photos/id/1047/600/400',
   'https://picsum.photos/id/1048/600/400',
   'https://picsum.photos/id/1049/600/400',
   'https://picsum.photos/id/1050/600/400',
   'https://picsum.photos/id/1051/600/400',
   'https://picsum.photos/id/1052/600/400',
   'https://picsum.photos/id/1053/600/400',
   'https://picsum.photos/id/1054/600/400',
   'https://picsum.photos/id/1055/600/400',
   'https://picsum.photos/id/1056/600/400',
   'https://picsum.photos/id/1057/600/400'
];

const LazyLoadingImages: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // Giả lập dữ liệu hình ảnh
        
        setImages(imageUrls);
        setLoading(false);
    }, []);

    useEffect(() => {
        const imgObserver = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const imgElement = entry.target as HTMLImageElement;
                    imgElement.src = imgElement.dataset.src!; // Tải hình ảnh
                    observer.current?.unobserve(imgElement); // Ngừng theo dõi
                }
            });
        };

        observer.current = new IntersectionObserver(imgObserver, { rootMargin: '100px' });

        const imgElements = document.querySelectorAll('img[data-src]');
        imgElements.forEach(img => {
            observer.current?.observe(img);
        });

        return () => {
            imgElements.forEach(img => {
                observer.current?.unobserve(img); // Ngừng theo dõi khi component unmount
            });
        };
    }, [images]);

    return (
        <div className='mt-[100px]'>
            <h1>Lazy Loading Images</h1>
            {loading ? (
                <p>Loading images...</p>
            ) : (
                <div className='gap-5' style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {images.map((src, index) => (
                        <img
                            key={index}
                            data-src={src} // Sử dụng data-src để lưu trữ URL hình ảnh
                            src={"https://dummyimage.com/300x200/cccccc/000000&text=Loading"} // Hình ảnh tải trước
                            alt={`Image ${index + 1}`}
                           //  style={{ width: '300px', height: '200px', margin: '10px' }}
                            width={300}
                            height={200}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default LazyLoadingImages;