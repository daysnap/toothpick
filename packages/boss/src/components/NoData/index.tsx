import image from './empty-image.png'

export function NoData() {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <img className="h-24 w-auto" src={image} alt="无数据" />
      <span className="text-gray-500 text-[14px]">暂无数据~</span>
    </div>
  )
}
