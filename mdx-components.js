// mdx-components.js
import Image from 'next/image'

// 見出し1のスタイル
function CustomH1({ children }) {
  return (
    <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
  )
}

// 見出し2のスタイル
function CustomH2({ children }) {
  return (
    <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>
  )
}

// 段落のスタイル
function CustomP({ children }) {
  return (
    <p className="text-gray-600 leading-relaxed mb-4">{children}</p>
  )
}

// 箇条書きリストのスタイル
function CustomUl({ children }) {
  return (
    <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
  )
}

// 画像のスタイル
function CustomImage(props) {
  return (
    <div className="my-8 relative h-[400px] rounded-lg overflow-hidden">
      <Image
        {...props}
        fill
        className="object-cover"
      />
    </div>
  )
}

// これらのカスタムコンポーネントをMDXで使用できるようにする
export function useMDXComponents(components) {
  return {
    h1: CustomH1,
    h2: CustomH2,
    p: CustomP,
    ul: CustomUl,
    img: CustomImage,
    ...components,
  }
}
