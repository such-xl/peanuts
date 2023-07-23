"use client"
import Link from "next/link";
export default function Navbar() {
    return (
        <>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/about/11">AboutWithID</Link>
            <button onClick={()=>{alert("hello")}}>click me</button>
        </>
    )
}