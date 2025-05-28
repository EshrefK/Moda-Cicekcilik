"use client"

import { useFormStatus } from "react-dom"

export const Submit = () => {
    const {pending} = useFormStatus();
    return (
        <button className="bg-red-500 text-white px-4 py-2 rounded-md"
        type="submit" disabled={pending}>
            {pending ? "Loading..." : "Submit"}
        </button>
    )
}