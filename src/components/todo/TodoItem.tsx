
interface TodoItemProps {
  name: string
}

export default function TodoItem({name}: TodoItemProps) {
  return (
    <div className="flex items-center justify-between gap-2 cursor-pointer px-3 py-2 text-xl w-80 border border-black rounded-lg">
      <p className="">{name}</p>
      <div className="flex items-center gap-2">
        <p className="text-green-500 hover:opacity-40 transition-opacity">更新</p>
        <p className="text-red-500 hover:opacity-40 transition-opacity">削除</p>
      </div>
    </div>
  )
}