'use client'

import { useState } from 'react'

export default function AnomalyPage() {
  const [filter, setFilter] = useState('Semua')

  const anomalies = [
    {
      id: 'ANO-001',
      aset: 'Truk Fuso BE 1234 AB',
      masalah: 'Kilometer turun drastis',
      detail: 'Data menunjukkan kilometer dari 150.000 menjadi 120.000. Kemungkinan kesalahan input.',
      tingkat: 'Tinggi',
      tanggal: '30 Apr 2026',
      status: 'Belum Ditangani',
    },
    {
      id: 'ANO-002',
      aset: 'Forklift FL-03',
      masalah: 'Data ganti oli terlalu sering',
      detail: 'Tercatat ganti oli 3x dalam 7 hari. Kemungkinan data duplikat.',
      tingkat: 'Sedang',
      tanggal: '29 Apr 2026',
      status: 'Sedang Ditinjau',
    },
    {
      id: 'ANO-003',
      aset: 'Truk Hino BE 5678 CD',
      masalah: 'Tanggal perawatan tidak valid',
      detail: 'Tanggal perawatan tercatat di masa depan (15 Mei 2027).',
      tingkat: 'Tinggi',
      tanggal: '28 Apr 2026',
      status: 'Belum Ditangani',
    },
    {
      id: 'ANO-004',
      aset: 'Truk Mitsubishi BE 9012 EF',
      masalah: 'Nama teknisi tidak dikenal',
      detail: 'Teknisi "Zzz123" tidak terdaftar dalam sistem.',
      tingkat: 'Rendah',
      tanggal: '27 Apr 2026',
      status: 'Selesai',
    },
  ]

  const tingkatColor: Record<string, string> = {
    'Tinggi': 'bg-red-100 text-red-700',
    'Sedang': 'bg-yellow-100 text-yellow-700',
    'Rendah': 'bg-green-100 text-green-700',
  }

  const statusColor: Record<string, string> = {
    'Belum Ditangani': 'bg-red-50 text-red-600',
    'Sedang Ditinjau': 'bg-yellow-50 text-yellow-600',
    'Selesai': 'bg-green-50 text-green-600',
  }

  const filters = ['Semua', 'Tinggi', 'Sedang', 'Rendah']

  const filtered = filter === 'Semua'
    ? anomalies
    : anomalies.filter(a => a.tingkat === filter)

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
          <h2 className="text-2xl font-bold text-gray-800">Deteksi Anomali Data</h2>
          <p className="text-gray-500 text-sm mt-1">AI mendeteksi inkonsistensi dan kesalahan data secara otomatis</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-red-50 border border-red-100 rounded-xl p-4">
            <div className="text-2xl font-bold text-red-600">2</div>
            <div className="text-sm text-red-500 mt-1">Anomali Tinggi</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <div className="text-sm text-yellow-500 mt-1">Anomali Sedang</div>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-xl p-4">
            <div className="text-2xl font-bold text-green-600">1</div>
            <div className="text-sm text-green-500 mt-1">Anomali Rendah</div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-4">
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

        {/* Anomaly List */}
        <div className="space-y-4">
          {filtered.map((item, i) => (
            <div key={i} className="bg-white rounded-xl border shadow-sm p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-400">{item.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${tingkatColor[item.tingkat]}`}>
                      {item.tingkat}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-800">{item.masalah}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{item.aset}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[item.status]}`}>
                  {item.status}
                </span>
              </div>
              <div className="bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-600">
                🤖 <span className="font-medium">AI:</span> {item.detail}
              </div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-400">Terdeteksi: {item.tanggal}</span>
                {item.status !== 'Selesai' && (
                  <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                    Tandai Selesai →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}