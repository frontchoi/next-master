import Link from 'next/link';
import Search from '../components/Search';

// 1. 가상의 상품 데이터 준비
const products = [
  { id: 1, name: '초경량 노트북', price: 1200000 },
  { id: 2, name: '무소음 기계식 키보드', price: 185000 },
  { id: 3, name: '인체공학 버티컬 마우스', price: 89000 },
  { id: 4, name: '게이밍 모니터 32인치', price: 450000 },
];

// 2. Next.js 15 표준 Props 정의 (Route Props Helpers 패턴)
interface PageProps {
  // searchParams는 비동기 객체(Promise)이므로 아래와 같이 정의합니다.
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  // 3. 비동기 데이터 추출
  // ★ Next.js 15 규칙: await를 통해 실제 파라미터 데이터가 준비될 때까지 기다립니다.
  const params = await searchParams;

  // 4. 타입 안전성 확보 (Defensive Programming)
  const query = typeof params.q === 'string' ? params.q : '';
  const sortOrder = typeof params.sort === 'string' ? params.sort : '';

  // 5. 서버 사이드 필터링 로직 (브라우저가 아닌 서버의 CPU를 사용합니다.)
  let filteredProducts = [...products];

  // (1) 검색 필터: 상품 이름에 검색어(query)가 포함되어 있는지 확인합니다.
  if (query) {
    filteredProducts = filteredProducts.filter((p) => p.name.includes(query));
  }

  // (2) 가격 정렬: sortOrder 값에 따라 순서를 바꿉니다.
  if (sortOrder === 'asc') {
    filteredProducts.sort((a, b) => a.price - b.price); // 오름차순
  } else if (sortOrder === 'desc') {
    filteredProducts.sort((a, b) => b.price - a.price); // 내림차순
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">🏪 이달의 추천 상품</h1>
      <div className="flex justify-between items-center mb-8">
        {/* 6. 검색창 배치: 서버가 URL에서 파악한 query를 initialQuery로 다시 내려줍니다. */}
        <div className="w-full md:w-1/3">
          <Search initialQuery={query} />
        </div>

        {/* 7. 정렬 버튼: 객체 형태의 href를 사용해 기존 검색어(query)를 유지하는 것이 핵심입니다. */}
        <div className="space-x-2 text-black font-medium">
          <Link
            href={{ query: { q: query, sort: 'asc' } }}
            className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
          >
            가격 낮은 순 ⬇️
          </Link>
          <Link
            href={{ query: { q: query, sort: 'desc' } }}
            className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
          >
            가격 높은 순 ⬆️
          </Link>
        </div>
      </div>

      {/* 8. 결과 목록 렌더링 */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="border border-gray-100 rounded-xl p-6 shadow-sm bg-white hover:shadow-md transition"
            >
              <h2 className="text-lg font-bold mb-2 text-gray-800">{p.name}</h2>
              <p className="text-blue-600 font-medium mb-4">
                {p.price.toLocaleString()}원
              </p>
              <Link
                href={`/products/${p.id}`}
                className="block w-full text-center bg-gray-900 text-white py-2 rounded-md text-sm hover:bg-gray-800 transition"
              >
                상세보기
              </Link>
            </div>
          ))}
        </div>
      ) : (
        // 9. 예외 처리 UI
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <p className="text-gray-500">검색 결과가 없습니다. 🤔</p>
          <Link href="/products" className="text-blue-500 underline mt-2 block">
            전체 목록으로 돌아가기
          </Link>
        </div>
      )}
    </div>
  );
}
