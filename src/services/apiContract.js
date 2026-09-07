// FastAPI가 준비되면 아래 계약에 맞춰 adminService 내부의 mock 반환부를 axios 호출로 교체합니다.
export const apiContract = {
  dashboard: 'GET /api/v1/admin/dashboard/summary',
  products: 'GET /api/v1/admin/products?keyword={keyword}&status={status}',
  orders: 'GET /api/v1/admin/orders?keyword={keyword}&status={status}&start_date={startDate}&end_date={endDate}',
  payments: 'GET /api/v1/admin/payments?keyword={keyword}&status={status}&method={method}',
  shipping: 'GET /api/v1/admin/shipping?keyword={keyword}&status={status}',
  inventory: 'GET /api/v1/admin/inventory?keyword={keyword}&low_stock={lowStock}',
  members: 'GET /api/v1/admin/members?keyword={keyword}&grade={grade}',
  claims: 'GET /api/v1/admin/claims?keyword={keyword}&type={type}&status={status}',
  analyticsPeriod: 'GET /api/v1/admin/analytics/sales?start_date={startDate}&end_date={endDate}&unit={day|week|month}',
  analyticsMember: 'GET /api/v1/admin/analytics/members?start_date={startDate}&end_date={endDate}&grade={grade}',
  analyticsForecast: 'GET /api/v1/admin/analytics/forecast?days={days}&metric={sales|orders}',
  settings: 'GET /api/v1/admin/settings',
  updateSettings: 'PATCH /api/v1/admin/settings',
}