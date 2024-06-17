import TopBar from "@/components/topbar/topBar";


export default function RootLayout({ children }) {
  return (
    <>
        <div><TopBar/></div>
        <div className='latoutChildren'  >{children}</div>
    </>
  );
}



