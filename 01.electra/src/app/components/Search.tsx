export default function Search({ initialQuery }: { initialQuery?: string }) {
  return (
    // 1. <form> 태그: 데이터를 전송하는 웹 표준 방식입니다.
    // action="/products": 폼 제출 시 이동할 주소입니다. 별도 핸들러 없이 브라우저가 직접 수행합니다.
    <form action="/products" className="flex flex-1 shrink-0 relative">
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      {/* 2. <input> 태그: 사용자 입력을 받는 칸입니다.
          name="q": 브라우저가 이 입력값을 URL의 '?q=...' 형태로 자동 변환해주는 핵심 이름입니다.
          defaultValue: 서버에서 보내준 검색어를 입력창에 고정(비제어 방식)합니다. */}
      <input
        name="q"
        id="search"
        className="peer block w-full rounded-md border border-gray-200 py-2.25 pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
        placeholder="검색어를 입력하세요..."
        defaultValue={initialQuery}
      />

      {/* 3. 장식용 아이콘: 돋보기 아이콘을 절대 위치로 배치합니다. */}
      <div className="absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900">
        🔍
      </div>

      {/* 4. 제출 버튼: 엔터키로 제출되지만, 표준을 위해 숨겨진 버튼을 배치합니다. */}
      <button type="submit" className="hidden">
        검색
      </button>
    </form>
  );
}
