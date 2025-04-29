import LoginForm from "@/components/login-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-cyan-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        
        {/* Partie gauche avec l'image de groupe */}
        <div className="w-full md:w-2/5">
          <img
            src="https://www.medianet.tn/assets/public/images/jpg/MEDIANET/ms3.jpg"
            alt="Group"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Partie droite avec le logo + login */}
        <div className="w-full md:w-3/5 p-8 md:border-l border-gray-200">
          
          {/* Logo ENICarthage */}
          <div className="flex justify-center mb-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/fr/c/c2/Logo_ENICarthage.jpg"
              alt="ENICarthage Logo"
              className="h-24 w-auto"
            />
          </div>

          {/* Formulaire de connexion */}
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
