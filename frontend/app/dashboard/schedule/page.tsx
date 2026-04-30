'use client'

import { useState } from 'react'

export default function SchedulePage() {
  const [filter, setFilter] = useState('Semua')

  const schedules = [
    {
      id: 'TRK-001',
      aset: 'Truk Fuso BE 1234 AB',
      perawatan: 'Ganti Oli',
      terakhir: '1 Mar 2026',
      prediksi: '1 Jun 2026',
      sisa: 32,
      kondisi: 'Baik',
    },
    {
      id: 'TRK-002',
      aset: 'Truk Hino BE 5678 CD',
      perawatan: 'Cek Rem',
      terakhir: '15 Mar 2026',
      prediksi: '5 Mei 2026',
      sisa: 5,
      kondisi: 'Segera',
    },
    {
      id: 'FL-03',
      aset: 'Forklift FL-03',
      perawatan: 'Servis Mesin',
      terakhir: '10 Feb 2026',
      prediksi: '30 Apr 2026',
      sisa: 0,
      kondisi: 'Kritis',
    },
    {
      id: 'TRK-004',
      aset: 'Truk Mitsubishi BE 9012 EF',
      perawatan: 'Tune Up',
      terakhir: '20 Apr 2026',
      prediksi: '20 Jul 2026',
      sisa: 81,
      kondisi: 'Baik',
    },
    {
      id: 'VAN-005',
      aset: 'Van Toyota BE 3456 GH',
      perawatan: 'Ganti Filter',
      terakhir: '5 Apr 2026',
      prediksi: '10 Mei 2026',
      sisa: 10,
      kondisi: 'Perhatian',
    },
  ]

  const kondisiColor: Record<string, string> = {
    'Baik': 'bg-green-100 text-green-700',
    'Perhatian': 'bg-yellow-100 text-yellow-700',
    'Segera': 'bg-orange-100 text-orange-700',
    'Kritis': 'bg-red-100 text-red-700',
  }

  const kondisiBar: Record<string, string> = {
    'Baik': 'bg-green-500',
    'Perhatian': 'bg-yellow-500',
    'Segera': 'bg-orange-500',
    'Kritis': 'bg-red-500',
  }

  const filters = ['Semua', 'Kritis', 'Segera', 'Perhatian', 'Baik']

  const filtered = filter === 'Semua'
    ? schedules
    : schedules.filter(s => s.kondisi === filter)

  const getBarWidth = (sisa: number) => {
    if (sisa === 0) return 'w-full'
    if (sisa <= 5) return 'w-11/12'
    if (sisa <= 10) return 'w-3/4'
    if (sisa <= 30) return 'w-1/2'
    return 'w-1/4'
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">LogiSense AI</h1>
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Kembali ke Dashboard
        </button>
      </nav>

      <div className="p-6 max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Jadwal Prediktif</h2>
          <p className="text-gray-500 text-sm mt-1">
            AI memprediksi jadwal perawatan berikutnya berdasarkan riwayat data
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Kritis', value: schedules.filter(s => s.kondisi === 'Kritis').length, color: 'bg-red-50 text-red-600 border-red-100' },
            { label: 'Segera', value: schedules.filter(s => s.kondisi === 'Segera').length, color: 'bg-orange-50 text-orange-600 border-orange-100' },
            { label: 'Perhatian', value: schedules.filter(s => s.kondisi === 'Perhatian').length, color: 'bg-yellow-50 text-yellow-600 border-yellow-100' },
            { label: 'Baik', value: schedules.filter(s => s.kondisi === 'Baik').length, color: 'bg-green-50 text-green-600 border-green-100' },
          ].map((item, i) => (
            <div key={i} className={`border rounded-xl p-4 ${item.color}`}>
              <div className="text-2xl font-bold">{item.value}</div>
              <div className="text-sm mt-1">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border text-gray-600 hover:bg-gray-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="space-y-4">
          {filtered.map((item, i) => (
            <div key={i} className="bg-white rounded-xl border shadow-sm p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-400">{item.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${kondisiColor[item.kondisi]}`}>
                      {item.kondisi}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-800">{item.aset}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Jenis: {item.perawatan}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Prediksi Servis</div>
                  <div className="text-sm font-semibold text-gray-700 mt-0.5">{item.prediksi}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Urgensi Perawatan</span>
                  <span>{item.sisa === 0 ? 'Lewat jadwal!' : `${item.sisa} hari lagi`}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`h-2 rounded-full ${kondisiBar[item.kondisi]} ${getBarWidth(item.sisa)}`} />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Terakhir servis: {item.terakhir}</span>
                <div className="flex gap-2">
                  {item.kondisi === 'Kritis' && (
                    <span className="text-xs text-red-500 font-medium animate-pulse">
                      ⚠️ Segera Tangani!
                    </span>
                  )}
                  <button
                    onClick={() => window.location.href = '/dashboard/form'}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Input Perawatan →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}