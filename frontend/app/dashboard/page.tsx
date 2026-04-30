'use client'

export default function DashboardPage() {
  const stats = [
    { label: 'Total Aset', value: '124', icon: '🚛', color: 'bg-blue-50 text-blue-600' },
    { label: 'Perlu Servis', value: '8', icon: '⚠️', color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Dalam Perawatan', value: '3', icon: '🔧', color: 'bg-orange-50 text-orange-600' },
    { label: 'Kondisi Baik', value: '113', icon: '✅', color: 'bg-green-50 text-green-600' },
  ]

  const recentData = [
    { id: 'TRK-001', aset: 'Truk Fuso BE 1234 AB', jenis: 'Ganti Oli', tanggal: '29 Apr 2026', status: 'Selesai' },
    { id: 'TRK-002', aset: 'Truk Hino BE 5678 CD', jenis: 'Cek Ban', tanggal: '28 Apr 2026', status: 'Proses' },
    { id: 'TRK-003', aset: 'Forklift FL-03', jenis: 'Servis Mesin', tanggal: '27 Apr 2026', status: 'Pending' },
    { id: 'TRK-004', aset: 'Truk Mitsubishi BE 9012 EF', jenis: 'Ganti Filter', tanggal: '26 Apr 2026', status: 'Selesai' },
  ]

  const statusColor: Record<string, string> = {
    'Selesai': 'bg-green-100 text-green-700',
    'Proses': 'bg-blue-100 text-blue-700',
    'Pending': 'bg-yellow-100 text-yellow-700',
  }

  const navMenus = [
    { label: '📊 Dashboard', href: '/dashboard', active: true },
    { label: '📋 Input Data', href: '/dashboard/form', active: false },
    { label: '🤖 Anomali AI', href: '/dashboard/anomaly', active: false },
    { label: '📅 Jadwal Prediktif', href: '/dashboard/schedule', active: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">LogiSense AI</h1>
        <div className="flex items-center gap-6">
          {navMenus.map((menu, i) => (
            <button
              key={i}
              onClick={() => window.location.href = menu.href}
              className={`text-sm font-medium transition-colors ${
                menu.active
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {menu.label}
            </button>
          ))}
          <button
            onClick={() => window.location.href = '/login'}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Keluar
          </button>
        </div>
      </nav>

      <div className="p-6 max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-500 text-sm mt-1">Pantau kondisi aset logistik secara real-time</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-xl ${stat.color} mb-3`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Access */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => window.location.href = '/dashboard/form'}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-4 text-left transition-colors"
          >
            <div className="text-2xl mb-2">📋</div>
            <div className="font-semibold">Input Data Baru</div>
            <div className="text-blue-200 text-xs mt-1">Catat perawatan aset</div>
          </button>
          <button
            onClick={() => window.location.href = '/dashboard/anomaly'}
            className="bg-red-500 hover:bg-red-600 text-white rounded-xl p-4 text-left transition-colors"
          >
            <div className="text-2xl mb-2">🤖</div>
            <div className="font-semibold">Cek Anomali AI</div>
            <div className="text-red-200 text-xs mt-1">3 anomali terdeteksi</div>
          </button>
          <button
            onClick={() => window.location.href = '/dashboard/schedule'}
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-4 text-left transition-colors"
          >
            <div className="text-2xl mb-2">📅</div>
            <div className="font-semibold">Jadwal Prediktif</div>
            <div className="text-green-200 text-xs mt-1">1 aset kritis hari ini</div>
          </button>
        </div>

        {/* Recent Maintenance Table */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Riwayat Pemeliharaan Terbaru</h3>
            <button
              onClick={() => window.location.href = '/dashboard/form'}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
            >
              + Input Data
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Aset</th>
                  <th className="px-4 py-3 text-left">Jenis Perawatan</th>
                  <th className="px-4 py-3 text-left">Tanggal</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentData.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">{row.id}</td>
                    <td className="px-4 py-3 text-gray-600">{row.aset}</td>
                    <td className="px-4 py-3 text-gray-600">{row.jenis}</td>
                    <td className="px-4 py-3 text-gray-500">{row.tanggal}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}