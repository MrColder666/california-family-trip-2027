import { useState, useMemo } from 'react'
import { DollarSign, TrendingDown, Calculator, PieChart } from 'lucide-react'

interface BudgetItem {
  category: string
  description: string
  baseCost: number
  unit: string
  quantity: number
  adjustable: boolean
}

const budgetData: BudgetItem[] = [
  { category: '机票费用', description: '中国往返洛杉矶/旧金山', baseCost: 3500, unit: '人', quantity: 4, adjustable: false },
  { category: '住宿费用', description: '14晚住宿', baseCost: 1085, unit: '晚', quantity: 14, adjustable: true },
  { category: '租车费用', description: 'SUV含保险', baseCost: 6800, unit: '总计', quantity: 1, adjustable: true },
  { category: '汽油费用', description: '2,500公里驾驶', baseCost: 1600, unit: '总计', quantity: 1, adjustable: false },
  { category: '主题公园', description: '迪士尼 + 环球影城', baseCost: 2500, unit: '人', quantity: 4, adjustable: true },
  { category: '景点门票', description: '其他门票和活动', baseCost: 250, unit: '人', quantity: 4, adjustable: true },
  { category: '餐饮费用', description: '每日餐食', baseCost: 900, unit: '天', quantity: 15, adjustable: true },
  { category: '购物预算', description: '纪念品和礼品', baseCost: 7000, unit: '总计', quantity: 1, adjustable: true },
  { category: '其他费用', description: '小费、通讯、杂费', baseCost: 2000, unit: '总计', quantity: 1, adjustable: false },
]

const savingsTips = [
  { tip: '提前45天以上预订机票', savings: '2,000-4,000元' },
  { tip: '选择含早餐酒店，自己烹饪', savings: '2,000-3,000元' },
  { tip: '在线购买主题公园门票', savings: '1,000-1,500元' },
  { tip: '租车享受租5免2优惠', savings: '500-1,000元' },
  { tip: '奥特莱斯购物替代零售', savings: '购物节省20-30%' },
  { tip: '参观免费景点（海滩、公园）', savings: '不定' },
]

export default function BudgetPage() {
  const [adjustments, setAdjustments] = useState<Record<string, number>>({})

  const getAdjustedCost = (item: BudgetItem) => {
    const adjustment = adjustments[item.category] || 0
    const baseCost = item.baseCost * item.quantity
    return Math.max(0, baseCost + adjustment)
  }

  const totalBudget = useMemo(() => {
    return budgetData.reduce((sum, item) => sum + getAdjustedCost(item), 0)
  }, [adjustments])

  const budgetLimit = 70000
  const isOverBudget = totalBudget > budgetLimit

  const handleAdjust = (category: string, delta: number) => {
    setAdjustments((prev) => ({
      ...prev,
      [category]: (prev[category] || 0) + delta,
    }))
  }

  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {}
    budgetData.forEach((item) => {
      totals[item.category] = getAdjustedCost(item)
    })
    return totals
  }, [adjustments])

  const getCategoryPercentage = (category: string) => {
    return ((categoryTotals[category] / totalBudget) * 100).toFixed(1)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-16 border-b border-black">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="w-24 h-1 bg-black mb-6"></div>
          <h1 className="text-h1 font-bold mb-4">预算规划器</h1>
          <p className="text-xl text-dark max-w-2xl">
            加州旅行互动预算计算器。
            调整费用以满足您的需求。
          </p>
        </div>
      </section>

      {/* Budget Summary */}
      <section className="border-b border-black">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="p-8 border-b md:border-b-0 md:border-r border-black">
              <div className="flex items-center gap-2 text-grey mb-2">
                <Calculator size={18} />
                <span className="text-sm uppercase tracking-wider">总预算</span>
              </div>
              <div className={`text-[40px] font-bold font-tabular ${isOverBudget ? 'text-error' : ''}`}>
                {totalBudget.toLocaleString()} CNY
              </div>
              <div className="text-grey mt-1">
                ~${(totalBudget / 7.15).toFixed(0).toLocaleString()} USD
              </div>
            </div>
            <div className="p-8 border-b md:border-b-0 md:border-r border-black">
              <div className="flex items-center gap-2 text-grey mb-2">
                <DollarSign size={18} />
                <span className="text-sm uppercase tracking-wider">预算限制</span>
              </div>
              <div className="text-[40px] font-bold font-tabular">
                {budgetLimit.toLocaleString()} 元
              </div>
              <div className="text-grey mt-1">4人家庭目标预算</div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-2 text-grey mb-2">
                <PieChart size={18} />
                <span className="text-sm uppercase tracking-wider">状态</span>
              </div>
              <div
                className={`text-[40px] font-bold ${
                  isOverBudget ? 'text-error' : 'text-success'
                }`}
              >
                {isOverBudget
                  ? `+${(totalBudget - budgetLimit).toLocaleString()}`
                  : `-${(budgetLimit - totalBudget).toLocaleString()}`}
              </div>
              <div className="text-grey mt-1">
                {isOverBudget ? '超出预算' : '低于预算'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Budget Breakdown */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Budget Table */}
            <div className="lg:col-span-8">
              <h2 className="text-h2 font-bold mb-6">费用明细</h2>
              <div className="border border-black">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-4 bg-black text-white text-sm font-bold uppercase tracking-wider">
                  <div className="col-span-4">类别</div>
                  <div className="col-span-3">详情</div>
                  <div className="col-span-3 text-right">费用(元)</div>
                  <div className="col-span-2 text-center">调整</div>
                </div>

                {/* Table Rows */}
                {budgetData.map((item) => (
                  <div
                    key={item.category}
                    className="grid grid-cols-12 gap-4 p-4 border-t border-black items-center hover:bg-light transition-colors"
                  >
                    <div className="col-span-4">
                      <span className="font-bold">{item.category}</span>
                      <div className="text-sm text-grey">{item.description}</div>
                    </div>
                    <div className="col-span-3 text-sm text-grey">
                      {item.unit === 'total'
                        ? '固定'
                        : `${item.baseCost} x ${item.quantity} ${item.unit}`}
                    </div>
                    <div className="col-span-3 text-right">
                      <span className="font-bold font-tabular">
                        {getAdjustedCost(item).toLocaleString()}
                      </span>
                      <div className="text-xs text-grey">
                        {getCategoryPercentage(item.category)}%
                      </div>
                    </div>
                    <div className="col-span-2 flex justify-center gap-1">
                      {item.adjustable ? (
                        <>
                          <button
                            onClick={() => handleAdjust(item.category, -500)}
                            className="w-8 h-8 border border-black hover:bg-black hover:text-white transition-colors font-bold"
                          >
                            -
                          </button>
                          <button
                            onClick={() => handleAdjust(item.category, 500)}
                            className="w-8 h-8 border border-black hover:bg-black hover:text-white transition-colors font-bold"
                          >
                            +
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-grey">固定</span>
                      )}
                    </div>
                  </div>
                ))}

                {/* Total Row */}
                <div className="grid grid-cols-12 gap-4 p-4 border-t-2 border-black bg-light">
                  <div className="col-span-7 font-bold text-lg">总计</div>
                  <div className="col-span-3 text-right">
                    <span
                      className={`font-bold text-lg font-tabular ${
                        isOverBudget ? 'text-error' : ''
                      }`}
                    >
                      {totalBudget.toLocaleString()} CNY
                    </span>
                  </div>
                  <div className="col-span-2 text-center">
                    <button
                      onClick={() => setAdjustments({})}
                      className="text-xs text-california hover:underline"
                    >
                      重置
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Tips */}
            <div className="lg:col-span-4">
              <div className="border border-california bg-california/5 p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingDown size={24} className="text-california" />
                  <h3 className="text-h3 font-bold">省钱小贴士</h3>
                </div>
                <div className="space-y-4">
                  {savingsTips.map((tip, i) => (
                    <div key={i} className="p-4 bg-white border border-black">
                      <p className="text-sm font-bold">{tip.tip}</p>
                      <p className="text-california text-sm mt-1">
                        节省: {tip.savings}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Breakdown */}
      <section className="py-16 bg-light">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-h2 font-bold mb-8">预算分布</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {budgetData.map((item) => {
              const percentage = parseFloat(getCategoryPercentage(item.category))
              return (
                <div key={item.category} className="bg-white border border-black p-4">
                  <div className="text-sm text-grey mb-2">{item.category}</div>
                  <div className="text-h3 font-bold font-tabular mb-2">
                    {percentage}%
                  </div>
                  <div className="h-2 bg-light">
                    <div
                      className="h-full bg-california transition-all"
                      style={{ width: `${Math.min(percentage * 5, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-grey mt-2">
                    {getAdjustedCost(item).toLocaleString()} CNY
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}