import '../styles/global.css';
import Header from "../components/Header"


export const metadata = {
  title: 'Wishlist',
  description: 'Crea tu wishlist',
}


export default function RootLayout({ children }) {

 return (
    <html lang="es">
      <body className="container-fluid mx-auto bg-grey">
        <Header />
        <div className="container mx-auto">
          {children}
        </div>
      </body>
    </html>
  )
}
