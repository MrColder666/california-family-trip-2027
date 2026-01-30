import { useState } from 'react'
import { Car, Building, FileCheck, ChevronDown, ChevronUp, Check, AlertTriangle } from 'lucide-react'

interface Hotel {
  city: string
  name: string
  nights: number
  pricePerNight: string
  features: string[]
  bookingTip: string
}

const hotels: Hotel[] = [
  {
    city: '洛杉矶',
    name: '好莱坞区域酒店',
    nights: 5,
    pricePerNight: '$150-200',
    features: ['临近环球影城', '免费停车', '游泳池', '家庭房'],
    bookingTip: '提前2-3个月预订获得最佳价格',
  },
  {
    city: '圣地亚哥',
    name: '米森谷酒店',
    nights: 3,
    pricePerNight: '$140-180',
    features: ['中心位置', '临近动物园和老城', '含早餐', '亲子友好'],
    bookingTip: '周末价格比工作日低',
  },
  {
    city: '蒙特雷',
    name: '罐头厂街酒店',
    nights: 2,
    pricePerNight: '$180-250',
    features: ['海景', '步行可达水族馆', '壁炉', '赠送酒水'],
    bookingTip: '预订带厨房房间可节省费用',
  },
  {
    city: '旧金山',
    name: '渔人码头酒店',
    nights: 4,
    pricePerNight: '$170-220',
    features: ['临近39号码头', '缆车可达', '海港景', '酒店内餐厅'],
    bookingTip: '使用酒店停车，街边停车困难',
  },
]

const carRentalInfo = {
  company: 'Alamo或Enterprise',
  vehicleType: '中型SUV（雪佛兰探索者或类似车型）',
  duration: '15天',
  estimatedCost: '$950 (6,800元)',
  insurance: '建议全险（额外$220）',
  features: ['GPS导航', '无里程限制', '儿童座椅可用', '24/7道路救援'],
  tips: [
    '有优惠时预订"租5免2"套餐',
    '自带儿童安全座椅可节省$10/天',
    '使用谷歌地图而非租用GPS',
    '还车前加满油 - 机场价格更高',
    '开车前拍摄车辆照片',
  ],
  documents: [
    '有效护照',
    '中国驾照',
    '公证件翻译',
    '国际信用卡（Visa/MasterCard）',
    '租车确认单打印件',
  ],
}

const packingList = {
  documents: [
    { item: '护照（有效期6个月以上）', essential: true },
    { item: '驾照 + 翻译件', essential: true },
    { item: '酒店确认单（打印件）', essential: true },
    { item: '旅行保险文件', essential: true },
    { item: '信用卡（2家不同银行）', essential: true },
    { item: '紧急联系人清单', essential: true },
  ],
  clothing: [
    { item: '分层穿衣（T恤+外套）', essential: true },
    { item: '舒适步行鞋', essential: true },
    { item: '泳装（酒店泳池）', essential: false },
    { item: '太阳帽和太阳镜', essential: true },
    { item: '轻便雨衣', essential: false },
    { item: '保暖外套（旧金山雾气）', essential: true },
  ],
  electronics: [
    { item: '手机 + 充电器', essential: true },
    { item: '移动电源（20000mAh+）', essential: true },
    { item: '相机 + 充电器', essential: false },
    { item: '美国SIM卡或WiFi设备', essential: true },
    { item: '平板（儿童娱乐）', essential: false },
    { item: '耳机', essential: false },
  ],
  kids: [
    { item: '儿童安全座椅', essential: true },
    { item: '晕车药', essential: true },
    { item: '喜欢的玩具/书本', essential: false },
    { item: '零食和水瓶', essential: true },
    { item: '儿童防晒霜', essential: true },
    { item: '急救包', essential: true },
  ],
}

export default function LogisticsPage() {
  const [expandedHotel, setExpandedHotel] = useState<string | null>(null)
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const toggleCheck = (item: string) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(item)) {
      newChecked.delete(item)
    } else {
      newChecked.add(item)
    }
    setCheckedItems(newChecked)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-16 border-b border-black">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="w-24 h-1 bg-black mb-6"></div>
          <h1 className="text-h1 font-bold mb-4">后勤指南</h1>
          <p className="text-xl text-dark max-w-2xl">
            您需要了解的关于酒店、租车和打包的所有信息。
          </p>
        </div>
      </section>

      {/* Hotels Section */}
      <section className="py-16 border-b border-black">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <Building size={28} className="text-california" />
            <h2 className="text-h2 font-bold">住宿安排</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotels.map((hotel) => (
              <div key={hotel.city} className="border border-black bg-white">
                <div
                  className="p-6 cursor-pointer hover:bg-light transition-colors"
                  onClick={() =>
                    setExpandedHotel(expandedHotel === hotel.city ? null : hotel.city)
                  }
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-sm text-california font-bold">
                        {hotel.nights} 晚
                      </span>
                      <h3 className="text-h3 font-bold mt-1">{hotel.city}</h3>
                      <p className="text-dark mt-2">{hotel.name}</p>
                      <p className="text-california font-bold mt-2">
                        {hotel.pricePerNight}/晚
                      </p>
                    </div>
                    {expandedHotel === hotel.city ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </div>
                </div>

                {expandedHotel === hotel.city && (
                  <div className="border-t border-black p-6 bg-light">
                    <div className="mb-4">
                      <h4 className="text-sm font-bold uppercase tracking-wider mb-3">
                        特色
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {hotel.features.map((f, i) => (
                          <span key={i} className="px-3 py-1 bg-white border border-black text-sm">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-3 bg-california/10 border-l-4 border-california">
                      <p className="text-sm font-bold">贴士: {hotel.bookingTip}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-light border border-black">
            <p className="font-bold">总住宿费用: ~15,200元 ($2,125)</p>
            <p className="text-sm text-grey mt-2">
              基于14晚平均价格。提前预订获得最佳价格。
            </p>
          </div>
        </div>
      </section>

      {/* Car Rental Section */}
      <section className="py-16 border-b border-black">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <Car size={28} className="text-california" />
            <h2 className="text-h2 font-bold">租车服务</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <div className="border border-black p-6 bg-white">
                <h3 className="text-h3 font-bold mb-4">推荐配置</h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-light">
                    <span className="text-grey">公司</span>
                    <span className="font-bold">{carRentalInfo.company}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-light">
                    <span className="text-grey">车型</span>
                    <span className="font-bold">{carRentalInfo.vehicleType}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-light">
                    <span className="text-grey">时长</span>
                    <span className="font-bold">{carRentalInfo.duration}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-light">
                    <span className="text-grey">预估费用</span>
                    <span className="font-bold text-california">{carRentalInfo.estimatedCost}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-grey">保险</span>
                    <span className="font-bold">{carRentalInfo.insurance}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-black">
                  <h4 className="font-bold mb-3">包含服务</h4>
                  <div className="flex flex-wrap gap-2">
                    {carRentalInfo.features.map((f, i) => (
                      <span key={i} className="px-3 py-1 bg-light text-sm">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 space-y-6">
              <div className="border border-black p-6 bg-white">
                <h4 className="font-bold mb-4">所需证件</h4>
                <ul className="space-y-2">
                  {carRentalInfo.documents.map((doc, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check size={16} className="text-california" />
                      <span className="text-sm">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-california p-6 bg-california/5">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  <AlertTriangle size={18} className="text-california" />
                  实用贴士
                </h4>
                <ul className="space-y-3">
                  {carRentalInfo.tips.map((tip, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-california mt-2 flex-shrink-0"></div>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packing List Section */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <FileCheck size={28} className="text-california" />
            <h2 className="text-h2 font-bold">打包清单</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(packingList).map(([category, items]) => (
              <div key={category} className="border border-black bg-white">
                <div className="p-4 bg-black text-white">
                  <h3 className="font-bold uppercase tracking-wider">
                    {category === 'documents'
                      ? '证件'
                      : category === 'clothing'
                      ? '衣物'
                      : category === 'electronics'
                      ? '电子设备'
                      : '儿童用品'}
                  </h3>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    {items.map((item, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-3 p-2 cursor-pointer hover:bg-light transition-colors ${
                          checkedItems.has(item.item) ? 'opacity-50' : ''
                        }`}
                        onClick={() => toggleCheck(item.item)}
                      >
                        <div
                          className={`w-5 h-5 border flex-shrink-0 flex items-center justify-center ${
                            checkedItems.has(item.item)
                              ? 'bg-california border-california'
                              : 'border-black'
                          }`}
                        >
                          {checkedItems.has(item.item) && <Check size={14} className="text-white" />}
                        </div>
                        <span
                          className={`text-sm ${
                            item.essential ? 'font-bold' : ''
                          } ${checkedItems.has(item.item) ? 'line-through' : ''}`}
                        >
                          {item.item}
                          {item.essential && (
                            <span className="text-california ml-1">*</span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-grey">
            <span className="text-california">*</span> = 必需物品。
            点击物品标记为已打包。
          </p>
        </div>
      </section>
    </div>
  )
}