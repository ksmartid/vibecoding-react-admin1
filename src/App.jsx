import { useEffect, useState } from 'react'
import { BarChart3, Bell, ChevronDown, ChevronRight, CircleHelp, ClipboardList, CreditCard, Home, LogOut, Menu, Package, Search, Settings, ShoppingCart, Truck, Users, X } from 'lucide-react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { adminService } from './services/adminService'
import './App.css'

const pageMeta = {
  dashboard: ['좋은 아침이에요, 민지님', '오늘의 스토어 운영 현황을 한눈에 확인하세요.'], products: ['상품 관리', '상품 등록부터 판매 상태와 재고까지 관리합니다.'], orders: ['주문 관리', '주문 상태와 결제 정보를 함께 확인합니다.'], payments: ['결제 관리', '결제 승인, 취소, 환불 상태를 관리합니다.'], shipping: ['배송 관리', '출고와 배송 현황을 관리합니다.'], inventory: ['재고 관리', '상품별 재고와 안전 재고를 확인합니다.'], members: ['회원 관리', '고객 정보와 구매 활동을 관리합니다.'], claims: ['문의 / 클레임', '고객 문의와 취소, 교환, 반품 요청을 처리합니다.'], analytics: ['통계 분석', '기간별, 회원별 성과와 매출 예측을 확인합니다.'], settings: ['시스템 설정', '스토어 기본 정보와 운영 환경을 설정합니다.'],
}

const menuGroups = [
  { label: 'WORKSPACE', items: [['dashboard', '대시보드', Home]] },
  { label: 'COMMERCE', items: [['products', '상품 관리', Package], ['orders', '주문 관리', ShoppingCart], ['payments', '결제 관리', CreditCard], ['shipping', '배송 관리', Truck], ['inventory', '재고 관리', ClipboardList]] },
  { label: 'CUSTOMER', items: [['members', '회원 관리', Users], ['claims', '문의 / 클레임', CircleHelp]] },
  { label: 'GROWTH', items: [['analytics', '통계 분석', BarChart3], ['settings', '시스템 설정', Settings]] },
]

// API 응답이 부분적으로 비어 있어도 관리자 화면 전체가 중단되지 않도록 숫자를 안전하게 표시합니다.
function formatAmount(value) {
  const amount = Number(value)
  return Number.isFinite(amount) ? `₩${amount.toLocaleString()}` : '₩0'
}

export function AdminConsole() {
  const location = useLocation()
  const routerNavigate = useNavigate()
  const activePage = location.pathname.split('/').filter(Boolean).pop() || 'dashboard'
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigate = (page) => {
    setSidebarOpen(false)
    routerNavigate(`/admin/${page}`)
  }

  return <div className="app-shell">
    <aside className={`sidebar ${sidebarOpen ? 'is-open' : ''}`}>
      <div className="brand"><span className="brand-mark">N</span><span>NORTHSTAR <small>COMMERCE OS</small></span><button className="mobile-close" onClick={() => setSidebarOpen(false)} aria-label="메뉴 닫기"><X size={18} /></button></div>
      <div className="store-switcher"><span className="store-avatar">A</span><span><strong>atelier north</strong><small>온라인 스토어</small></span><ChevronDown size={16} /></div>
      <nav className="side-nav">{menuGroups.map((group) => <div className="nav-group" key={group.label}><p>{group.label}</p>{group.items.map(([id, label, Icon]) => <button className={`nav-item ${activePage === id ? 'active' : ''}`} key={id} onClick={() => navigate(id)}><Icon size={18} /><span>{label}</span>{id === 'orders' && <em>12</em>}</button>)}</div>)}</nav>
      <div className="sidebar-footer"><button className="nav-item"><LogOut size={18} /><span>로그아웃</span></button><small>v1.0.0 · 2026.09</small></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><button className="mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="메뉴 열기"><Menu size={21} /></button><div className="breadcrumbs"><span>관리자</span><ChevronRight size={14} /><strong>{pageMeta[activePage][0]}</strong></div><div className="top-actions"><button className="icon-button" aria-label="알림"><Bell size={19} /><i /></button><div className="profile"><span className="profile-avatar">MJ</span><span><strong>민지 정</strong><small>슈퍼 관리자</small></span><ChevronDown size={15} /></div></div></header>
      <section className="content"><div className="page-heading"><div><span className="eyebrow">{activePage === 'dashboard' ? 'MONDAY, SEPTEMBER 07, 2026' : 'ADMIN CONSOLE'}</span><h1>{pageMeta[activePage][0]}</h1><p>{pageMeta[activePage][1]}</p></div>{!['dashboard', 'analytics', 'settings'].includes(activePage) && <button className="primary-button" onClick={() => alert('백엔드 연결 후 등록 API가 활성화됩니다.')}>+ 새로 등록</button>}</div><Outlet /></section>
    </main>
  </div>
}

export function PageContentRoute({ page }) {
  const navigate = useNavigate()
  // 하위 화면의 바로가기 버튼은 항상 관리자 루트 기준 절대 경로로 이동시킵니다.
  return <PageContent page={page} onNavigate={(targetPage) => navigate(`/admin/${targetPage}`)} />
}

function PageContent({ page, onNavigate }) {
  if (page === 'dashboard') return <Dashboard onNavigate={onNavigate} />
  if (page === 'analytics') return <AnalyticsPage />
  if (page === 'settings') return <SettingsPage />
  return <ManagementPage page={page} />
}

function Dashboard({ onNavigate }) {
  const [data, setData] = useState({ stats: [], orders: [] })
  useEffect(() => { adminService.getDashboard().then(setData) }, [])
  return <><div className="stat-grid">{data.stats.map((stat) => <div className={`stat-card ${stat.tone}`} key={stat.label}><div className="stat-top"><span>{stat.label}</span><span className="stat-dot" /></div><strong>{stat.value}</strong><small>{stat.change}</small></div>)}</div><div className="dashboard-grid"><section className="panel revenue-panel"><PanelHeading title="매출 추이" subtitle="최근 7일 매출 실적" action="이번 주" /><div className="chart"><div className="chart-y"><span>1,500만</span><span>1,000만</span><span>500만</span><span>0</span></div><div className="bars">{['월', '화', '수', '목', '금', '토', '일'].map((day, index) => <div className="bar-column" key={day}><div className={`bar bar-${index + 1}`} /><span>{day}</span></div>)}</div></div><div className="chart-summary"><span><i className="legend-dot mint" /> 총 매출</span><strong>₩68,420,000 <small>+14.8%</small></strong></div></section><section className="panel action-panel"><PanelHeading title="확인이 필요한 업무" subtitle="빠르게 처리해 주세요" /><div className="action-list"><ActionItem icon="↗" label="배송 준비" value="23건" tone="coral" onClick={() => onNavigate('shipping')} /><ActionItem icon="?" label="미답변 문의" value="8건" tone="yellow" onClick={() => onNavigate('claims')} /><ActionItem icon="↺" label="교환 / 반품 요청" value="5건" tone="blue" onClick={() => onNavigate('claims')} /><ActionItem icon="!" label="재고 부족 상품" value="3개" tone="purple" onClick={() => onNavigate('inventory')} /></div></section></div><section className="panel orders-panel"><PanelHeading title="최근 주문" subtitle="가장 최근에 접수된 주문입니다" action="전체 주문 보기" onAction={() => onNavigate('orders')} /><OrderTable rows={data.orders} /></section></>
}

function PanelHeading({ title, subtitle, action, onAction }) { return <div className="panel-heading"><div><h2>{title}</h2><p>{subtitle}</p></div>{action && <button className="select-button" onClick={onAction}>{action} <ChevronDown size={14} /></button>}</div> }
function ActionItem({ icon, label, value, tone, onClick }) { return <button className="action-item" onClick={onClick}><span className={`action-icon ${tone}`}>{icon}</span><span>{label}</span><strong>{value}</strong><ChevronRight size={16} /></button> }

const managementConfigs = { products: { tabs: ['전체 목록', '판매중', '품절임박'], loader: 'getProducts', placeholder: '상품명 또는 상품번호' }, orders: { tabs: ['주문 목록', '신규 주문', '배송 완료'], loader: 'getOrders', placeholder: '주문번호 또는 주문자' }, payments: { tabs: ['결제 내역', '환불 내역', '결제 수단별'], loader: 'getPayments', placeholder: '결제번호, 주문번호 또는 고객명' }, shipping: { tabs: ['전체 배송', '배송준비', '배송중'], loader: 'getShipping', placeholder: '주문번호 또는 수령인' }, inventory: { tabs: ['재고 현황', '재고 부족', '입출고 이력'], loader: 'getInventory', placeholder: '상품명 또는 상품번호' }, members: { tabs: ['전체 회원', 'VIP 회원', '휴면 회원'], loader: 'getMembers', placeholder: '회원명 또는 이메일' }, claims: { tabs: ['전체 요청', '취소', '교환', '반품'], loader: 'getClaims', placeholder: '요청번호, 고객명 또는 유형' } }

function ManagementPage({ page }) {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState(page === 'orders' ? '주문 목록' : page === 'payments' ? '결제 내역' : '전체 목록')
  const [rows, setRows] = useState([])
  const config = managementConfigs[page]
  useEffect(() => {
    let cancelled = false
    setRows([])
    adminService[config.loader](search).then((result) => { if (!cancelled) setRows(result) })
    return () => { cancelled = true }
  }, [config.loader, search])
  const filteredRows = rows.filter((row) => tab === '전체 목록' || tab === '주문 목록' || tab === '결제 내역' || tab === '전체 배송' || tab === '재고 현황' || tab === '전체 회원' || tab === '전체 요청' || (tab === '품절임박' && row.status === '품절임박') || (tab === '배송준비' && row.status === '배송준비') || (tab === '배송중' && row.status === '배송중') || (tab === '재고 부족' && row.stock < row.safeStock) || (tab === '취소' && row.type === '취소') || (tab === '교환' && row.type === '교환') || (tab === '반품' && row.type === '반품') || (tab === '환불 내역' && row.status === '환불완료'))
  return <section className="panel management-panel"><div className="sub-tabs">{config.tabs.map((item) => <button className={tab === item ? 'active' : ''} key={item} onClick={() => setTab(item)}>{item}</button>)}</div><div className="filter-row"><div className="search-box"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`${config.placeholder} 검색`} /></div><select><option>전체 상태</option><option>처리 대기</option><option>처리 완료</option></select><button className="filter-button">검색</button></div><div className="table-meta"><strong>검색 결과 {filteredRows.length}건</strong><span>Mock API 응답 기준 · 최근 업데이트: 방금 전</span></div>{page === 'orders' || page === 'payments' ? <OrderLikeTable page={page} rows={filteredRows} /> : <DomainTable page={page} rows={filteredRows} />}</section>
}

function OrderLikeTable({ page, rows }) { const payment = page === 'payments'; return <div className="table-wrap"><table><thead><tr>{(payment ? ['결제번호', '주문번호', '고객명', '결제수단', '결제금액', '상태', '결제시각'] : ['주문번호', '주문자', '상품명', '결제금액', '상태', '주문시각']).map((item) => <th key={item}>{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.id}><td className="muted">{row.id || '-'}</td><td>{payment ? row.orderId || '-' : <strong>{row.customer || '-'}</strong>}</td><td>{payment ? row.customer || '-' : row.product || '-'}</td><td>{payment ? row.method || '-' : formatAmount(row.amount)}</td><td>{payment ? formatAmount(row.amount) : <span className="status info">{row.status || '확인 필요'}</span>}</td><td>{payment ? <span className={`status ${row.status === '환불완료' ? 'warning' : 'success'}`}>{row.status || '확인 필요'}</span> : row.orderedAt || '-'}</td>{payment && <td>{row.paidAt || '-'}</td>}</tr>)}</tbody></table></div> }

function DomainTable({ page, rows }) { const columns = { products: ['상품번호', '상품명', '카테고리', '판매가', '재고', '상태', '수정일'], shipping: ['주문번호', '수령인', '배송지', '택배사', '송장번호', '상태', '도착 예정'], inventory: ['상품번호', '상품명', '창고', '현재고', '안전재고', '입고 예정', '상태'], members: ['회원번호', '회원명', '이메일', '등급', '주문 수', '가입일', '상태'], claims: ['요청번호', '유형', '고객명', '상품명', '사유', '상태', '접수일'] }[page] || []
  return <div className="table-wrap"><table><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.id}>{page === 'products' && <><td className="muted">{row.id || '-'}</td><td><strong>{row.name || '-'}</strong></td><td>{row.category || '-'}</td><td>{formatAmount(row.salePrice)}</td><td className={Number(row.stock) < 10 ? 'stock-low' : ''}>{row.stock ?? 0}</td><td><span className="status success">{row.status || '확인 필요'}</span></td><td>{row.updatedAt || '-'}</td></>}{page === 'shipping' && <><td className="muted">{row.id || '-'}</td><td><strong>{row.recipient || '-'}</strong></td><td>{row.address || '-'}</td><td>{row.courier || '-'}</td><td>{row.tracking || '-'}</td><td><span className="status info">{row.status || '확인 필요'}</span></td><td>{row.due || '-'}</td></>}{page === 'inventory' && <><td className="muted">{row.id || '-'}</td><td><strong>{row.name || '-'}</strong></td><td>{row.warehouse || '-'}</td><td className={Number(row.stock) < Number(row.safeStock) ? 'stock-low' : ''}>{row.stock ?? 0}</td><td>{row.safeStock ?? 0}</td><td>{row.inbound ?? 0}</td><td><span className={`status ${Number(row.stock) < Number(row.safeStock) ? 'warning' : 'success'}`}>{Number(row.stock) < Number(row.safeStock) ? '재고 부족' : '정상'}</span></td></>}{page === 'members' && <><td className="muted">{row.id || '-'}</td><td><strong>{row.name || '-'}</strong></td><td>{row.email || '-'}</td><td><span className="grade">{row.grade || '-'}</span></td><td>{row.orders ?? 0}건</td><td>{row.joinedAt || '-'}</td><td><span className="status success">{row.state || '확인 필요'}</span></td></>}{page === 'claims' && <><td className="muted">{row.id || '-'}</td><td><span className="grade">{row.type || '-'}</span></td><td><strong>{row.customer || '-'}</strong></td><td>{row.product || '-'}</td><td>{row.reason || '-'}</td><td><span className="status info">{row.status || '확인 필요'}</span></td><td>{row.requestedAt || '-'}</td></>}</tr>)}</tbody></table>{rows.length === 0 && <div className="empty">검색 결과가 없습니다.</div>}</div> }

function AnalyticsPage() {
  const [tab, setTab] = useState('기간별 분석')
  const [data, setData] = useState({ periods: [], members: [], forecast: [] })
  useEffect(() => { adminService.getAnalytics().then(setData) }, [])
  return <section className="panel analytics-panel"><div className="sub-tabs analytics-tabs">{['기간별 분석', '회원별 분석', '매출 예측'].map((item) => <button className={tab === item ? 'active' : ''} key={item} onClick={() => setTab(item)}>{item}</button>)}</div><div className="filter-row analytics-filter"><input type="date" defaultValue="2026-09-01" /><span>~</span><input type="date" defaultValue="2026-09-07" /><select><option>일별</option><option>주별</option><option>월별</option></select><button className="filter-button">분석 실행</button></div>{tab === '회원별 분석' ? <MemberAnalytics rows={data.members} /> : <PeriodAnalytics rows={tab === '매출 예측' ? data.forecast : data.periods} forecast={tab === '매출 예측'} />}</section>
}
function PeriodAnalytics({ rows, forecast }) { const max = Math.max(...rows.map((row) => row.sales || row.value), 1); return <><div className="analytics-kpis"><div><span>{forecast ? '예측 평균 매출' : '조회 기간 매출'}</span><strong>₩{(forecast ? 15700000 : 8420000).toLocaleString()}</strong></div><div><span>{forecast ? '예상 성장률' : '전 기간 대비'}</span><strong className="positive">+{forecast ? '12.4' : '18.8'}%</strong></div><div><span>평균 객단가</span><strong>₩98,400</strong></div></div><div className="analytics-chart">{rows.map((row) => <div className="analytics-bar" key={row.label}><div style={{ height: `${((row.sales || row.value) / max) * 100}%` }} /><span>{row.label}</span><small>{(row.sales || row.value).toLocaleString()}만</small></div>)}</div><div className="insight-box"><strong>{forecast ? '예측 시스템 인사이트' : '데이터 인사이트'}</strong><p>{forecast ? '최근 7일 주문 추세와 요일별 패턴을 반영한 단순 예측값입니다. 실제 모델 연동 시 FastAPI 예측 API로 교체할 수 있습니다.' : '주말 매출이 평일 평균보다 24% 높습니다. 다음 프로모션은 금요일 오후에 시작하는 것이 유리합니다.'}</p></div></> }
function MemberAnalytics({ rows }) { return <div className="member-analytics"><div className="analytics-kpis"><div><span>활성 회원</span><strong>3,842명</strong></div><div><span>재구매율</span><strong className="positive">38.6%</strong></div><div><span>회원 객단가</span><strong>₩86,240</strong></div></div><table><thead><tr><th>회원명</th><th>등급</th><th>주문 수</th><th>누적 구매액</th><th>고객 가치</th></tr></thead><tbody>{rows.map((row) => <tr key={row.name}><td><strong>{row.name || '-'}</strong></td><td><span className="grade">{row.grade || '-'}</span></td><td>{row.orders ?? 0}건</td><td>{formatAmount(row.amount)}</td><td><span className="status success">상위 고객</span></td></tr>)}</tbody></table></div> }
function SettingsPage() { return <section className="panel settings-panel"><div className="settings-row"><div><h2>스토어 기본 정보</h2><p>고객에게 노출되는 쇼핑몰 정보를 관리합니다.</p></div><button className="filter-button">변경 저장</button></div>{['스토어명', '고객센터 전화번호', '운영 이메일', '기본 통화'].map((label, index) => <label className="setting-field" key={label}><span>{label}</span><input defaultValue={['atelier north', '02-1234-5678', 'support@atelier-north.com', 'KRW (₩)'][index]} /></label>)}<div className="settings-row second"><div><h2>알림 및 운영 설정</h2><p>주문과 클레임 발생 시 알림 수신 여부를 설정합니다.</p></div><label className="toggle"><input type="checkbox" defaultChecked /><span /></label></div></section> }
function OrderTable({ rows }) { return <div className="table-wrap"><table><thead><tr><th>주문번호</th><th>주문자</th><th>상품명</th><th>결제금액</th><th>상태</th><th>주문시각</th></tr></thead><tbody>{rows.map((order) => <tr key={order.id}><td className="muted">{order.id || '-'}</td><td><strong>{order.customer || '-'}</strong></td><td>{order.product || '-'}</td><td>{formatAmount(order.amount)}</td><td><span className="status info">{order.status || '확인 필요'}</span></td><td>{order.orderedAt || '-'}</td></tr>)}</tbody></table></div> }
