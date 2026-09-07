import { analyticsData, dashboardStats, mockClaims, mockInventory, mockMembers, mockOrders, mockPayments, mockProducts, mockShipping } from '../data/mockData'

// 실제 FastAPI 연동 시 이 함수들의 내부 구현만 axios 호출로 교체합니다.
export const adminService = {
  getDashboard: async () => ({ stats: dashboardStats, orders: mockOrders }),
  getProducts: async (keyword = '') => mockProducts.filter((product) => product.name.includes(keyword) || product.id.includes(keyword)),
  getOrders: async (keyword = '') => mockOrders.filter((order) => order.id.includes(keyword) || order.customer.includes(keyword)),
  getMembers: async (keyword = '') => mockMembers.filter((member) => member.name.includes(keyword) || member.email.includes(keyword)),
  getShipping: async (keyword = '') => mockShipping.filter((item) => item.id.includes(keyword) || item.recipient.includes(keyword)),
  getInventory: async (keyword = '') => mockInventory.filter((item) => item.name.includes(keyword) || item.id.includes(keyword)),
  getClaims: async (keyword = '') => mockClaims.filter((item) => item.id.includes(keyword) || item.customer.includes(keyword) || item.type.includes(keyword)),
  getPayments: async (keyword = '') => mockPayments.filter((item) => item.id.includes(keyword) || item.orderId.includes(keyword) || item.customer.includes(keyword)),
  getAnalytics: async () => analyticsData,
}
