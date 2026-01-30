import { Outlet, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: '/', label: '首页' },
    { to: '/itinerary', label: '行程' },
    { to: '/destinations', label: '目的地' },
    { to: '/logistics', label: '后勤' },
    { to: '/budget', label: '预算' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <NavLink to="/" className="font-bold text-lg tracking-wide">
            加州2027
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-bold tracking-wider transition-colors hover:text-california ${
                    isActive ? 'text-california border-b-4 border-california pb-1' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden border-t border-black bg-white">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-6 py-4 text-sm font-bold tracking-wider border-b border-light hover:bg-light ${
                    isActive ? 'text-california bg-light' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-black bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <h3 className="text-h3 mb-4">加州2027</h3>
              <p className="text-dark max-w-md">
                15天家庭旅行规划，打造难忘的加州冒险之旅。
                两大两小，7万人民币预算。
              </p>
            </div>
            <div className="md:col-span-5">
              <h4 className="font-bold text-sm tracking-wider mb-4">快速链接</h4>
              <div className="flex flex-wrap gap-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className="text-sm text-dark hover:text-california"
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-light">
            <p className="text-small text-grey">
              MiniMax Agent | 加州家庭旅行规划师 2027
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}