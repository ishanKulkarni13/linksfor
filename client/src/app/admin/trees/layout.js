import TopBar from "@/components/topbar/topBar";


export default function RootLayout({ children }) {
  return (
    <>
        <div><TopBar/></div>
        <div  >{children}</div>
    </>
  );
}



