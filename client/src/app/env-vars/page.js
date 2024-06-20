import styles from "./styles.module.css"
export default function Page() {
    return (
        <div className={styles.container}>
            {
                <>
                    <p> NEXT_PUBLIC_VERCEL_URL:<br/> {process.env.NEXT_PUBLIC_VERCEL_URL}</p>

                    <p> VERCEL_URL:<br/> {process.env.VERCEL_URL}</p>

                    <p> NEXT_PUBLIC_VERCEL_BRANCH_URL: <br/> {process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}</p>

                    <p> NEXT_PUBLIC_FRONTEND_URL:<br/> {process.env.NEXT_PUBLIC_FRONTEND_URL}</p>

                    <p> NEXT_PUBLIC_BACKEND_URL:<br/> {process.env.NEXT_PUBLIC_BACKEND_URL}</p>

                    <p> NEXTAUTH_URL:<br/> {process.env.NEXTAUTH_URL}</p>
                </>
            }
        </div>
    )
}
