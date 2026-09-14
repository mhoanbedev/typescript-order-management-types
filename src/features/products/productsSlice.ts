import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Product, ProductsState } from './types'

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Nike Air Max 90',
    price: 129.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVq1t6CwpKUNIanKoNFES4tAahtu-hGXSPLKXT-VRc2ARCWdDVezp7x17l&s=10',
    description: 'Giày thể thao thoải mái với công nghệ Air Max',
  },
  {
    id: 2,
    name: 'Sony WH-1000XM5',
    price: 399.99,
    image: 'https://cdn.shopify.com/s/files/1/0298/6259/2571/files/1_WH-1000XM5_standard_smokypink-Large_5962ba0f-1174-432b-8339-762283eec17e.jpg?v=1766480286',
    description: 'Tai nghe chống ồn hàng đầu với âm thanh chất lượng cao',
  },
  {
    id: 3,
    name: 'Samsung Galaxy Buds',
    price: 149.99,
    image: 'https://cuahangsamsung.vn/filemanager/userfiles/hinh-san-pham/buds-3/3/1b.jpg',
    description: 'Tai nghe không dây với pin 24 giờ',
  },
  {
    id: 4,
    name: 'Apple Watch Series 9',
    price: 399.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFU1CKxqu29COt8RVLTzBpj1McnHtoNHznNpem1pxjC3Rf_-M_63p99YQ&s=10',
    description: 'Đồng hồ thông minh với tính năng sức khỏe nâng cao',
  },
  {
    id: 5,
    name: 'Adidas Ultraboost 22',
    price: 189.99,
    image: 'https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2024/03/giay-the-thao-adidas-ultra-boost-22-focus-olive-gx9167-mau-xanh-olive-size-43-66026e6d7cfe1-26032024134253.jpg',
    description: 'Giày chạy bộ với công nghệ Boost reaction',
  },
  {
    id: 6,
    name: 'Canon EOS M50',
    price: 799.99,
    image: 'https://zshop.vn/images/thumbnails/1357/1000/detailed/54/1602634176_1598385.jpg',
    description: 'Máy ảnh mirrorless 4K với AF nhanh',
  },
]

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return mockProducts
  }
)

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Lỗi khi tải sản phẩm'
      })
  },
})

export default productsSlice.reducer
