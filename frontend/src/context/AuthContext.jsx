"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import {checkOtpApi, logOutApi} from "@/services/auth/auth.service";
import {getUserProfileApi} from "@/services/user/user.service";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
};

function authReducer(state, action) {
    switch (action.type) {
        case "loading":
            return {
                ...state,
                isLoading: true,
            };
        case "rejected":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case "login":
            return {
                user: action.payload,
                isAuthenticated: true,
            };
        case "user/loaded":
            return {
                user: action.payload,
                isAuthenticated: true,
            };
        case "logout":
            return {
                user: null,
                isAuthenticated: false,
            };
        default:
            throw new Error("Unknown action!");
    }
}

export default function AuthProvider({ children }) {
    const router = useRouter();
    const [{ user, isAuthenticated, isLoading }, dispatch] = useReducer(
        authReducer,
        initialState
    );
    async function login(values) {
        dispatch({ type: "loading" });
        try {
            const {
                data: { message, user },
            } = await checkOtpApi(values);
            dispatch({ type: "login", payload: user });
            toast.success(message);
            router.push("/");
        } catch (err) {
            const error = err?.response?.data?.message;
            dispatch({ type: "rejected", payload: error });
            toast.error(error);
        }
    }



    async function getUser() {
        dispatch({ type: "loading" });
        try {
            const {
                user,
            } = await getUserProfileApi();
            dispatch({ type: "user/loaded", payload: user });
        } catch (err) {
            const error = err?.response?.data?.message;
            dispatch({ type: "rejected", payload: error });
        }
    }

    async function logout() {
        try {
            await logOutApi();
            router.push("/");
            dispatch({ type: "logout" });
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        async function fetchData() {
            await getUser();
        }
        fetchData();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                login,
                logout,
                getUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error("not found Auth context");
    return useContext(AuthContext);
}
