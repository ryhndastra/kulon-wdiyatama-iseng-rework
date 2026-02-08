import "./globals.css";
import { AuthProvider } from "@/context/AuthContext"; 

export const metadata = {
  title: "KULON Widyatama",
  description: "Learning Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}