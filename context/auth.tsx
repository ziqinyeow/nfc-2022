import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";

const authContext = createContext({
  user: {},
  error: "",
  login: (email: string, password: string) => {},
  signup: (email: string, password: string) => {},
  logout: () => {},
  setUser: () => {},
});

export default function useAuth() {
  return useContext(authContext);
}

export function AuthProvider(props: any) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      if (user) {
        router.push("/");
      } else {
        const fetcher = await fetch("/api/auth", {
          method: "POST",
          body: JSON.stringify({
            type: "login",
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await fetcher.json();
        if (!fetcher.ok) {
          throw new Error(data.message);
        }

        setUser(data?.user ?? null);
        router.push("/");
      }
    } catch (error) {
      // @ts-ignore
      setError(error.message);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      if (user) {
        router.push("/");
      } else {
        const fetcher = await fetch("/api/auth", {
          method: "POST",
          body: JSON.stringify({
            type: "signup",
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await fetcher.json();
        setUser(data?.user ?? null);
        if (!fetcher.ok) {
          throw new Error(data.message);
        }
        router.push("/");
      }
    } catch (error) {
      // @ts-ignore
      setError(error.message);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = { user, error, login, signup, logout, setUser };

  return <authContext.Provider value={value} {...props} />;
}
