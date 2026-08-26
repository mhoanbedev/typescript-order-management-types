/**
 * ============================================================
 * ORDER MANAGEMENT MODULE - TypeScript Type Design
 * ============================================================
 * 
 * Thiết kế bộ type đầy đủ cho hệ thống quản lý đơn hàng
 * Sử dụng: Interface, Enum, Generic, Utility Types
 * 
 * VÌ SAO THIẾT KẾ NHƯ VẬY:
 * 1. Generic<T> cho phép tái sử dụng logic với nhiều kiểu dữ liệu
 * 2. Utility Types (Partial, Pick, Omit, etc.) giảm code trùng lặp
 * 3. Enum cho các giá trị cố định (status, payment method...)
 * 4. Interface riêng cho mỗi entity đảm bảo type-safe
 * 5. Discriminated Unions để xử lý các trường hợp khác nhau
 * ============================================================
 */

// ============================================================
// 1. ENUM - Định nghĩa các giá trị cố định
// ============================================================

enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY = 'ready',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  ONLINE = 'online',
  BANK_TRANSFER = 'bank_transfer',
}

enum ProductCategory {
  ELECTRONICS = 'electronics',
  CLOTHING = 'clothing',
  FOOD = 'food',
  BOOKS = 'books',
  OTHER = 'other',
}

// ============================================================
// 2. BASE INTERFACES - Các entity cơ bản
// ============================================================

/**
 * Customer Interface
 * - Thông tin khách hàng đơn hàng
 * - name, email, phone là bắt buộc
 * - address là tùy chọn (có thể từ hệ thống mặc định)
 */
interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address?: string
  createdAt: Date
}

/**
 * Product Interface
 * - Sản phẩm có thể bán
 * - Chứa: id, name, giá, danh mục, số lượng tồn kho
 * - discount là tùy chọn cho các khuyến mãi
 */
interface Product {
  id: string
  name: string
  price: number
  category: ProductCategory
  stock: number
  description?: string
  discount?: number // Giảm giá (%)
  createdAt: Date
}

/**
 * OrderItem Interface
 * - Chi tiết từng sản phẩm trong đơn hàng
 * - quantity là số lượng sản phẩm
 * - unitPrice là giá tại thời điểm tạo đơn (có thể khác giá hiện tại)
 */
interface OrderItem {
  id: string
  orderId: string
  productId: string
  product?: Product // Optional populate
  quantity: number
  unitPrice: number
  subtotal: number // quantity * unitPrice
}

/**
 * Order Interface
 * - Đơn hàng chính
 * - Chứa thông tin khách, items, tổng tiền, trạng thái
 * - items là tùy chọn (có thể chỉ cần id order, populate sau)
 */
interface Order {
  id: string
  customerId: string
  customer?: Customer // Optional populate
  items: OrderItem[]
  status: OrderStatus
  paymentMethod: PaymentMethod
  totalAmount: number
  discount?: number // Tổng tiền giảm
  notes?: string
  createdAt: Date
  updatedAt: Date
}

// ============================================================
// 3. GENERIC TYPES - Tái sử dụng logic với nhiều kiểu
// ============================================================

/**
 * Generic Response Wrapper
 * - Bọc response API để xử lý thống nhất
 * - success: boolean, message: string, data: T (type generic)
 * 
 * VÍ DỤ:
 * type OrderResponse = ApiResponse<Order>;
 * type OrdersResponse = ApiResponse<Order[]>;
 */
interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  timestamp: Date
}

/**
 * Generic Pagination Wrapper
 * - Xử lý dữ liệu phân trang chung cho tất cả entity
 * - T là kiểu dữ liệu (Order, Product, Customer...)
 * 
 * VÍ DỤ:
 * type PaginatedOrders = Paginated<Order>;
 */
interface Paginated<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/**
 * Generic Request Builder
 * - Xây dựng request với filter, sort, pagination
 * - K là key của entity để type-safe filtering
 * 
 * VÍ DỤ:
 * const orderQuery: QueryBuilder<Order> = {
 *   filters: { status: 'pending' },
 *   sort: { field: 'createdAt', order: 'desc' }
 * }
 */
interface QueryBuilder<T> {
  filters?: Partial<T>
  sort?: {
    field: keyof T
    order: 'asc' | 'desc'
  }
  pagination?: {
    page: number
    pageSize: number
  }
}

/**
 * Generic Service Interface
 * - Định nghĩa CRUD operations cho bất kỳ entity nào
 * - create, read, update, delete, list
 * 
 * VÍ DỤ:
 * class OrderService implements Repository<Order> { ... }
 * class ProductService implements Repository<Product> { ... }
 */
interface Repository<T> {
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>
  getById(id: string): Promise<T | null>
  list(query: QueryBuilder<T>): Promise<Paginated<T>>
  update(id: string, data: Partial<T>): Promise<T>
  delete(id: string): Promise<boolean>
}

// ============================================================
// 4. UTILITY TYPES - Các kiểu dẫn xuất từ type gốc
// ============================================================

/**
 * OrderCreateDTO - Dữ liệu tạo đơn hàng mới
 * - Dùng Omit để loại bỏ: id, createdAt, updatedAt, customer (populate), totalAmount
 * - Chỉ lấy các field cần thiết từ client gửi lên
 * 
 * VÍ DỤ:
 * const newOrder: OrderCreateDTO = {
 *   customerId: '123',
 *   items: [...],
 *   status: 'pending',
 *   paymentMethod: 'card'
 * }
 */
type OrderCreateDTO = Omit<
  Order,
  'id' | 'createdAt' | 'updatedAt' | 'customer' | 'totalAmount'
>

/**
 * OrderUpdateDTO - Dữ liệu cập nhật đơn hàng
 * - Dùng Partial để tất cả field đều tùy chọn
 * - Cho phép cập nhật từng field riêng lẻ
 * 
 * VÍ DỤ:
 * const updateData: OrderUpdateDTO = {
 *   status: 'delivered', // chỉ update status
 *   notes: 'Giao thành công'
 * }
 */
type OrderUpdateDTO = Partial<OrderCreateDTO>

/**
 * OrderResponseDTO - Dữ liệu trả về khi lấy order
 * - Bao gồm đầy đủ thông tin (customer, items có product detail)
 * - Loại bỏ các field không cần show
 */
type OrderResponseDTO = Pick<
  Order,
  'id' | 'status' | 'paymentMethod' | 'totalAmount' | 'createdAt'
> & {
  customer: Customer
  items: (OrderItem & { product: Product })[]
}

/**
 * ProductForOrder - Sản phẩm khi hiển thị trong đơn
 * - Chỉ lấy các field cần thiết (không cần stock, createdAt...)
 */
type ProductForOrder = Pick<
  Product,
  'id' | 'name' | 'price' | 'category'
>

/**
 * CustomerSummary - Tóm tắt thông tin khách
 * - Dùng Pick để lấy các field quan trọng
 * - Loại bỏ những field nhạy cảm hoặc không cần
 */
type CustomerSummary = Pick<Customer, 'id' | 'name' | 'email' | 'phone'>

/**
 * ReadonlyOrder - Order không thể modify
 * - Dùng Readonly để đảm bảo dữ liệu không bị thay đổi
 * - Dùng khi trả về historical data
 */
type ReadonlyOrder = Readonly<Order>

/**
 * OrderStats - Thống kê từ orders
 * - Type mới cho mục đích thống kê
 * - Record<K, V> để map status -> số lượng
 */
type OrderStats = {
  totalOrders: number
  totalRevenue: number
  statusBreakdown: Record<OrderStatus, number>
  paymentMethodBreakdown: Record<PaymentMethod, number>
}

// ============================================================
// 5. DISCRIMINATED UNIONS - Xử lý các trường hợp khác nhau
// ============================================================

/**
 * PaymentResult - Kết quả thanh toán
 * - Thành công hoặc thất bại
 * - Dùng discriminated union để type-safe
 * 
 * VÍ DỤ:
 * if (result.success) {
 *   console.log(result.transactionId) // có transactionId
 * } else {
 *   console.log(result.errorCode) // có errorCode
 * }
 */
type PaymentResult =
  | {
      success: true
      transactionId: string
      amount: number
      timestamp: Date
    }
  | {
      success: false
      errorCode: string
      errorMessage: string
      timestamp: Date
    }

/**
 * OrderEvent - Các sự kiện xảy ra trên order
 * - Created, Updated, Cancelled
 * - Mỗi type có dữ liệu khác nhau
 */
type OrderEvent =
  | {
      type: 'CREATED'
      orderId: string
      customerId: string
      timestamp: Date
    }
  | {
      type: 'UPDATED'
      orderId: string
      changes: Partial<Order>
      timestamp: Date
    }
  | {
      type: 'CANCELLED'
      orderId: string
      reason: string
      timestamp: Date
    }

// ============================================================
// 6. ADVANCED GENERIC - Tái sử dụng nâng cao
// ============================================================

/**
 * Cacheable<T> - Wrapper cho dữ liệu có cache
 * - data: dữ liệu thực tế
 * - cachedAt: thời gian cache
 * - isStale: có expired không
 * 
 * VÍ DỤ:
 * type CachedOrder = Cacheable<Order>;
 */
interface Cacheable<T> {
  data: T
  cachedAt: Date
  expiresAt: Date
  isStale: boolean
}

/**
 * Result<T, E> - Kết quả có thể success hoặc error
 * - Thay cho try-catch trong một số trường hợp
 * 
 * VÍ DỤ:
 * const result: Result<Order, Error> = await orderService.getById(id);
 * if (result.ok) {
 *   console.log(result.value)
 * } else {
 *   console.log(result.error)
 * }
 */
type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E }

/**
 * FilterOptions<T> - Định nghĩa các filter options cho entity
 * - keyof T để chỉ cho phép filter trên field tồn tại
 */
interface FilterOptions<T> {
  field: keyof T
  operator: 'eq' | 'gt' | 'lt' | 'contains' | 'in'
  value: unknown
}

// ============================================================
// 7. EXAMPLES - Ví dụ sử dụng
// ============================================================

/**
 * Ví dụ 1: Service CRUD cho Order
 */
class OrderService implements Repository<Order> {
  async create(data: OrderCreateDTO): Promise<Order> {
    // Tạo order mới
    return {} as Order
  }

  async getById(id: string): Promise<Order | null> {
    // Lấy order theo id
    return null
  }

  async list(query: QueryBuilder<Order>): Promise<Paginated<Order>> {
    // Lấy danh sách orders
    return { items: [], total: 0, page: 1, pageSize: 10, totalPages: 0 }
  }

  async update(id: string, data: OrderUpdateDTO): Promise<Order> {
    // Cập nhật order (chỉ update field cần)
    return {} as Order
  }

  async delete(id: string): Promise<boolean> {
    // Xóa order
    return true
  }
}

/**
 * Ví dụ 2: Xử lý API Response
 */
async function fetchOrders(): Promise<ApiResponse<Paginated<Order>>> {
  // Response bao gồm orders trong pagination
  return {
    success: true,
    message: 'Success',
    data: {
      items: [],
      total: 0,
      page: 1,
      pageSize: 10,
      totalPages: 0,
    },
    timestamp: new Date(),
  }
}

/**
 * Ví dụ 3: Xử lý Payment Result
 */
function processPayment(result: PaymentResult): void {
  if (result.success) {
    console.log(`Thanh toán thành công: ${result.transactionId}`)
  } else {
    console.log(`Lỗi thanh toán: ${result.errorMessage}`)
  }
}

/**
 * Ví dụ 4: Sử dụng Discriminated Union
 */
function handleOrderEvent(event: OrderEvent): void {
  switch (event.type) {
    case 'CREATED':
      console.log(`Order ${event.orderId} được tạo`)
      break
    case 'UPDATED':
      console.log(`Order ${event.orderId} được cập nhật:`, event.changes)
      break
    case 'CANCELLED':
      console.log(`Order ${event.orderId} bị hủy: ${event.reason}`)
      break
  }
}

// ============================================================
// 8. TỔNG KẾT THIẾT KẾ
// ============================================================

/**
 * VÌ SAO THIẾT KẾ NHƯ VẬY:
 * 
 * 1. INTERFACE (Customer, Product, Order, OrderItem)
 *    - Định nghĩa cấu trúc dữ liệu cơ bản
 *    - Đảm bảo type-safe khi làm việc với từng entity
 * 
 * 2. ENUM (OrderStatus, PaymentMethod, ProductCategory)
 *    - Giá trị cố định, không thể sai
 *    - Autocomlete tốt hơn, ít lỗi hơn
 * 
 * 3. GENERIC<T> (Repository<T>, QueryBuilder<T>, ApiResponse<T>)
 *    - Tái sử dụng logic cho nhiều entity (Order, Product, Customer...)
 *    - Giảm code trùng lặp
 *    - DRY principle
 * 
 * 4. UTILITY TYPES (Partial, Pick, Omit)
 *    - OrderCreateDTO: Omit fields tự động (id, timestamps)
 *    - OrderUpdateDTO: Partial fields tùy chọn
 *    - ProductForOrder: Pick chỉ fields cần hiện
 * 
 * 5. DISCRIMINATED UNIONS (PaymentResult, OrderEvent)
 *    - Type-safe xử lý các trường hợp khác nhau
 *    - Compiler sẽ bắt lỗi nếu quên trường hợp
 * 
 * 6. ADVANCED (Cacheable<T>, Result<T, E>)
 *    - Xử lý những use case phức tạp
 *    - Maintain code dễ dàng
 * 
 * ============================================================
 */

// Export để sử dụng ở nơi khác
export {
  // Enums
  OrderStatus,
  PaymentMethod,
  ProductCategory,
  // Interfaces
  Customer,
  Product,
  OrderItem,
  Order,
  ApiResponse,
  Paginated,
  QueryBuilder,
  Repository,
  Cacheable,
  FilterOptions,
  // DTOs & Utility Types
  OrderCreateDTO,
  OrderUpdateDTO,
  OrderResponseDTO,
  ProductForOrder,
  CustomerSummary,
  ReadonlyOrder,
  OrderStats,
  // Discriminated Unions
  PaymentResult,
  OrderEvent,
  // Advanced
  Result,
  // Services
  OrderService,
}
