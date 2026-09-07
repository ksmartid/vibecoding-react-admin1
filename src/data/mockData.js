// 백엔드 API가 연결되기 전까지 관리자 화면을 구동하는 샘플 데이터입니다.
export const mockProducts = [
  { id: 'P20260001', name: '프리미엄 무선 이어폰', category: '디지털 / 음향', price: 129000, salePrice: 99000, stock: 125, status: '판매중', updatedAt: '2026.09.07' },
  { id: 'P20260002', name: '데일리 코튼 셔츠', category: '패션 / 상의', price: 59000, salePrice: 42000, stock: 38, status: '판매중', updatedAt: '2026.09.06' },
  { id: 'P20260003', name: '오트밀 세라믹 머그', category: '리빙 / 주방', price: 24000, salePrice: 18000, stock: 7, status: '품절임박', updatedAt: '2026.09.05' },
  { id: 'P20260004', name: '컴포트 러닝 스니커즈', category: '패션 / 신발', price: 119000, salePrice: 89000, stock: 0, status: '품절', updatedAt: '2026.09.04' },
  { id: 'P20260005', name: '아로마 디퓨저 세트', category: '리빙 / 홈데코', price: 36000, salePrice: 29000, stock: 84, status: '판매중', updatedAt: '2026.09.03' },
]

export const mockOrders = [
  { id: 'ORD-260907-001', customer: '김하늘', product: '프리미엄 무선 이어폰', amount: 99000, status: '배송준비', orderedAt: '09:42' },
  { id: 'ORD-260907-002', customer: '이준서', product: '데일리 코튼 셔츠 외 1건', amount: 84000, status: '결제완료', orderedAt: '09:18' },
  { id: 'ORD-260907-003', customer: '박서연', product: '아로마 디퓨저 세트', amount: 29000, status: '배송중', orderedAt: '08:51' },
  { id: 'ORD-260906-019', customer: '최도윤', product: '오트밀 세라믹 머그', amount: 18000, status: '구매확정', orderedAt: '어제' },
]

export const mockMembers = [
  { id: 'M-00182', name: '김하늘', email: 'sky@example.com', grade: 'VIP', orders: 18, joinedAt: '2025.03.14', state: '정상' },
  { id: 'M-00181', name: '이준서', email: 'junseo@example.com', grade: 'GOLD', orders: 9, joinedAt: '2025.07.22', state: '정상' },
  { id: 'M-00180', name: '박서연', email: 'seoyeon@example.com', grade: 'SILVER', orders: 4, joinedAt: '2026.01.08', state: '정상' },
  { id: 'M-00179', name: '최도윤', email: 'doyoon@example.com', grade: 'WELCOME', orders: 1, joinedAt: '2026.09.06', state: '정상' },
]

export const dashboardStats = [
  { label: '오늘 매출', value: '₩12,840,000', change: '+18.4%', tone: 'mint' },
  { label: '오늘 주문', value: '128건', change: '+12.1%', tone: 'blue' },
  { label: '신규 회원', value: '47명', change: '+8.7%', tone: 'yellow' },
  { label: '배송 준비', value: '23건', change: '확인 필요', tone: 'coral' },
]

export const mockShipping = [
  { id: 'ORD-260907-001', recipient: '김하늘', address: '서울시 마포구', courier: 'CJ대한통운', tracking: '6894-2210-3012', status: '배송준비', due: '오늘' },
  { id: 'ORD-260907-003', recipient: '박서연', address: '경기도 성남시', courier: '한진택배', tracking: '5120-8821-7744', status: '배송중', due: '09.08' },
  { id: 'ORD-260906-019', recipient: '최도윤', address: '부산시 해운대구', courier: '롯데택배', tracking: '3401-0912-1182', status: '배송완료', due: '09.07' },
]

export const mockInventory = mockProducts.map((product) => ({ ...product, safeStock: product.stock < 10 ? 20 : 30, warehouse: '서울 1센터', inbound: product.stock < 10 ? 40 : 0 }))

export const mockClaims = [
  { id: 'CLM-260907-08', type: '교환', customer: '박서연', product: '아로마 디퓨저 세트', reason: '상품 파손', status: '접수대기', requestedAt: '09:24' },
  { id: 'CLM-260907-07', type: '반품', customer: '최도윤', product: '오트밀 세라믹 머그', reason: '단순 변심', status: '회수중', requestedAt: '08:48' },
  { id: 'CLM-260907-06', type: '취소', customer: '이준서', product: '데일리 코튼 셔츠', reason: '주문 변경', status: '처리완료', requestedAt: '어제' },
]

export const mockPayments = [
  { id: 'PAY-260907-001', orderId: 'ORD-260907-001', customer: '김하늘', method: '신용카드', amount: 99000, status: '결제완료', paidAt: '09:42' },
  { id: 'PAY-260907-002', orderId: 'ORD-260907-002', customer: '이준서', method: '카카오페이', amount: 84000, status: '결제완료', paidAt: '09:18' },
  { id: 'PAY-260906-019', orderId: 'ORD-260906-019', customer: '최도윤', method: '신용카드', amount: 18000, status: '환불완료', paidAt: '어제' },
]

export const analyticsData = {
  periods: [
    { label: '09.01', sales: 820, orders: 42 }, { label: '09.02', sales: 960, orders: 51 }, { label: '09.03', sales: 740, orders: 38 }, { label: '09.04', sales: 1120, orders: 67 }, { label: '09.05', sales: 1320, orders: 72 }, { label: '09.06', sales: 1580, orders: 86 }, { label: '09.07', sales: 1284, orders: 64 },
  ],
  members: [{ name: '김하늘', grade: 'VIP', orders: 18, amount: 2480000 }, { name: '이준서', grade: 'GOLD', orders: 9, amount: 860000 }, { name: '박서연', grade: 'SILVER', orders: 4, amount: 315000 }, { name: '최도윤', grade: 'WELCOME', orders: 1, amount: 18000 }],
  forecast: [{ label: '09.08', value: 1420 }, { label: '09.09', value: 1510 }, { label: '09.10', value: 1640 }, { label: '09.11', value: 1710 }],
}
