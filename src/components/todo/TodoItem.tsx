import Link from "next/link"

interface TodoItemProps {
  id: number
  name: string
}

export default function TodoItem({id, name}: TodoItemProps) {
  return (
    <div className="flex items-center justify-between gap-2 cursor-pointer px-3 py-2 text-xl w-80 border border-black rounded-lg">
      <p className="">{name}</p>
      <div className="flex items-center gap-2">
        <Link href={`/edit/${id}`} className="text-green-500 hover:opacity-40 transition-opacity">更新</Link>
        <Link href={`/delete/${id}`} className="text-red-500 hover:opacity-40 transition-opacity">削除</Link>
      </div>
    </div>
  )
}