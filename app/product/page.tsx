"use client";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

interface Product {
    id: number;
    name: string;
}

interface ApiResponse {
    products: Product[];
    hasMore: boolean;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const observer = useRef<IntersectionObserver | null>(null);
    const lastProductRef = useRef<HTMLLIElement | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            if (loading || !hasMore) return;

            setLoading(true);
            try {
                const response = await axios.get<ApiResponse>(`http://localhost:4000/products?page=${page}`);
                setProducts(prev => [...prev, ...response.data.products]);
                setHasMore(response.data.hasMore);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page]);

    useEffect(() => {
        const callback = (entries: IntersectionObserverEntry[]) => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                setPage(prev => prev + 1);
            }
        };

        const options: IntersectionObserverInit = {
            root: null, // Theo dõi trong viewport
            rootMargin: '0px',
            threshold: 1.0 // Gọi khi phần tử cuối cùng hoàn toàn nằm trong viewport
        };

        observer.current = new IntersectionObserver(callback, options);

        const currentRef = lastProductRef.current;
        if (currentRef) {
            observer.current.observe(currentRef);
        }

        return () => {
            if (currentRef && observer.current) {
                observer.current.unobserve(currentRef);
            }
        };
    }, [hasMore, loading]);

    return (
        <div className='mt-[100px]'>
            <h1>Product List</h1>
            <div className='max-h-[500px] overflow-auto'>

            <ul>
                {products.map((product, index) => {
                    const isLastProduct = index === products.length - 1;
                    return (
                        <li key={index} ref={isLastProduct ? lastProductRef : null}>
                            {product.name}
                        </li>
                    );
                })}
            </ul>
            </div>
            {loading && <p>Loading...</p>}
            {!hasMore && <p>No more products to load.</p>}
        </div>
    );
};

export default ProductList;