import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { MapPin, Calendar, DollarSign, Car, Users, Sun, ChevronRight } from 'lucide-react'

interface TripData {
  trip: {
    title: string
    duration: number
    travelers: { adults: number; children: number }
    budget: { amount: number; currency: string }
    totalDistance: string
  }
  phases: { id: number; name: string; days: string; color: string }[]
}

export default function HomePage() {
  const [data, setData] = useState<TripData | null>(null)

  useEffect(() => {
    fetch('/data/itinerary.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const stats = [
    { label: '天数', value: '15', unit: '天', icon: Calendar },
    { label: '城市', value: '3', unit: '座', icon: MapPin },
    { label: '预算', value: '70,000', unit: '元', icon: DollarSign },
    { label: '里程', value: '2,500', unit: 'km', icon: Car },
  ]

  const highlights = [
    {
      title: '洛杉矶',
      subtitle: '主题公园与好莱坞',
      description: '迪士尼乐园、环球影城、圣莫尼卡海滩',
      days: '第1-5天',
    },
    {
      title: '圣地亚哥',
      subtitle: '休闲度假',
      description: '老城区、动物园、海洋世界',
      days: '第6-8天',
    },
    {
      title: '一号公路',
      subtitle: '太平洋海岸自驾',
      description: '大苏尔、蒙特雷水族馆、17英里风景线',
      days: '第9-11天',
    },
    {
      title: '旧金山',
      subtitle: '文化与创新',
      description: '金门大桥、恶魔岛、渔人码头',
      days: '第12-15天',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-light via-white to-california/5"></div>
        <div className="max-w-[1200px] mx-auto px-6 py-24 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="w-24 h-1 bg-black mb-8"></div>
              <p className="text-sm uppercase tracking-[0.2em] text-grey mb-4">2027年寒假</p>
              <h1 className="text-[42px] lg:text-[64px] font-bold leading-[1.1] mb-6">
                加州15天<br />
                <span className="text-california">家庭旅行</span><br />
                完整规划
              </h1>
              <p className="text-xl text-dark mb-8 max-w-lg leading-relaxed">
                两大两小家庭的深度游计划。从洛杉矶出发，途经圣地亚哥，
                沿着世界最美公路一号公路北上，最终抵达旧金山。
                总预算控制在7万人民币以内。
              </p>
              <div className="flex items-center gap-3 mb-8 text-sm text-grey">
                <Users size={18} />
                <span>2成人 + 2儿童</span>
                <span className="mx-2">|</span>
                <Calendar size={18} />
                <span>15天14晚</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/itinerary" className="swiss-button flex items-center gap-2">
                  查看行程
                  <ChevronRight size={18} />
                </Link>
                <Link to="/budget" className="swiss-button-outline">
                  预算明细
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-br from-california/20 to-california/5 border border-black">
                  <img 
                    src="/images/IMG_1824.jpeg" 
                    alt="加州家庭旅行" 
                    className="w-full h-full object-cover mix-blend-multiply"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  <div className="absolute inset-0 flex items-end p-8 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="text-white">
                      <p className="text-h3 font-bold">Golden State</p>
                      <p className="text-white/80 mt-1">阳光加州，无限精彩</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-california flex items-center justify-center">
                  <Sun size={40} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-black bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`p-8 text-center ${
                  index < stats.length - 1 ? 'border-r border-black' : ''
                } ${index < 2 ? 'border-b lg:border-b-0 border-black' : ''}`}
              >
                <stat.icon size={32} className="mx-auto mb-4 text-california" />
                <div className="text-h2 font-bold font-tabular">
                  {stat.value}<span className="text-base text-grey ml-1">{stat.unit}</span>
                </div>
                <div className="text-small text-grey uppercase tracking-wider mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-16">
            <div className="w-24 h-1 bg-black mb-6"></div>
            <h2 className="text-h1 font-bold">行程亮点</h2>
            <p className="text-dark mt-4 max-w-2xl">
              15天行程划分为五个阶段，涵盖3座核心城市、5个主题公园、
              3个国家公园和1条经典自驾公路。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item) => (
              <div key={item.title} className="swiss-card group cursor-pointer hover:border-california transition-colors">
                <div className="aspect-[4/3] bg-gradient-to-br from-light to-white flex items-center justify-center border-b border-black group-hover:bg-california/10 transition-colors">
                  <MapPin size={48} className="text-california" />
                </div>
                <div className="p-6">
                  <span className="text-small text-california font-bold">{item.days}</span>
                  <h3 className="text-h3 font-bold mt-2">{item.title}</h3>
                  <p className="text-sm text-grey mb-3">{item.subtitle}</p>
                  <p className="text-dark text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Route Preview */}
      <section className="py-24 bg-light">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="w-24 h-1 bg-black mb-6"></div>
              <h2 className="text-h1 font-bold mb-6">路线概览</h2>
              <p className="text-dark mb-8 leading-relaxed">
                行程从洛杉矶国际机场开始，先向南探索圣地亚哥，
                再沿着一号公路北上，途经蒙特雷、大苏尔，
                最终抵达旧金山。全程约2,500公里。
              </p>
              <div className="space-y-3">
                {data?.phases.map((phase) => (
                  <div key={phase.id} className="flex items-center gap-4 p-4 bg-white border border-black group hover:border-california transition-colors">
                    <div className="w-3 h-3" style={{ backgroundColor: phase.color }}></div>
                    <span className="font-bold flex-1">{phase.name}</span>
                    <span className="text-grey text-sm">第{phase.days}天</span>
                  </div>
                ))}
              </div>
              <Link to="/itinerary" className="inline-flex items-center gap-2 mt-8 text-california font-bold hover:underline">
                查看详细行程
                <ChevronRight size={18} />
              </Link>
            </div>
            <div className="lg:col-span-7">
              <div className="aspect-[4/3] bg-white border border-black p-8 flex items-center justify-center">
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* California simplified outline */}
                  <path
                    d="M 120 30 Q 80 80 90 140 Q 100 200 130 260 L 200 290 L 280 260 Q 320 200 300 140 Q 280 80 240 30 Z"
                    fill="#EEEEEE"
                    stroke="#333333"
                    strokeWidth="1"
                  />
                  {/* Route line with animation */}
                  <path
                    d="M 200 200 L 220 240 Q 200 220 180 180 Q 170 150 160 120 L 150 80"
                    fill="none"
                    stroke="#FF5722"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Cities */}
                  <g>
                    <circle cx="200" cy="200" r="10" fill="#FF5722" />
                    <text x="215" y="205" className="text-xs font-bold" fill="#333">洛杉矶</text>
                  </g>
                  <g>
                    <circle cx="220" cy="240" r="8" fill="#333333" />
                    <text x="235" y="245" className="text-xs" fill="#333">圣地亚哥</text>
                  </g>
                  <g>
                    <circle cx="165" cy="130" r="8" fill="#333333" />
                    <text x="180" y="135" className="text-xs" fill="#333">蒙特雷</text>
                  </g>
                  <g>
                    <circle cx="150" cy="80" r="10" fill="#FF5722" />
                    <text x="165" y="85" className="text-xs font-bold" fill="#333">旧金山</text>
                  </g>
                  {/* Pacific Ocean label */}
                  <text x="60" y="180" className="text-xs" fill="#9E9E9E" transform="rotate(-90, 60, 180)">太平洋</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Budget Preview */}
      <section className="py-24 bg-white border-t border-black">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-24 h-1 bg-black mb-6"></div>
              <h2 className="text-h1 font-bold mb-6">预算规划</h2>
              <p className="text-dark mb-8 leading-relaxed">
                通过选择2月寒假出行、提前预订、利用折扣平台，
                两大两小家庭完全可以将15天加州深度游预算控制在7万人民币以内。
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-light border border-black">
                  <p className="text-sm text-grey">机票+住宿</p>
                  <p className="text-h3 font-bold font-tabular">27,200元</p>
                </div>
                <div className="p-4 bg-light border border-black">
                  <p className="text-sm text-grey">租车+交通</p>
                  <p className="text-h3 font-bold font-tabular">8,600元</p>
                </div>
                <div className="p-4 bg-light border border-black">
                  <p className="text-sm text-grey">餐饮+门票</p>
                  <p className="text-h3 font-bold font-tabular">24,520元</p>
                </div>
                <div className="p-4 bg-light border border-black">
                  <p className="text-sm text-grey">购物+其他</p>
                  <p className="text-h3 font-bold font-tabular">9,680元</p>
                </div>
              </div>
              <Link to="/budget" className="swiss-button inline-flex items-center gap-2">
                查看预算计算器
                <ChevronRight size={18} />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Pie chart */}
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#EEEEEE" strokeWidth="30" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#FF5722" strokeWidth="30" 
                    strokeDasharray="150 502" strokeDashoffset="0" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#333333" strokeWidth="30" 
                    strokeDasharray="120 502" strokeDashoffset="-150" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#9E9E9E" strokeWidth="30" 
                    strokeDasharray="180 502" strokeDashoffset="-270" />
                  <text x="100" y="95" textAnchor="middle" className="text-h2 font-bold" fill="#333">70,000</text>
                  <text x="100" y="115" textAnchor="middle" className="text-sm" fill="#9E9E9E">人民币</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-h1 font-bold mb-6">开始规划您的旅程</h2>
          <p className="text-xl text-grey mb-8 max-w-2xl mx-auto">
            深入了解15天详细行程，探索精彩目的地，
            规划一次完美的加州家庭冒险之旅。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/itinerary"
              className="inline-block px-8 py-4 bg-california text-white font-bold text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-colors"
            >
              查看行程
            </Link>
            <Link
              to="/destinations"
              className="inline-block px-8 py-4 bg-transparent text-white font-bold text-sm tracking-wider uppercase border border-white hover:bg-white hover:text-black transition-colors"
            >
              目的地指南
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}