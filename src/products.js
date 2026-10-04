export const categories = ['Điện tử', 'Thời trang', 'Gia dụng', 'Sách', 'Thể thao'];

const names = [
  'Tai nghe không dây',
  'Áo khoác thường ngày',
  'Máy pha cà phê',
  'Sổ tay thiết kế',
  'Bình nước thể thao',
  'Bàn phím cơ',
  'Giày chạy bộ',
  'Đèn bàn thông minh',
  'Sách học React',
  'Balo du lịch',
  'Loa bluetooth',
  'Áo thun cotton',
  'Nồi chiên không dầu',
  'Sách về UI/UX',
  'Thảm tập yoga',
];

const accents = ['blue', 'violet', 'peach', 'mint', 'gold'];

export const products = Array.from({ length: 10_000 }, (_, index) => {
  const id = index + 1;
  const categoryIndex = index % categories.length;
  return {
    id,
    sku: `SP-${String(id).padStart(5, '0')}`,
    name: `${names[index % names.length]} ${String(Math.floor(index / names.length) + 1).padStart(3, '0')}`,
    category: categories[categoryIndex],
    accent: accents[categoryIndex],
    price: 49_000 + ((index * 83_000) % 2_900_000),
    stock: (index * 17) % 181,
    sold: (index * 29) % 742,
  };
});

export const currency = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
});
