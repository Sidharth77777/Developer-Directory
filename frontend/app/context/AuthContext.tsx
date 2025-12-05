"use client";

import { AuthContextType, AuthProviderProps } from "@/types/types";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState("");
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        setLoggedIn(!!token);
    }, []);


    return (
        <AuthContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}
