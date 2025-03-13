import axiosInstance from "@/config/axios";
import getDataFromParam from "@/utils/productHelpFunc";
import { Metadata } from "next";
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

interface ApiResponse {
  name: string;
  description: string;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { slug } = await params;
  const { id } = getDataFromParam(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  // Giả sử bạn có một hàm để lấy dữ liệu bài viết
  const post = await axiosInstance.get<ApiResponse>(`products/${id}`);

  return {
    title: post.data.name,
    description: post.data.description,
    openGraph: {
      title: post.data.name,
      description: post.data.description,
      url: `https://landing-page-nextjs-eosin.vercel.app/loi.jpg`,
      // Có thể thêm các thuộc tính Open Graph khác
    },
    //  twitter: {
    //    card: "summary_large_image",
    //    title: post.name,
    //    description: post.description,
    //    // Có thể thêm các thuộc tính Twitter khác
    //  },
  };
}

const ProductItem = async ({ params }: Props) => {
  const { slug } = await params;
  const { name, id } = getDataFromParam(slug);
  return (
    <>
      <div className="mt-[100px] p-6 h-full">
        {name && <p>{name}</p>}
        {id && <p>{id}</p>}
      </div>
    </>
  );
};

export default ProductItem;
