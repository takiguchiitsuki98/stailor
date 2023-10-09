import Image from 'next/image'
import { Card, Title, Text, Flex } from '@tremor/react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-bold text-4xl lg:flex">
        トップページ(仮)
      </div>
      <div className="z-10 max-w-5xl w-full font-bold text-2xl lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center  lg:static lg:w-auto  lg:bg-gray-200 lg:p-4 ">
          CSV読み込み
        </p>
      </div>
      <div className="z-10 max-w-5xl w-full font-bold text-2xl lg:flex">
        <Flex>
          <a href="/billing/electric/list">電気明細一覧</a>
        </Flex>
      </div>
    </main>
  )
}
