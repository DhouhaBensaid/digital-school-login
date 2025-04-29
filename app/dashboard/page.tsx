"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Calendar,
  BarChart,
  Users,
  Bell,
  Settings,
  School,
  ClipboardList,
  MapPin,
  Search,
  Plus,
  Trash2,
  Edit,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
} from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

// Données fictives pour la démonstration
const specialites = ["Informatique", "GESIL", "Infotronique", "Mécatronique"]

const niveaux = {
  Informatique: ["Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2"],
  GESIL: ["Licence 1", "Licence 2", "Licence 3"],
  Infotronique: ["Licence 1", "Licence 2", "Licence 3", "Master 1"],
  Mécatronique: ["Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2"],
}

// Données initiales des salles avec les groupes associés
const initialSalles = {
  Informatique: [
    { id: 1, code: "A101", nom: "Salle A101", capacite: 30, disponible: true, groupe: "Informatique - Licence 1" },
    { id: 2, code: "A102", nom: "Salle A102", capacite: 30, disponible: true, groupe: "Informatique - Licence 1" },
    { id: 3, code: "B201", nom: "Salle B201", capacite: 25, disponible: true, groupe: "Informatique - Licence 2" },
    { id: 4, code: "B202", nom: "Salle B202", capacite: 25, disponible: true, groupe: "Informatique - Licence 2" },
    { id: 5, code: "C001", nom: "Amphithéâtre C", capacite: 100, disponible: true, groupe: "Informatique - Master 1" },
  ],
  GESIL: [
    { id: 6, code: "D101", nom: "Salle D101", capacite: 30, disponible: true, groupe: "GESIL - Licence 1" },
    { id: 7, code: "D102", nom: "Salle D102", capacite: 30, disponible: true, groupe: "GESIL - Licence 2" },
    { id: 8, code: "A001", nom: "Amphithéâtre A", capacite: 80, disponible: true, groupe: "GESIL - Licence 3" },
  ],
  Infotronique: [
    { id: 9, code: "E101", nom: "Salle E101", capacite: 25, disponible: true, groupe: "Infotronique - Licence 1" },
    { id: 10, code: "E102", nom: "Salle E102", capacite: 25, disponible: true, groupe: "Infotronique - Licence 2" },
    { id: 11, code: "F001", nom: "Laboratoire F", capacite: 20, disponible: true, groupe: "Infotronique - Licence 3" },
  ],
  Mécatronique: [
    { id: 12, code: "G101", nom: "Salle G101", capacite: 30, disponible: true, groupe: "Mécatronique - Licence 1" },
    { id: 13, code: "G102", nom: "Salle G102", capacite: 30, disponible: true, groupe: "Mécatronique - Licence 2" },
    { id: 14, code: "H001", nom: "Laboratoire H", capacite: 20, disponible: true, groupe: "Mécatronique - Licence 3" },
    { id: 15, code: "I001", nom: "Atelier I", capacite: 15, disponible: true, groupe: "Mécatronique - Master 1" },
  ],
}

const emploisDuTemps = {
  Informatique: {
    "Licence 1": [
      { id: 1, matiere: "Algorithmique", date: "15 Mai 2025", heure: "09:00-11:00", salle: "Salle A101" },
      { id: 2, matiere: "Mathématiques", date: "16 Mai 2025", heure: "14:00-16:00", salle: "Salle A101" },
      {
        id: 3,
        matiere: "Introduction à la programmation",
        date: "18 Mai 2025",
        heure: "09:00-11:00",
        salle: "Salle A101",
      },
    ],
    "Licence 2": [
      { id: 4, matiere: "Structures de données", date: "15 Mai 2025", heure: "14:00-16:00", salle: "Salle B201" },
      { id: 5, matiere: "Bases de données", date: "17 Mai 2025", heure: "09:00-11:00", salle: "Salle B201" },
      {
        id: 6,
        matiere: "Programmation orientée objet",
        date: "19 Mai 2025",
        heure: "14:00-16:00",
        salle: "Salle B201",
      },
    ],
    "Licence 3": [
      { id: 7, matiere: "Réseaux", date: "16 Mai 2025", heure: "09:00-11:00", salle: "Salle A102" },
      { id: 8, matiere: "Systèmes d'exploitation", date: "18 Mai 2025", heure: "14:00-16:00", salle: "Salle A102" },
      { id: 9, matiere: "Génie logiciel", date: "20 Mai 2025", heure: "09:00-11:00", salle: "Salle A102" },
    ],
    "Master 1": [
      {
        id: 10,
        matiere: "Intelligence artificielle",
        date: "17 Mai 2025",
        heure: "14:00-16:00",
        salle: "Amphithéâtre C",
      },
      { id: 11, matiere: "Sécurité informatique", date: "19 Mai 2025", heure: "09:00-11:00", salle: "Amphithéâtre C" },
      { id: 12, matiere: "Big Data", date: "21 Mai 2025", heure: "14:00-16:00", salle: "Amphithéâtre C" },
    ],
    "Master 2": [
      { id: 13, matiere: "Cloud Computing", date: "18 Mai 2025", heure: "09:00-11:00", salle: "Salle B202" },
      { id: 14, matiere: "Blockchain", date: "20 Mai 2025", heure: "14:00-16:00", salle: "Salle B202" },
      { id: 15, matiere: "Projet de fin d'études", date: "22 Mai 2025", heure: "09:00-12:00", salle: "Salle B202" },
    ],
  },
  // Données similaires pour les autres spécialités...
  GESIL: {
    "Licence 1": [
      { id: 16, matiere: "Introduction à la gestion", date: "15 Mai 2025", heure: "09:00-11:00", salle: "Salle D101" },
      { id: 17, matiere: "Économie", date: "16 Mai 2025", heure: "14:00-16:00", salle: "Salle D101" },
      { id: 18, matiere: "Informatique de base", date: "18 Mai 2025", heure: "09:00-11:00", salle: "Salle D101" },
    ],
    "Licence 2": [
      { id: 19, matiere: "Comptabilité", date: "15 Mai 2025", heure: "14:00-16:00", salle: "Salle D102" },
      { id: 20, matiere: "Marketing", date: "17 Mai 2025", heure: "09:00-11:00", salle: "Salle D102" },
      { id: 21, matiere: "Systèmes d'information", date: "19 Mai 2025", heure: "14:00-16:00", salle: "Salle D102" },
    ],
    "Licence 3": [
      { id: 22, matiere: "Management", date: "16 Mai 2025", heure: "09:00-11:00", salle: "Amphithéâtre A" },
      { id: 23, matiere: "Droit des affaires", date: "18 Mai 2025", heure: "14:00-16:00", salle: "Amphithéâtre A" },
      { id: 24, matiere: "Projet professionnel", date: "20 Mai 2025", heure: "09:00-11:00", salle: "Amphithéâtre A" },
    ],
  },
  Infotronique: {
    "Licence 1": [
      { id: 25, matiere: "Électronique de base", date: "15 Mai 2025", heure: "09:00-11:00", salle: "Salle E101" },
      { id: 26, matiere: "Programmation C", date: "16 Mai 2025", heure: "14:00-16:00", salle: "Salle E101" },
      {
        id: 27,
        matiere: "Mathématiques pour l'ingénieur",
        date: "18 Mai 2025",
        heure: "09:00-11:00",
        salle: "Salle E101",
      },
    ],
    "Licence 2": [
      { id: 28, matiere: "Microcontrôleurs", date: "15 Mai 2025", heure: "14:00-16:00", salle: "Salle E102" },
      { id: 29, matiere: "Systèmes embarqués", date: "17 Mai 2025", heure: "09:00-11:00", salle: "Salle E102" },
      { id: 30, matiere: "Traitement du signal", date: "19 Mai 2025", heure: "14:00-16:00", salle: "Salle E102" },
    ],
    "Licence 3": [
      { id: 31, matiere: "Robotique", date: "16 Mai 2025", heure: "09:00-11:00", salle: "Laboratoire F" },
      { id: 32, matiere: "IoT", date: "18 Mai 2025", heure: "14:00-16:00", salle: "Laboratoire F" },
      { id: 33, matiere: "Projet d'intégration", date: "20 Mai 2025", heure: "09:00-11:00", salle: "Laboratoire F" },
    ],
    "Master 1": [
      {
        id: 34,
        matiere: "Intelligence artificielle embarquée",
        date: "17 Mai 2025",
        heure: "14:00-16:00",
        salle: "Salle E101",
      },
      { id: 35, matiere: "Systèmes temps réel", date: "19 Mai 2025", heure: "09:00-11:00", salle: "Salle E101" },
      { id: 36, matiere: "Conception avancée", date: "21 Mai 2025", heure: "14:00-16:00", salle: "Salle E101" },
    ],
  },
  Mécatronique: {
    "Licence 1": [
      { id: 37, matiere: "Mécanique", date: "15 Mai 2025", heure: "09:00-11:00", salle: "Salle G101" },
      { id: 38, matiere: "Électronique", date: "16 Mai 2025", heure: "14:00-16:00", salle: "Salle G101" },
      { id: 39, matiere: "CAO", date: "18 Mai 2025", heure: "09:00-11:00", salle: "Salle G101" },
    ],
    "Licence 2": [
      { id: 40, matiere: "Automatique", date: "15 Mai 2025", heure: "14:00-16:00", salle: "Salle G102" },
      { id: 41, matiere: "Capteurs et actionneurs", date: "17 Mai 2025", heure: "09:00-11:00", salle: "Salle G102" },
      {
        id: 42,
        matiere: "Programmation industrielle",
        date: "19 Mai 2025",
        heure: "14:00-16:00",
        salle: "Salle G102",
      },
    ],
    "Licence 3": [
      { id: 43, matiere: "Systèmes mécaniques", date: "16 Mai 2025", heure: "09:00-11:00", salle: "Laboratoire H" },
      { id: 44, matiere: "Robotique industrielle", date: "18 Mai 2025", heure: "14:00-16:00", salle: "Laboratoire H" },
      { id: 45, matiere: "Projet mécatronique", date: "20 Mai 2025", heure: "09:00-11:00", salle: "Laboratoire H" },
    ],
    "Master 1": [
      { id: 46, matiere: "Conception avancée", date: "17 Mai 2025", heure: "14:00-16:00", salle: "Atelier I" },
      { id: 47, matiere: "Simulation numérique", date: "19 Mai 2025", heure: "09:00-11:00", salle: "Atelier I" },
      { id: 48, matiere: "Systèmes embarqués", date: "21 Mai 2025", heure: "14:00-16:00", salle: "Atelier I" },
    ],
    "Master 2": [
      { id: 49, matiere: "Robotique avancée", date: "18 Mai 2025", heure: "09:00-11:00", salle: "Salle G101" },
      { id: 50, matiere: "Intelligence artificielle", date: "20 Mai 2025", heure: "14:00-16:00", salle: "Salle G101" },
      { id: 51, matiere: "Projet de fin d'études", date: "22 Mai 2025", heure: "09:00-12:00", salle: "Salle G101" },
    ],
  },
}

// Données fictives pour les étudiants par salle avec leurs présences aux examens
const initialEtudiantsParSalle = {
  "Salle A101": [
    {
      id: "ET001",
      nom: "Dupont",
      prenom: "Jean",
      niveau: "Licence 1",
      specialite: "Informatique",
      presences: [
        { examenId: 1, present: true },
        { examenId: 2, present: true },
        { examenId: 3, present: false },
      ],
    },
    {
      id: "ET002",
      nom: "Martin",
      prenom: "Sophie",
      niveau: "Licence 1",
      specialite: "Informatique",
      presences: [
        { examenId: 1, present: true },
        { examenId: 2, present: false },
        { examenId: 3, present: true },
      ],
    },
    {
      id: "ET003",
      nom: "Durand",
      prenom: "Pierre",
      niveau: "Licence 1",
      specialite: "Informatique",
      presences: [
        { examenId: 1, present: false },
        { examenId: 2, present: false },
        { examenId: 3, present: false },
      ],
    },
    {
      id: "ET004",
      nom: "Lefebvre",
      prenom: "Marie",
      niveau: "Licence 1",
      specialite: "Informatique",
      presences: [
        { examenId: 1, present: true },
        { examenId: 2, present: true },
        { examenId: 3, present: true },
      ],
    },
    {
      id: "ET005",
      nom: "Moreau",
      prenom: "Thomas",
      niveau: "Licence 1",
      specialite: "Informatique",
      presences: [
        { examenId: 1, present: true },
        { examenId: 2, present: false },
        { examenId: 3, present: true },
      ],
    },
  ],
  "Salle A102": [
    {
      id: "ET006",
      nom: "Petit",
      prenom: "Julie",
      niveau: "Licence 3",
      specialite: "Informatique",
      presences: [
        { examenId: 7, present: false },
        { examenId: 8, present: false },
        { examenId: 9, present: true },
      ],
    },
    {
      id: "ET007",
      nom: "Roux",
      prenom: "Nicolas",
      niveau: "Licence 3",
      specialite: "Informatique",
      presences: [
        { examenId: 7, present: true },
        { examenId: 8, present: true },
        { examenId: 9, present: true },
      ],
    },
    {
      id: "ET008",
      nom: "Leroy",
      prenom: "Emma",
      niveau: "Licence 3",
      specialite: "Informatique",
      presences: [
        { examenId: 7, present: true },
        { examenId: 8, present: false },
        { examenId: 9, present: true },
      ],
    },
    {
      id: "ET009",
      nom: "Girard",
      prenom: "Lucas",
      niveau: "Licence 3",
      specialite: "Informatique",
      presences: [
        { examenId: 7, present: false },
        { examenId: 8, present: false },
        { examenId: 9, present: false },
      ],
    },
    {
      id: "ET010",
      nom: "Fournier",
      prenom: "Chloé",
      niveau: "Licence 3",
      specialite: "Informatique",
      presences: [
        { examenId: 7, present: true },
        { examenId: 8, present: true },
        { examenId: 9, present: false },
      ],
    },
  ],
  "Salle B201": [
    {
      id: "ET031",
      nom: "Dubois",
      prenom: "Léo",
      niveau: "Licence 2",
      specialite: "Informatique",
      presences: [
        { examenId: 4, present: true },
        { examenId: 5, present: false },
        { examenId: 6, present: true },
      ],
    },
    {
      id: "ET032",
      nom: "Marchand",
      prenom: "Lola",
      niveau: "Licence 2",
      specialite: "Informatique",
      presences: [
        { examenId: 4, present: false },
        { examenId: 5, present: false },
        { examenId: 6, present: true },
      ],
    },
    {
      id: "ET033",
      nom: "Laurent",
      prenom: "Gabriel",
      niveau: "Licence 2",
      specialite: "Informatique",
      presences: [
        { examenId: 4, present: true },
        { examenId: 5, present: true },
        { examenId: 6, present: false },
      ],
    },
    {
      id: "ET034",
      nom: "Simon",
      prenom: "Alice",
      niveau: "Licence 2",
      specialite: "Informatique",
      presences: [
        { examenId: 4, present: true },
        { examenId: 5, present: true },
        { examenId: 6, present: true },
      ],
    },
    {
      id: "ET035",
      nom: "Michel",
      prenom: "Jules",
      niveau: "Licence 2",
      specialite: "Informatique",
      presences: [
        { examenId: 4, present: false },
        { examenId: 5, present: true },
        { examenId: 6, present: false },
      ],
    },
  ],
  "Salle B202": [
    {
      id: "ET026",
      nom: "Guerin",
      prenom: "Clara",
      niveau: "Master 2",
      specialite: "Informatique",
      presences: [
        { examenId: 13, present: false },
        { examenId: 14, present: true },
        { examenId: 15, present: false },
      ],
    },
    {
      id: "ET027",
      nom: "Boyer",
      prenom: "Rayan",
      niveau: "Master 2",
      specialite: "Informatique",
      presences: [
        { examenId: 13, present: true },
        { examenId: 14, present: true },
        { examenId: 15, present: false },
      ],
    },
    {
      id: "ET028",
      nom: "Roy",
      prenom: "Eva",
      niveau: "Master 2",
      specialite: "Informatique",
      presences: [
        { examenId: 13, present: true },
        { examenId: 14, present: false },
        { examenId: 15, present: true },
      ],
    },
    {
      id: "ET029",
      nom: "Leclerc",
      prenom: "Louis",
      niveau: "Master 2",
      specialite: "Informatique",
      presences: [
        { examenId: 13, present: false },
        { examenId: 14, present: false },
        { examenId: 15, present: true },
      ],
    },
    {
      id: "ET030",
      nom: "Brun",
      prenom: "Zoé",
      niveau: "Master 2",
      specialite: "Informatique",
      presences: [
        { examenId: 13, present: true },
        { examenId: 14, present: true },
        { examenId: 15, present: true },
      ],
    },
  ],
  "Amphithéâtre C": [
    {
      id: "ET011",
      nom: "Morel",
      prenom: "Maxime",
      niveau: "Master 1",
      specialite: "Informatique",
      presences: [
        { examenId: 10, present: true },
        { examenId: 11, present: false },
        { examenId: 12, present: true },
      ],
    },
    {
      id: "ET012",
      nom: "Bonnet",
      prenom: "Léa",
      niveau: "Master 1",
      specialite: "Informatique",
      presences: [
        { examenId: 10, present: false },
        { examenId: 11, present: false },
        { examenId: 12, present: true },
      ],
    },
    {
      id: "ET013",
      nom: "Lambert",
      prenom: "Hugo",
      niveau: "Master 1",
      specialite: "Informatique",
      presences: [
        { examenId: 10, present: true },
        { examenId: 11, present: true },
        { examenId: 12, present: false },
      ],
    },
    {
      id: "ET014",
      nom: "Rousseau",
      prenom: "Camille",
      niveau: "Master 1",
      specialite: "Informatique",
      presences: [
        { examenId: 10, present: true },
        { examenId: 11, present: true },
        { examenId: 12, present: true },
      ],
    },
    {
      id: "ET015",
      nom: "Blanc",
      prenom: "Théo",
      niveau: "Master 1",
      specialite: "Informatique",
      presences: [
        { examenId: 10, present: false },
        { examenId: 11, present: true },
        { examenId: 12, present: false },
      ],
    },
  ],
}

export default function DashboardPage() {
  const [selectedSpecialite, setSelectedSpecialite] = useState<string>("")
  const [selectedNiveau, setSelectedNiveau] = useState<string>("")
  const [selectedSalle, setSelectedSalle] = useState<string>("")
  const [activeTab, setActiveTab] = useState<string>("emplois")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [salles, setSalles] = useState(initialSalles)
  const [etudiantsParSalle, setEtudiantsParSalle] = useState(initialEtudiantsParSalle)

  // États pour l'ajout/modification de salle
  const [isAddSalleOpen, setIsAddSalleOpen] = useState(false)
  const [newSalle, setNewSalle] = useState({ code: "", nom: "", capacite: 0, disponible: true, groupe: "" })
  const [editingSalleId, setEditingSalleId] = useState<number | null>(null)

  // États pour l'ajout d'étudiant
  const [isAddEtudiantOpen, setIsAddEtudiantOpen] = useState(false)
  const [newEtudiant, setNewEtudiant] = useState({
    id: "",
    nom: "",
    prenom: "",
    niveau: "",
    specialite: "",
    presences: [] as { examenId: number; present: boolean }[],
  })

  // État pour la recherche d'étudiant par ID
  const [searchStudentId, setSearchStudentId] = useState<string>("")
  const [searchedStudent, setSearchedStudent] = useState<any>(null)

  // Obtenir les examens pour la salle sélectionnée
  const examensForSelectedSalle = useMemo(() => {
    if (!selectedSalle) return []

    // Trouver le groupe associé à la salle sélectionnée
    let groupe = ""
    for (const specialite in salles) {
      const salleFound = salles[specialite as keyof typeof salles].find((s) => s.nom === selectedSalle)
      if (salleFound) {
        groupe = salleFound.groupe
        break
      }
    }

    if (!groupe) return []

    // Extraire la spécialité et le niveau du groupe
    const [groupeSpecialite, groupeNiveau] = groupe.split(" - ")

    // Récupérer les examens pour cette spécialité et ce niveau
    return (
      emploisDuTemps[groupeSpecialite as keyof typeof emploisDuTemps]?.[
        groupeNiveau as keyof (typeof emploisDuTemps)[keyof typeof emploisDuTemps]
      ] || []
    )
  }, [selectedSalle, salles])

  // Filtrer les étudiants par salle et terme de recherche
  const filteredEtudiants = selectedSalle
    ? (etudiantsParSalle[selectedSalle as keyof typeof etudiantsParSalle] || []).filter(
        (etudiant) =>
          etudiant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          etudiant.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          etudiant.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : []

  // Obtenir les étudiants absents par salle et par examen
  const absentsByExam = useMemo(() => {
    if (!selectedSalle) return []

    const etudiants = etudiantsParSalle[selectedSalle as keyof typeof etudiantsParSalle] || []
    const absents: { etudiant: any; examensAbsents: any[] }[] = []

    etudiants.forEach((etudiant) => {
      const examensAbsents = etudiant.presences
        .filter((p) => !p.present)
        .map((p) => {
          const examen = examensForSelectedSalle.find((e) => e.id === p.examenId)
          return examen
            ? {
                id: p.examenId,
                matiere: examen.matiere,
                date: examen.date,
                heure: examen.heure,
              }
            : null
        })
        .filter(Boolean)

      if (examensAbsents.length > 0) {
        absents.push({
          etudiant: {
            id: etudiant.id,
            nom: etudiant.nom,
            prenom: etudiant.prenom,
            niveau: etudiant.niveau,
            specialite: etudiant.specialite,
          },
          examensAbsents,
        })
      }
    })

    return absents
  }, [selectedSalle, etudiantsParSalle, examensForSelectedSalle])

  // Ajouter ou modifier une salle
  const handleSalleSubmit = () => {
    if (!selectedSpecialite || !newSalle.code || !newSalle.nom || newSalle.capacite <= 0 || !newSalle.groupe) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs correctement",
        variant: "destructive",
      })
      return
    }

    setSalles((prevSalles) => {
      const updatedSalles = { ...prevSalles }

      if (editingSalleId) {
        // Modification d'une salle existante
        updatedSalles[selectedSpecialite as keyof typeof prevSalles] = updatedSalles[
          selectedSpecialite as keyof typeof prevSalles
        ].map((salle) => (salle.id === editingSalleId ? { ...newSalle, id: editingSalleId } : salle))
      } else {
        // Ajout d'une nouvelle salle
        const newId =
          Math.max(
            ...Object.values(prevSalles)
              .flat()
              .map((s) => s.id),
            0,
          ) + 1
        updatedSalles[selectedSpecialite as keyof typeof prevSalles] = [
          ...updatedSalles[selectedSpecialite as keyof typeof prevSalles],
          { ...newSalle, id: newId },
        ]
      }

      return updatedSalles
    })

    // Réinitialiser le formulaire
    setNewSalle({ code: "", nom: "", capacite: 0, disponible: true, groupe: "" })
    setEditingSalleId(null)
    setIsAddSalleOpen(false)

    toast({
      title: "Succès",
      description: editingSalleId ? "Salle modifiée avec succès" : "Salle ajoutée avec succès",
      variant: "success",
    })
  }

  // Supprimer une salle
  const handleDeleteSalle = (id: number) => {
    if (!selectedSpecialite) return

    setSalles((prevSalles) => {
      const updatedSalles = { ...prevSalles }
      updatedSalles[selectedSpecialite as keyof typeof prevSalles] = updatedSalles[
        selectedSpecialite as keyof typeof prevSalles
      ].filter((salle) => salle.id !== id)
      return updatedSalles
    })

    toast({
      title: "Succès",
      description: "Salle supprimée avec succès",
      variant: "success",
    })
  }

  // Modifier une salle existante
  const handleEditSalle = (salle: any) => {
    setNewSalle(salle)
    setEditingSalleId(salle.id)
    setIsAddSalleOpen(true)
  }

  // Ajouter un étudiant à une salle
  const handleAddEtudiant = () => {
    if (!selectedSalle || !newEtudiant.id || !newEtudiant.nom || !newEtudiant.prenom) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    // Créer les présences par défaut pour tous les examens de la salle
    const presences = examensForSelectedSalle.map((examen) => ({
      examenId: examen.id,
      present: true, // Par défaut, l'étudiant est présent
    }))

    setEtudiantsParSalle((prev) => {
      const updated = { ...prev }
      if (!updated[selectedSalle]) {
        updated[selectedSalle] = []
      }

      // Vérifier si l'ID existe déjà
      const exists = updated[selectedSalle].some((e) => e.id === newEtudiant.id)
      if (exists) {
        toast({
          title: "Erreur",
          description: "Un étudiant avec cet ID existe déjà dans cette salle",
          variant: "destructive",
        })
        return prev
      }

      updated[selectedSalle] = [...updated[selectedSalle], { ...newEtudiant, presences }]
      return updated
    })

    setNewEtudiant({
      id: "",
      nom: "",
      prenom: "",
      niveau: selectedNiveau,
      specialite: selectedSpecialite,
      presences: [],
    })
    setIsAddEtudiantOpen(false)

    toast({
      title: "Succès",
      description: "Étudiant ajouté avec succès",
      variant: "success",
    })
  }

  // Supprimer un étudiant d'une salle
  const handleDeleteEtudiant = (etudiantId: string) => {
    if (!selectedSalle) return

    setEtudiantsParSalle((prev) => {
      const updated = { ...prev }
      updated[selectedSalle] = updated[selectedSalle].filter((e) => e.id !== etudiantId)
      return updated
    })

    toast({
      title: "Succès",
      description: "Étudiant supprimé avec succès",
      variant: "success",
    })
  }

  // Générer un rapport de présence
  const generatePresenceReport = () => {
    if (!selectedSalle) return

    const etudiants = etudiantsParSalle[selectedSalle] || []
    const totalEtudiants = etudiants.length

    if (totalEtudiants === 0) {
      toast({
        title: "Erreur",
        description: "Aucun étudiant dans cette salle",
        variant: "destructive",
      })
      return
    }

    // Statistiques par examen
    const examStats = examensForSelectedSalle.map((examen) => {
      const totalForExam = etudiants.length
      const presentForExam = etudiants.filter((etudiant) => {
        const presence = etudiant.presences.find((p) => p.examenId === examen.id)
        return presence && presence.present
      }).length
      const absentForExam = totalForExam - presentForExam
      const presenceRate = totalForExam > 0 ? Math.round((presentForExam / totalForExam) * 100) : 0

      return {
        examen: examen.matiere,
        date: examen.date,
        heure: examen.heure,
        presents: presentForExam,
        absents: absentForExam,
        taux: presenceRate,
      }
    })

    // Statistiques globales
    const totalExamens = examensForSelectedSalle.length * totalEtudiants
    const totalPresences = etudiants.reduce((sum, etudiant) => {
      return sum + etudiant.presences.filter((p) => p.present).length
    }, 0)
    const globalRate = totalExamens > 0 ? Math.round((totalPresences / totalExamens) * 100) : 0

    toast({
      title: "Rapport de présence généré",
      description: `Salle: ${selectedSalle} | Taux global de présence: ${globalRate}%`,
      variant: "success",
    })

    // Afficher les statistiques détaillées dans la console
    console.log("Rapport de présence pour la salle:", selectedSalle)
    console.log("Statistiques globales:", { totalEtudiants, totalExamens, totalPresences, globalRate })
    console.log("Statistiques par examen:", examStats)
    console.log("Étudiants absents par examen:", absentsByExam)
  }

  // Rechercher un étudiant par ID
  const handleSearchStudent = () => {
    if (!searchStudentId) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un ID d'étudiant",
        variant: "destructive",
      })
      return
    }

    // Rechercher l'étudiant dans toutes les salles
    let foundStudent = null
    let foundSalle = ""
    let examensInfo: any[] = []

    // Parcourir toutes les salles pour trouver l'étudiant
    Object.entries(etudiantsParSalle).forEach(([salle, etudiants]) => {
      const etudiant = etudiants.find((e) => e.id === searchStudentId)
      if (etudiant) {
        foundStudent = etudiant
        foundSalle = salle

        // Trouver les examens qui ont lieu dans cette salle
        const salleExamens = Object.values(emploisDuTemps)
          .flatMap((niveauxExamens) => Object.values(niveauxExamens))
          .flat()
          .filter((examen) => examen.salle === salle)

        // Associer les informations d'examen avec les présences
        examensInfo = etudiant.presences
          .map((presence) => {
            const examen = salleExamens.find((e) => e.id === presence.examenId)
            return examen
              ? {
                  id: presence.examenId,
                  matiere: examen.matiere,
                  date: examen.date,
                  heure: examen.heure,
                  present: presence.present,
                }
              : null
          })
          .filter(Boolean)
      }
    })

    if (foundStudent) {
      setSearchedStudent({ ...foundStudent, salle: foundSalle, examens: examensInfo })
      setActiveTab("recherche")
    } else {
      toast({
        title: "Étudiant non trouvé",
        description: "Aucun étudiant trouvé avec cet ID",
        variant: "destructive",
      })
      setSearchedStudent(null)
    }
  }

  // Exporter la liste des absences au format CSV
  const exportAbsencesCSV = () => {
    if (!selectedSalle || absentsByExam.length === 0) {
      toast({
        title: "Erreur",
        description: "Aucune donnée d'absence à exporter",
        variant: "destructive",
      })
      return
    }

    let csvContent = "ID,Nom,Prénom,Matière,Date,Heure\n"

    absentsByExam.forEach((item) => {
      item.examensAbsents.forEach((examen) => {
        csvContent += `${item.etudiant.id},${item.etudiant.nom},${item.etudiant.prenom},${examen.matiere},${examen.date},${examen.heure}\n`
      })
    })

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `absences_${selectedSalle.replace(/\s+/g, "_")}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Succès",
      description: "Liste des absences exportée avec succès",
      variant: "success",
    })
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-600">DIGITAL EXAMS MANAGEMENT</h2>
        </div>
        <div className="flex flex-col p-4 space-y-2">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-3xl font-bold text-blue-500">AD</span>
            </div>
          </div>
          <div className="text-center mb-6">
            <h3 className="font-medium">Admin</h3>
            <p className="text-sm text-gray-500">Administrateur</p>
          </div>
          <Link href="/dashboard" className="flex items-center p-2 rounded-md bg-blue-50 text-blue-600">
            <BarChart className="mr-2 h-4 w-4" />
            Tableau de bord
          </Link>
          <Link href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100">
            <School className="mr-2 h-4 w-4" />
            Spécialités
          </Link>
          <Link href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100">
            <Calendar className="mr-2 h-4 w-4" />
            Calendrier des examens
          </Link>
          <Link href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100">
            <MapPin className="mr-2 h-4 w-4" />
            Salles d&apos;examen
          </Link>
          <Link href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100">
            <Users className="mr-2 h-4 w-4" />
            Étudiants
          </Link>
          <Link href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100">
            <ClipboardList className="mr-2 h-4 w-4" />
            Rapports
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Gestion des Examens</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="outline" onClick={() => (window.location.href = "/login")}>
              Déconnexion
            </Button>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-6">
          <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total des examens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">Session de Mai 2025</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Salles utilisées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">Sur 20 disponibles</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Étudiants inscrits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1250</div>
                <p className="text-xs text-muted-foreground">Toutes spécialités confondues</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Taux de présence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">Moyenne sur tous les examens</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6 grid gap-6 grid-cols-1 md:grid-cols-4">
            <div>
              <label htmlFor="specialite" className="block text-sm font-medium text-gray-700 mb-1">
                Spécialité
              </label>
              <Select
                value={selectedSpecialite}
                onValueChange={(value) => {
                  setSelectedSpecialite(value)
                  setSelectedNiveau("")
                  setSelectedSalle("")
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une spécialité" />
                </SelectTrigger>
                <SelectContent>
                  {specialites.map((specialite) => (
                    <SelectItem key={specialite} value={specialite}>
                      {specialite}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="niveau" className="block text-sm font-medium text-gray-700 mb-1">
                Niveau
              </label>
              <Select value={selectedNiveau} onValueChange={setSelectedNiveau} disabled={!selectedSpecialite}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un niveau" />
                </SelectTrigger>
                <SelectContent>
                  {selectedSpecialite
                    ? niveaux[selectedSpecialite as keyof typeof niveaux]?.map((niveau) => (
                        <SelectItem key={niveau} value={niveau}>
                          {niveau}
                        </SelectItem>
                      ))
                    : []}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="salle" className="block text-sm font-medium text-gray-700 mb-1">
                Salle
              </label>
              <Select value={selectedSalle} onValueChange={setSelectedSalle} disabled={!selectedSpecialite}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une salle" />
                </SelectTrigger>
                <SelectContent>
                  {selectedSpecialite && salles[selectedSpecialite as keyof typeof salles]
                    ? salles[selectedSpecialite as keyof typeof salles].map((salle) => (
                        <SelectItem key={salle.id} value={salle.nom}>
                          {salle.nom} ({salle.groupe})
                        </SelectItem>
                      ))
                    : []}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="searchStudent" className="block text-sm font-medium text-gray-700 mb-1">
                Rechercher un étudiant
              </label>
              <div className="flex gap-2">
                <Input
                  id="searchStudent"
                  placeholder="ID de l'étudiant"
                  value={searchStudentId}
                  onChange={(e) => setSearchStudentId(e.target.value)}
                />
                <Button onClick={handleSearchStudent} className="shrink-0">
                  <Search className="h-4 w-4 mr-2" />
                  Rechercher
                </Button>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="emplois">Emplois du temps</TabsTrigger>
              <TabsTrigger value="salles">Gestion des salles</TabsTrigger>
              <TabsTrigger value="etudiants">Liste des étudiants</TabsTrigger>
              <TabsTrigger value="absences">Absences par salle</TabsTrigger>
              <TabsTrigger value="recherche">Recherche d'étudiant</TabsTrigger>
            </TabsList>

            <TabsContent value="emplois" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Emploi du temps des examens</CardTitle>
                  <CardDescription>
                    {selectedSalle
                      ? `Examens pour la salle ${selectedSalle}`
                      : selectedSpecialite
                        ? `Sélectionnez une salle pour voir les examens`
                        : "Veuillez sélectionner une spécialité"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedSalle ? (
                    examensForSelectedSalle.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Matière</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Heure</TableHead>
                            <TableHead>Salle</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {examensForSelectedSalle.map((examen) => (
                            <TableRow key={examen.id}>
                              <TableCell className="font-medium">{examen.matiere}</TableCell>
                              <TableCell>{examen.date}</TableCell>
                              <TableCell>{examen.heure}</TableCell>
                              <TableCell>{examen.salle}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-500">Aucun examen trouvé pour cette salle</p>
                      </div>
                    )
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500">Veuillez sélectionner une salle pour voir les examens</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="salles" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>Gestion des salles d&apos;examen</CardTitle>
                      <CardDescription>
                        {selectedSpecialite
                          ? `Salles pour la spécialité ${selectedSpecialite}`
                          : "Veuillez sélectionner une spécialité"}
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => {
                        setNewSalle({ code: "", nom: "", capacite: 0, disponible: true, groupe: "" })
                        setEditingSalleId(null)
                        setIsAddSalleOpen(true)
                      }}
                      disabled={!selectedSpecialite}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Ajouter une salle
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedSpecialite ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Code</TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>Capacité</TableHead>
                            <TableHead>Groupe</TableHead>
                            <TableHead>Disponible</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {salles[selectedSpecialite as keyof typeof salles]?.map((salle) => (
                            <TableRow key={salle.id}>
                              <TableCell className="font-medium">{salle.code}</TableCell>
                              <TableCell>{salle.nom}</TableCell>
                              <TableCell>{salle.capacite}</TableCell>
                              <TableCell>{salle.groupe}</TableCell>
                              <TableCell>{salle.disponible ? "Oui" : "Non"}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEditSalle(salle)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Modifier</span>
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDeleteSalle(salle.id)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Supprimer</span>
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500">Veuillez sélectionner une spécialité pour gérer les salles</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Dialog pour ajouter/modifier une salle */}
              <Dialog open={isAddSalleOpen} onOpenChange={setIsAddSalleOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingSalleId ? "Modifier la salle" : "Ajouter une nouvelle salle"}</DialogTitle>
                    <DialogDescription>
                      {editingSalleId
                        ? "Modifiez les informations de la salle ci-dessous."
                        : "Remplissez les informations pour ajouter une nouvelle salle."}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="code" className="text-right">
                        Code
                      </Label>
                      <Input
                        id="code"
                        value={newSalle.code}
                        onChange={(e) => setNewSalle({ ...newSalle, code: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="nom" className="text-right">
                        Nom
                      </Label>
                      <Input
                        id="nom"
                        value={newSalle.nom}
                        onChange={(e) => setNewSalle({ ...newSalle, nom: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="capacite" className="text-right">
                        Capacité
                      </Label>
                      <Input
                        id="capacite"
                        type="number"
                        value={newSalle.capacite.toString()}
                        onChange={(e) => setNewSalle({ ...newSalle, capacite: Number.parseInt(e.target.value) || 0 })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="groupe" className="text-right">
                        Groupe
                      </Label>
                      <Select
                        value={newSalle.groupe}
                        onValueChange={(value) => setNewSalle({ ...newSalle, groupe: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Sélectionner un groupe" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedSpecialite && niveaux[selectedSpecialite as keyof typeof niveaux]
                            ? niveaux[selectedSpecialite as keyof typeof niveaux].map((niveau) => (
                                <SelectItem key={niveau} value={`${selectedSpecialite} - ${niveau}`}>
                                  {selectedSpecialite} - {niveau}
                                </SelectItem>
                              ))
                            : []}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="disponible" className="text-right">
                        Disponible
                      </Label>
                      <div className="flex items-center space-x-2 col-span-3">
                        <Checkbox
                          id="disponible"
                          checked={newSalle.disponible}
                          onCheckedChange={(checked) => setNewSalle({ ...newSalle, disponible: !!checked })}
                        />
                        <label
                          htmlFor="disponible"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Salle disponible pour les examens
                        </label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddSalleOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleSalleSubmit}>
                      {editingSalleId ? "Enregistrer les modifications" : "Ajouter la salle"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TabsContent>

            <TabsContent value="etudiants" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>Liste des étudiants</CardTitle>
                      <CardDescription>
                        {selectedSalle
                          ? `Étudiants assignés à la salle ${selectedSalle}`
                          : "Veuillez sélectionner une salle"}
                      </CardDescription>
                    </div>

                    <Button
                      onClick={() => {
                        // Trouver le groupe associé à la salle sélectionnée
                        let groupe = ""
                        for (const specialite in salles) {
                          const salleFound = salles[specialite as keyof typeof salles].find(
                            (s) => s.nom === selectedSalle,
                          )
                          if (salleFound) {
                            groupe = salleFound.groupe
                            break
                          }
                        }

                        if (groupe) {
                          const [groupeSpecialite, groupeNiveau] = groupe.split(" - ")
                          setNewEtudiant({
                            id: "",
                            nom: "",
                            prenom: "",
                            niveau: groupeNiveau,
                            specialite: groupeSpecialite,
                            presences: [],
                          })
                          setIsAddEtudiantOpen(true)
                        }
                      }}
                      disabled={!selectedSalle}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Ajouter un étudiant
                    </Button>
                  </div>
                  <div className="relative w-full md:w-64 mt-4">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Rechercher un étudiant..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      disabled={!selectedSalle}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  {!selectedSalle ? (
                    <div className="text-center py-4">
                      <p className="text-gray-500">Veuillez sélectionner une salle pour voir les étudiants</p>
                    </div>
                  ) : filteredEtudiants.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-gray-500">Aucun étudiant trouvé dans cette salle</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>Prénom</TableHead>
                            <TableHead>Niveau</TableHead>
                            <TableHead>Présences/Absences</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredEtudiants.map((etudiant) => {
                            const totalExamens = etudiant.presences.length
                            const totalPresences = etudiant.presences.filter((p) => p.present).length
                            const totalAbsences = totalExamens - totalPresences

                            return (
                              <TableRow key={etudiant.id}>
                                <TableCell className="font-medium">{etudiant.id}</TableCell>
                                <TableCell>{etudiant.nom}</TableCell>
                                <TableCell>{etudiant.prenom}</TableCell>
                                <TableCell>{etudiant.niveau}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                      {totalPresences} présences
                                    </span>
                                    <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                                      {totalAbsences} absences
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDeleteEtudiant(etudiant.id)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Supprimer</span>
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Dialog pour ajouter un étudiant */}
              <Dialog open={isAddEtudiantOpen} onOpenChange={setIsAddEtudiantOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ajouter un étudiant</DialogTitle>
                    <DialogDescription>
                      Remplissez les informations pour ajouter un nouvel étudiant à la salle {selectedSalle}.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="etudiant-id" className="text-right">
                        ID
                      </Label>
                      <Input
                        id="etudiant-id"
                        value={newEtudiant.id}
                        onChange={(e) => setNewEtudiant({ ...newEtudiant, id: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="etudiant-nom" className="text-right">
                        Nom
                      </Label>
                      <Input
                        id="etudiant-nom"
                        value={newEtudiant.nom}
                        onChange={(e) => setNewEtudiant({ ...newEtudiant, nom: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="etudiant-prenom" className="text-right">
                        Prénom
                      </Label>
                      <Input
                        id="etudiant-prenom"
                        value={newEtudiant.prenom}
                        onChange={(e) => setNewEtudiant({ ...newEtudiant, prenom: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Groupe</Label>
                      <div className="col-span-3 text-sm text-gray-500">
                        {newEtudiant.specialite} - {newEtudiant.niveau}
                        <p className="text-xs mt-1">
                          Le groupe est automatiquement assigné en fonction de la salle sélectionnée.
                        </p>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddEtudiantOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleAddEtudiant}>Ajouter l&apos;étudiant</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TabsContent>

            <TabsContent value="absences" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>Liste des absences par salle</CardTitle>
                      <CardDescription>
                        {selectedSalle
                          ? `Absences des étudiants dans la salle ${selectedSalle}`
                          : "Veuillez sélectionner une salle pour voir les absences"}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={generatePresenceReport}
                        disabled={!selectedSalle || filteredEtudiants.length === 0}
                        className="flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Rapport
                      </Button>
                      <Button
                        onClick={exportAbsencesCSV}
                        disabled={!selectedSalle || absentsByExam.length === 0}
                        className="flex items-center gap-2"
                        variant="outline"
                      >
                        <Download className="h-4 w-4" />
                        Exporter CSV
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {!selectedSalle ? (
                    <div className="text-center py-4">
                      <p className="text-gray-500">Veuillez sélectionner une salle pour voir les absences</p>
                    </div>
                  ) : absentsByExam.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Aucune absence détectée</h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        Tous les étudiants de cette salle sont présents à tous leurs examens.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {absentsByExam.map((item, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden">
                          <div className="bg-gray-50 p-4 flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">
                                {item.etudiant.nom} {item.etudiant.prenom}
                              </h3>
                              <p className="text-sm text-gray-500">
                                ID: {item.etudiant.id} | {item.etudiant.specialite} - {item.etudiant.niveau}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                              <span className="font-medium text-amber-500">
                                {item.examensAbsents.length} absence{item.examensAbsents.length > 1 ? "s" : ""}
                              </span>
                            </div>
                          </div>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Matière</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Heure</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {item.examensAbsents.map((examen, examenIndex) => (
                                <TableRow key={examenIndex}>
                                  <TableCell className="font-medium">{examen.matiere}</TableCell>
                                  <TableCell>{examen.date}</TableCell>
                                  <TableCell>{examen.heure}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recherche" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recherche d'étudiant</CardTitle>
                  <CardDescription>
                    Recherchez un étudiant par son ID pour voir son statut de présence aux examens
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {searchedStudent ? (
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">Informations de l'étudiant</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">ID</p>
                            <p className="font-medium">{searchedStudent.id}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Nom complet</p>
                            <p className="font-medium">
                              {searchedStudent.nom} {searchedStudent.prenom}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Niveau</p>
                            <p className="font-medium">{searchedStudent.niveau}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Spécialité</p>
                            <p className="font-medium">{searchedStudent.specialite}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Salle</p>
                            <p className="font-medium">{searchedStudent.salle}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">Présence aux examens</h3>
                        {searchedStudent.examens && searchedStudent.examens.length > 0 ? (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Matière</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Heure</TableHead>
                                <TableHead>Statut</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {searchedStudent.examens.map((examen: any, index: number) => (
                                <TableRow key={index}>
                                  <TableCell className="font-medium">{examen.matiere}</TableCell>
                                  <TableCell>{examen.date}</TableCell>
                                  <TableCell>{examen.heure}</TableCell>
                                  <TableCell>
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs ${
                                        examen.present ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                      }`}
                                    >
                                      {examen.present ? (
                                        <div className="flex items-center">
                                          <CheckCircle className="h-3 w-3 mr-1" />
                                          Présent
                                        </div>
                                      ) : (
                                        <div className="flex items-center">
                                          <XCircle className="h-3 w-3 mr-1" />
                                          Absent
                                        </div>
                                      )}
                                    </span>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <div className="text-center py-4 bg-gray-50 rounded-lg">
                            <p className="text-gray-500">Aucun examen trouvé pour cet étudiant</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Recherchez un étudiant</h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        Entrez l'ID d'un étudiant dans le champ de recherche en haut pour voir son statut de présence
                        aux examens
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
