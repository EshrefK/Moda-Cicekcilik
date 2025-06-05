"use client"

import { useFormStatus } from "react-dom"

export const Submit = () => {
    const {pending} = useFormStatus();
    return (
        <button 
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            disabled={pending}
        >
            {pending ? "Oluşturuluyor..." : "Oluştur"}
        </button>
    )
}