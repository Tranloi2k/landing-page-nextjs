"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import slugify from "@/utils/slugify";
import axiosInstance from "@/config/axios";

interface Product {
  id: number;
  name: string;
}

interface ApiResponse {
  products: Product[];
  hasMore: boolean;
}

const LazyProductList = () => {
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
        const response = await axiosInstance.get<ApiResponse>(
          `products?page=${page}`
        );
        setProducts((prev) => [...prev, ...response.data.products]);
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
        setPage((prev) => prev + 1);
      }
    };

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
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
    <div className="w-full items-center">
      <div className="w-full min-h-[600px] overflow-auto">
        <ul>
          {products.map((product, index) => {
            const isLastProduct = index === products.length - 1;
            return (
              <li key={index} ref={isLastProduct ? lastProductRef : null}>
                <Link
                  href={`/product/${slugify(product.name)}-id${
                    product.id
                  }.html`}
                >
                  {product.name}
                </Link>
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

export default LazyProductList;
