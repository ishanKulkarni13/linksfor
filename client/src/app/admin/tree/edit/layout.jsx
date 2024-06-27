import TopBar from "@/components/topbar/topBar";
export const metadata = {
  title: "Admin",
  description: "admin page",
};

export default function RootLayout({ children }) {
  return (
    <>
        <div>{children}</div>
    </>
  );
}
