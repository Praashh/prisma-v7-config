"use client"
import { CheckCircle } from 'lucide-react';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import {useAuth} from '../../../hooks/useAuth';

const Navbar = () => {
   const {isLoggedIn, user} = useAuth()
    
  console.log("session ", isLoggedIn, "user ", user)
  return (
    <div className='absolute z-50 top-0 right-0 left-0'>
         <header className=" text-white px-4 lg:px-6 py-4 flex items-center justify-between">
        <Link className="flex items-center gap-2" href="#">
          <CheckCircle className="h-6 w-6" />
          <span className="text-xl font-bold">TruthChain</span>
        </Link>
        {
          isLoggedIn ? (
            <button className="hidden lg:inline-flex" 
            onClick={() => signOut()}
          >
            Logout
          </button>
          ) : (
            <button className="hidden lg:inline-flex" 
              onClick={() => signIn("google", { callbackUrl: "/onboarding"})}
            >
              Signin
            </button>
          )
        }
      </header>
    </div>
  )
}

export default Navbar