import { useState } from 'react'
import { MapPin, Clock, DollarSign, Star, ChevronDown, ChevronUp } from 'lucide-react'

interface Destination {
  id: string
  name: string
  type: 'city' | 'nature'
  region: string
  description: string
  highlights: string[]
  bestTime: string
  duration: string
  cost: string
  tips: string[]
}

const destinations: Destination[] = [
  {
    id: 'la',
    name: '洛杉矶',
    type: 'city',
    region: '南加州',
    description: '世界娱乐之都。好莱坞的故乡，拥有世界级主题公园和美丽海滩。',
    highlights: ['环球影城', '加州迪士尼乐园', '好莱坞星光大道', '圣莫尼卡海滩', '格利菲斯天文台'],
    bestTime: '全年适宜，2月人流较少',
    duration: '建议4-5天',
    cost: '主题公园：$100-200/人/天',
    tips: ['提前在线购买主题公园门票', 'In-N-Out汉堡性价比高', '傍晚去格利菲斯天文台看日落'],
  },
  {
    id: 'sd',
    name: '圣地亚哥',
    type: 'city',
    region: '南加州',
    description: '美国最美好城市，天气宜人、海滩壮观、亲子友好景点丰富。',
    highlights: ['圣地亚哥动物园', '海洋世界', '老城区', '巴尔博亚公园', '科罗纳多岛'],
    bestTime: '全年天气宜人',
    duration: '建议2-3天',
    cost: '动物园/海洋世界：$50-60/人',
    tips: ['老城区有正宗墨西哥美食', '科罗纳多岛海滩美丽', '巴尔博亚公园周二博物馆免费'],
  },
  {
    id: 'sf',
    name: '旧金山',
    type: 'city',
    region: '北加州',
    description: '以标志性金门大桥、历史缆车和多元社区闻名的文化中心。',
    highlights: ['金门大桥', '恶魔岛', '渔人码头', '中国城', '金门公园'],
    bestTime: '9-11月天气最佳',
    duration: '建议3-4天',
    cost: '恶魔岛：$40-45/人',
    tips: ['恶魔岛门票需提前几周预订', '注意分层穿衣天气变化快', '品尝酸面包装蛤蜊浓汤'],
  },
  {
    id: 'pch',
    name: '一号公路',
    type: 'nature',
    region: '中央海岸',
    description: '世界上最美丽的公路之一，沿着壮观悬崖和原始海滩蜿蜒前行。',
    highlights: ['大苏尔', '比克斯比溪桥', '麦克韦瀑布', '17英里海岸风景线', '卡梅尔小镇'],
    bestTime: '4-5月，9-10月',
    duration: '建议2-3天深度游览',
    cost: '17英里海岸线：$12.25/车',
    tips: ['北向南行驶看海景', '大苏尔前加满油站有限', '带孩子备晕车药'],
  },
  {
    id: 'monterey',
    name: '蒙特雷湾',
    type: 'nature',
    region: '中央海岸',
    description: '世界知名水族馆和壮观海岸风景。海洋生物爱好者的完美之地。',
    highlights: ['蒙特雷湾水族馆', '罐头厂街', '17英里海岸线', '波因特洛博斯', '观鲸'],
    bestTime: '12-3月观鲸最佳',
    duration: '建议1-2天',
    cost: '水族馆：$50-60/人',
    tips: ['下午水族馆人少', '观鲸之旅需提前预订', '罐头厂街品尝海鲜'],
  },
  {
    id: 'yosemite',
    name: '优胜美地国家公园',
    type: 'nature',
    region: '内华达山脉',
    description: '标志性花岗岩悬崖、瀑布和巨杉。2月有雪覆盖的美景。',
    highlights: ['半穹顶', '酋长岩', '优胜美地瀑布', '冰川点', '马里波萨丛林'],
    bestTime: '5-10月（冬季部分道路关闭）',
    duration: '建议1-2天',
    cost: '$35/车（7天通票）',
    tips: ['冬季检查路况', '冬季需备防滑链', '谷底全年可通行'],
  },
]

export default function DestinationsPage() {
  const [filter, setFilter] = useState<'all' | 'city' | 'nature'>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = filter === 'all' ? destinations : destinations.filter((d) => d.type === filter)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-16 border-b border-black">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="w-24 h-1 bg-black mb-6"></div>
          <h1 className="text-h1 font-bold mb-4">目的地指南</h1>
          <p className="text-xl text-dark max-w-2xl">
            探索加州令人惊叹的城市、海滩和自然奇观。
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="border-b border-black bg-light">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-4 py-4">
            <span className="text-sm font-bold uppercase tracking-wider">筛选:</span>
            {(['all', 'city', 'nature'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-bold uppercase transition-colors ${
                  filter === f
                    ? 'bg-black text-white'
                    : 'bg-white text-black border border-black hover:bg-black hover:text-white'
                }`}
              >
                {f === 'all' ? '全部' : f === 'city' ? '城市' : '自然'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="space-y-6">
            {filtered.map((dest) => (
              <div key={dest.id} className="border border-black bg-white">
                {/* Card Header */}
                <div
                  className="p-6 cursor-pointer hover:bg-light transition-colors"
                  onClick={() => setExpanded(expanded === dest.id ? null : dest.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`px-2 py-1 text-xs font-bold uppercase ${
                            dest.type === 'city'
                              ? 'bg-black text-white'
                              : 'bg-california text-white'
                          }`}
                        >
                          {dest.type === 'city' ? '城市' : '自然'}
                        </span>
                        <span className="text-sm text-grey">{dest.region}</span>
                      </div>
                      <h2 className="text-h2 font-bold mb-2">{dest.name}</h2>
                      <p className="text-dark max-w-2xl">{dest.description}</p>
                    </div>
                    <button className="p-2 ml-4">
                      {expanded === dest.id ? (
                        <ChevronUp size={24} />
                      ) : (
                        <ChevronDown size={24} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Content */}
                {expanded === dest.id && (
                  <div className="border-t border-black bg-light p-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                      {/* Highlights */}
                      <div className="md:col-span-5">
                        <h3 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                          <Star size={16} className="text-california" />
                          亮点
                        </h3>
                        <ul className="space-y-2">
                          {dest.highlights.map((h, i) => (
                            <li key={i} className="flex items-center gap-3 p-3 bg-white border border-black">
                              <div className="w-2 h-2 bg-california"></div>
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Details */}
                      <div className="md:col-span-4">
                        <h3 className="font-bold text-sm uppercase tracking-wider mb-4">
                          详细信息
                        </h3>
                        <div className="space-y-4">
                          <div className="p-4 bg-white border border-black">
                            <div className="flex items-center gap-2 text-grey mb-1">
                              <Clock size={14} />
                              <span className="text-xs uppercase">最佳时间</span>
                            </div>
                            <p className="font-bold">{dest.bestTime}</p>
                          </div>
                          <div className="p-4 bg-white border border-black">
                            <div className="flex items-center gap-2 text-grey mb-1">
                              <MapPin size={14} />
                              <span className="text-xs uppercase">游览时长</span>
                            </div>
                            <p className="font-bold">{dest.duration}</p>
                          </div>
                          <div className="p-4 bg-white border border-black">
                            <div className="flex items-center gap-2 text-grey mb-1">
                              <DollarSign size={14} />
                              <span className="text-xs uppercase">费用</span>
                            </div>
                            <p className="font-bold">{dest.cost}</p>
                          </div>
                        </div>
                      </div>

                      {/* Tips */}
                      <div className="md:col-span-3">
                        <h3 className="font-bold text-sm uppercase tracking-wider mb-4">
                          实用贴士
                        </h3>
                        <div className="space-y-3">
                          {dest.tips.map((tip, i) => (
                            <div key={i} className="p-3 bg-california/10 border-l-4 border-california">
                              <p className="text-sm">{tip}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}