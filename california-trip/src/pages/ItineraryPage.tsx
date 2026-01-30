import { useState, useEffect } from 'react'
import { MapPin, Clock, Car, Camera, Utensils, Bed, ChevronDown, ChevronUp } from 'lucide-react'

interface DayPlan {
  day: number
  phase: number
  title: string
  city: string
  activities: string[]
  highlights: string[]
  accommodation: string
  driving: string
  tips: string
}

interface Phase {
  id: number
  name: string
  days: string
  color: string
}

interface ItineraryData {
  trip: {
    title: string
    duration: number
    travelers: { adults: number; children: number }
    budget: { amount: number; currency: string }
    totalDistance: string
  }
  phases: Phase[]
  days: DayPlan[]
}

export default function ItineraryPage() {
  const [data, setData] = useState<ItineraryData | null>(null)
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  useEffect(() => {
    fetch('/data/itinerary.json')
      .then(res => res.json())
      .then(setData)
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-xl">加载中...</p>
      </div>
    )
  }

  const filteredDays = selectedPhase
    ? data.days.filter(d => d.phase === selectedPhase)
    : data.days

  const getPhase = (phaseId: number) => data.phases.find(p => p.id === phaseId)

  return (
    <div className="min-h-screen bg-white">
      {/* 头部 */}
      <section className="py-16 border-b border-black">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="w-24 h-1 bg-black mb-6"></div>
          <h1 className="text-h1 font-bold mb-4">15天行程规划</h1>
          <p className="text-xl text-dark max-w-2xl">
            {data.trip.title}，全程约{data.trip.totalDistance}。
            点击任意一天查看详细安排。
          </p>
        </div>
      </section>

      {/* 阶段筛选 */}
      <section className="border-b border-black bg-light">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-wrap items-center gap-4 py-4">
            <span className="text-sm font-bold uppercase tracking-wider">筛选:</span>
            <button
              onClick={() => setSelectedPhase(null)}
              className={`px-4 py-2 text-sm font-bold transition-colors ${
                !selectedPhase
                  ? 'bg-black text-white'
                  : 'bg-white text-black border border-black hover:bg-black hover:text-white'
              }`}
            >
              全部
            </button>
            {data.phases.map(phase => (
              <button
                key={phase.id}
                onClick={() => setSelectedPhase(phase.id)}
                className={`px-4 py-2 text-sm font-bold transition-colors ${
                  selectedPhase === phase.id
                    ? 'bg-california text-white'
                    : 'bg-white text-black border border-black hover:bg-california hover:text-white'
                }`}
              >
                {phase.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 时间线 */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="space-y-0">
            {filteredDays.map(day => {
              const phase = getPhase(day.phase)
              const isExpanded = selectedDay === day.day

              return (
                <div
                  key={day.day}
                  className="border border-black border-b-0 last:border-b bg-white"
                >
                  {/* 日期头部 */}
                  <button
                    onClick={() => setSelectedDay(isExpanded ? null : day.day)}
                    className="w-full text-left"
                  >
                    <div className="grid grid-cols-12 gap-4 p-6 hover:bg-light transition-colors">
                      <div className="col-span-2 md:col-span-1">
                        <div className="text-h2 font-bold text-california">
                          {String(day.day).padStart(2, '0')}
                        </div>
                      </div>
                      <div className="col-span-8 md:col-span-8">
                        <h3 className="text-h3 font-bold">{day.title}</h3>
                        <div className="flex items-center gap-2 mt-2 text-grey">
                          <MapPin size={14} />
                          <span className="text-sm">{day.city}</span>
                          <span className="mx-2">|</span>
                          <Car size={14} />
                          <span className="text-sm">{day.driving}</span>
                        </div>
                      </div>
                      <div className="col-span-2 md:col-span-3 flex items-center justify-end gap-2">
                        <span
                          className="hidden md:inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-black text-white"
                        >
                          {phase?.name.substring(0, 6)}
                        </span>
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                  </button>

                  {/* 展开内容 */}
                  {isExpanded && (
                    <div className="border-t border-black bg-light">
                      <div className="grid grid-cols-12 gap-6 p-6">
                        {/* 亮点 */}
                        <div className="col-span-12 md:col-span-4">
                          <h4 className="font-bold text-sm uppercase tracking-wider mb-4">
                            亮点
                          </h4>
                          <ul className="space-y-2">
                            {day.highlights.map((h, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-california"></div>
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 活动安排 */}
                        <div className="col-span-12 md:col-span-5">
                          <h4 className="font-bold text-sm uppercase tracking-wider mb-4">
                            活动安排
                          </h4>
                          <div className="space-y-2">
                            {day.activities.map((act, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-3 p-3 bg-white border border-black"
                              >
                                <Camera size={16} className="text-california flex-shrink-0" />
                                <span>{act}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 实用信息 */}
                        <div className="col-span-12 md:col-span-3">
                          <h4 className="font-bold text-sm uppercase tracking-wider mb-4">
                            实用信息
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-start gap-2">
                              <Bed size={16} className="text-grey mt-1 flex-shrink-0" />
                              <span className="text-sm">{day.accommodation}</span>
                            </div>
                            <div className="p-3 bg-california/10 border-l-4 border-california">
                              <p className="text-sm">{day.tips}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}