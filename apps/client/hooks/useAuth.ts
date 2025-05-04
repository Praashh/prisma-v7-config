"use client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export const useAuth = () => {
    const [user, setUser] = useState<any>();
    const { data } = useSession();
    useEffect(() => {
        if (data?.user) {
            setUser(data.user);
        }
    }, [data]); // Add data as a dependency so the effect runs when session data changes

    if (!user) {
        return {
            user, 
            isLoggedIn: false
        }
    } else {
        return {
            user,
            isLoggedIn: true
        }
    }
}