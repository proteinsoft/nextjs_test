'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault() // ป้องกันการรีเฟรชหน้าเมื่อส่งฟอร์ม
    try {
      const result = await signIn('credentials', {
        redirect: false,
        username,
        password,
      })

      if (result.error) {
        setError('Username or password is incorrect.')
      } else {
        // เปลี่ยนเส้นทางไปยังหน้าโปรไฟล์หลังจากเข้าสู่ระบบสำเร็จ
        router.push('/user/profile')
      }
    } catch (error) {
      console.error('Error during sign in:', error)
      setError('An unexpected error occurred. Please try again later.')
    }
  }

  return (
    <>
      <div className='text-center'>
        <Link href="/user/profile" className="block mb-2">[Profile Menu]</Link>
        <Link href="/user/signIn" className="block mb-2">[Login Menu]</Link>
      </div>
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-md shadow-md"
        >
          <div className="mb-4">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded mb-4"
          >
            Sign In
          </button>
        </form>
      </div>
    </>
  )
}