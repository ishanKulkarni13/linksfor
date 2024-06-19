
export default function Page() {
    return (
        <div>
            {
                <>
                    <p> NEXT_PUBLIC_VERCEL_URL; {process.env.NEXT_PUBLIC_VERCEL_URL}</p>
                    <p> NEXT_PUBLIC_VERCEL_BRANCH_URL: {process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}</p>
                </>
            }
        </div>
    )
}
