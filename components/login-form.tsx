"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, X, User, Lock } from "lucide-react"
import Link from "next/link"
export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler une connexion
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Connexion réussie avec:", username, password)
      // Rediriger vers le tableau de bord après connexion
      // window.location.href = '/dashboard'
    } catch (error) {
      console.error("Erreur de connexion:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold text-black border-b-2 border-gray-200 pb-2 mb-6">ESPACE DE CONNEXION</h2>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-base font-medium">
            Nom d&apos;utilisateur
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10 border-gray-300"
              placeholder="Entrez votre nom d'utilisateur"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-base font-medium">
            Mot de passe
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 border-gray-300"
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <Label htmlFor="remember" className="text-sm text-gray-600">
            Se souvenir de moi
          </Label>
        </div>

        <div className="flex justify-between pt-2">
          <Link
           href={"/dashboard"}
            type="submit"
           
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md flex items-center gap-2"
          >
            {isLoading ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              <Check className="h-4 w-4" />
            )}
            Se connecter
          </Link>

          <Link
            
            href={"/register"}
            className="bg-blue-600  hover:blue-700 text-white px-6 py-2 rounded-md flex items-center gap-2"
          >
            
            s'enregistrer
          </Link>
        </div>

        <div className="pt-4 text-center">
          <Link href="#" className="text-sm text-blue-600 hover:underline">
            Mot de passe oublié?
          </Link>
        </div>
      </form>
    </div>
  )
}
