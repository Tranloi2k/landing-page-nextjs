import { vietnameseMap } from "@/constants";

const slugify = (text: string) => {
  text = text
    .split("")
    .map((char) => vietnameseMap[char] || char)
    .join("");

  return text
    .toLowerCase() // Chuyển về chữ thường
    .trim() // Loại bỏ khoảng trắng ở đầu và cuối
    .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch nối
    .replace(/[^\w\-]+/g, "") // Loại bỏ ký tự không phải chữ cái, số hoặc dấu gạch nối
    .replace(/\-\-+/g, "-") // Thay thế nhiều dấu gạch nối liên tiếp bằng một dấu gạch nối
    .replace(/^-+|-+$/g, ""); // Loại bỏ dấu gạch nối ở đầu và cuối
};

export default slugify;
