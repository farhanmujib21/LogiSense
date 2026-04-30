'use client'

import { useState } from 'react'

export default function FormPage() {
  const [formData, setFormData] = useState({
    idAset: '',
    namaAset: '',
    jenisPerawatan: '',
    tanggal: '',
    teknisi: '',
    kilometer: '',
    keterangan: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.idAset) newErrors.idAset = 'ID Aset wajib diisi'
    if (!formData.namaAset) newErrors.namaAset = 'Nama Aset wajib diisi'
    if (!formData.jenisPerawatan) newErrors.jenisPerawatan = 'Jenis Perawatan wajib dipilih'
    if (!formData.tanggal) newErrors.tanggal = 'Tanggal wajib diisi'
    if (!formData.teknisi) newErrors.teknisi = 'Nama Teknisi wajib diisi'
    if (!formData.kilometer) {
      newErrors.kilometer = 'Kilometer wajib diisi'
    } else if (isNaN(Number(formData.kilometer)) || Number(formData.kilometer) < 0) {
      newErrors.kilometer = 'Kilometer harus berupa angka positif'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Hapus error saat user mulai mengetik
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async () => {
    if (!validate()) return

    setLoading(true)
    // Simulasi kirim data ke backend
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-md p-8 text-center max-w-md w-full">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Data Berhasil Disimpan!</h2>
          <p className="text-gray-500 text-sm mb-6">Data pemeliharaan telah tercatat dan divalidasi oleh sistem.</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => { setSubmitted(false); setFormData({ idAset: '', namaAset: '', jenisPerawatan: '', tanggal: '', teknisi: '', kilometer: '', keterangan: '' }) }}
              className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50"
            >
              Input Lagi
            </button>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            >
              Ke Dashboard
            </button>
          </div>
        </div>
      </div>
    )
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

      <div className="p-6 max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Form Input Pemeliharaan</h2>
          <p className="text-gray-500 text-sm mt-1">Isi data dengan benar — sistem akan memvalidasi otomatis</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-5">

          {/* ID Aset & Nama Aset */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">ID Aset</label>
              <input
                name="idAset"
                value={formData.idAset}
                onChange={handleChange}
                placeholder="TRK-001"
                className={`mt-1 w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.idAset ? 'border-red-400' : 'border-gray-300'}`}
              />
              {errors.idAset && <p className="text-red-500 text-xs mt-1">{errors.idAset}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Nama Aset</label>
              <input
                name="namaAset"
                value={formData.namaAset}
                onChange={handleChange}
                placeholder="Truk Fuso BE 1234 AB"
                className={`mt-1 w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.namaAset ? 'border-red-400' : 'border-gray-300'}`}
              />
              {errors.namaAset && <p className="text-red-500 text-xs mt-1">{errors.namaAset}</p>}
            </div>
          </div>

          {/* Jenis Perawatan */}
          <div>
            <label className="text-sm font-medium text-gray-700">Jenis Perawatan</label>
            <select
              name="jenisPerawatan"
              value={formData.jenisPerawatan}
              onChange={handleChange}
              className={`mt-1 w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.jenisPerawatan ? 'border-red-400' : 'border-gray-300'}`}
            >
              <option value="">-- Pilih Jenis Perawatan --</option>
              <option value="Ganti Oli">Ganti Oli</option>
              <option value="Cek Ban">Cek Ban</option>
              <option value="Servis Mesin">Servis Mesin</option>
              <option value="Ganti Filter">Ganti Filter</option>
              <option value="Cek Rem">Cek Rem</option>
              <option value="Tune Up">Tune Up</option>
              <option value="Lainnya">Lainnya</option>
            </select>
            {errors.jenisPerawatan && <p className="text-red-500 text-xs mt-1">{errors.jenisPerawatan}</p>}
          </div>

          {/* Tanggal & Teknisi */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Tanggal Perawatan</label>
              <input
                type="date"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                className={`mt-1 w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.tanggal ? 'border-red-400' : 'border-gray-300'}`}
              />
              {errors.tanggal && <p className="text-red-500 text-xs mt-1">{errors.tanggal}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Nama Teknisi</label>
              <input
                name="teknisi"
                value={formData.teknisi}
                onChange={handleChange}
                placeholder="Budi Santoso"
                className={`mt-1 w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.teknisi ? 'border-red-400' : 'border-gray-300'}`}
              />
              {errors.teknisi && <p className="text-red-500 text-xs mt-1">{errors.teknisi}</p>}
            </div>
          </div>

          {/* Kilometer */}
          <div>
            <label className="text-sm font-medium text-gray-700">Kilometer Saat Ini</label>
            <input
              name="kilometer"
              value={formData.kilometer}
              onChange={handleChange}
              placeholder="150000"
              className={`mt-1 w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.kilometer ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.kilometer && <p className="text-red-500 text-xs mt-1">{errors.kilometer}</p>}
          </div>

          {/* Keterangan */}
          <div>
            <label className="text-sm font-medium text-gray-700">Keterangan Tambahan <span className="text-gray-400">(opsional)</span></label>
            <textarea
              name="keterangan"
              value={formData.keterangan}
              onChange={handleChange}
              placeholder="Tulis catatan tambahan di sini..."
              rows={3}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200 text-sm"
          >
            {loading ? '⏳ Memvalidasi & Menyimpan...' : '💾 Simpan Data Pemeliharaan'}
          </button>

        </div>
      </div>
    </div>
  )
}