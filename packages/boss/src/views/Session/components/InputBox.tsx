export function InputBox() {
  return (
    <div className="border-t border-gray-200 h-32 bg-white/80 flex flex-col">
      <div className="flex px-5 py-2">
        <button className="h-6 text-[12px] flex items-center justify-center px-2 rounded-sm text-white bg-primary hover:bg-primary-hover">
          截图
        </button>
      </div>
      <div className="flex-1">
        <textarea
          className="w-full h-full box-border outline-none resize-none px-5 py-2 text-[13px]"
          placeholder="请输入代码"
        />
      </div>
    </div>
  )
}
