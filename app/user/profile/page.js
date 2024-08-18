'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link';

export default function Profile() {
    const router = useRouter()

    useEffect(() => {
    }, [router])

    return (
        <>
            <div className='text-center'>
                <Link href="/user/signIn">[Login Page]</Link>
            </div>
            <div className="flex h-screen items-center justify-center">
                <div className="bg-white p-6 rounded-md shadow-md">
                    <p>
                        ยินดีตอนรับสู่หน้า PROFILE
                    </p>
                </div>
            </div>
        </>
    )
}