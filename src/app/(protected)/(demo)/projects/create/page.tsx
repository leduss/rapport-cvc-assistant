'use client';

import React, { useState } from 'react';

import { Building, Calendar, FileText, Save, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Schema de validation Zod
const projectSchema = z
  .object({
    name: z.string().min(1, 'Le nom du projet est requis').trim(),
    client: z.string().min(1, 'Le nom du client est requis').trim(),
    address: z.string().min(1, "L'adresse est requise").trim(),
    description: z.string().optional(),
    startDate: z.string().min(1, 'La date de début est requise'),
    endDate: z.string().optional(),
    budget: z.string().optional(),
    priority: z.enum(['low', 'medium', 'high']).default('medium'),
    category: z.string().min(1, 'La catégorie est requise'),
  })
  .refine(
    (data) => {
      // Validation personnalisée pour les dates
      if (data.endDate && data.startDate) {
        return new Date(data.endDate) >= new Date(data.startDate);
      }
      return true;
    },
    {
      message: 'La date de fin doit être après la date de début',
      path: ['endDate'],
    }
  )
  .refine(
    (data) => {
      // Validation personnalisée pour le budget
      if (data.budget && data.budget.trim() !== '') {
        const budgetNum = Number(data.budget);
        return !isNaN(budgetNum) && budgetNum >= 0;
      }
      return true;
    },
    {
      message: 'Le budget doit être un nombre positif valide',
      path: ['budget'],
    }
  );

// Types inférés depuis le schema Zod
type ProjectFormData = z.infer<typeof projectSchema>;

interface FormErrors {
  [key: string]: string;
}

export default function NewProjectPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    client: '',
    address: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
    priority: 'medium',
    category: 'CVC',
  });

  // Gestion des changements de formulaire
  const handleInputChange = (field: keyof ProjectFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Nettoyer l'erreur quand l'utilisateur tape
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  // Validation du formulaire avec Zod
  const validateForm = (): boolean => {
    try {
      projectSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.issues.forEach((issue) => {
          const fieldName = issue.path.join('.');
          newErrors[fieldName] = issue.message;
        });
        setErrors(newErrors);
      } else {
        console.error('Erreur de validation inattendue:', error);
      }
      return false;
    }
  };

  // Validation en temps réel d'un champ spécifique
  const validateField = (field: keyof ProjectFormData, value: string) => {
    try {
      const partialSchema = projectSchema.pick({ [field]: true });
      partialSchema.parse({ [field]: value });

      // Si pas d'erreur, nettoyer l'erreur existante
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: '',
        }));
      }
    } catch (error) {
      if (error instanceof z.ZodError && error.issues.length > 0) {
        const errorMessage = error.issues[0]?.message;
        if (errorMessage) {
          setErrors((prev) => ({
            ...prev,
            [field]: errorMessage,
          }));
        }
      }
    }
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Transformation des données avant envoi
      const validatedData = projectSchema.parse(formData);

      // TODO: Remplacer par un vrai appel API
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      if (response.ok) {
        const project = await response.json();
        router.push(`/projects/${project.id}`);
      } else {
        throw new Error('Erreur lors de la création du projet');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Erreur de validation:', error.issues);
      } else {
        console.error('Erreur:', error);
      }
      // TODO: Afficher un toast d'erreur
    } finally {
      setIsLoading(false);
    }
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const priorityLabels = {
    low: 'Faible',
    medium: 'Normale',
    high: 'Élevée',
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="flex items-center text-3xl font-bold">
              <Building className="mr-3 h-8 w-8 text-blue-600" />
              Nouveau Projet
            </h1>
            <p className="text-muted-foreground">
              Créer un nouveau projet de mise en service CVC
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations générales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Informations générales
            </CardTitle>
            <CardDescription>Détails de base du projet</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du projet *</Label>
                <Input
                  id="name"
                  placeholder="Ex: Hôpital Saint-Jean - CVC"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  onBlur={(e) => validateField('name', e.target.value)}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="client">Client *</Label>
                <Input
                  id="client"
                  placeholder="Ex: CHU Bordeaux"
                  value={formData.client}
                  onChange={(e) => handleInputChange('client', e.target.value)}
                  onBlur={(e) => validateField('client', e.target.value)}
                  className={errors.client ? 'border-red-500' : ''}
                />
                {errors.client && (
                  <p className="text-sm text-red-500">{errors.client}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Adresse *</Label>
              <Input
                id="address"
                placeholder="Ex: 123 Rue de la République, 33000 Bordeaux"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                onBlur={(e) => validateField('address', e.target.value)}
                className={errors.address ? 'border-red-500' : ''}
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Description détaillée du projet..."
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Planning et budget */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Planning et Budget
            </CardTitle>
            <CardDescription>Dates et informations financières</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="startDate">Date de début *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    handleInputChange('startDate', e.target.value)
                  }
                  onBlur={(e) => validateField('startDate', e.target.value)}
                  className={errors.startDate ? 'border-red-500' : ''}
                />
                {errors.startDate && (
                  <p className="text-sm text-red-500">{errors.startDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">Date de fin prévue</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  onBlur={(e) => validateField('endDate', e.target.value)}
                  className={errors.endDate ? 'border-red-500' : ''}
                />
                {errors.endDate && (
                  <p className="text-sm text-red-500">{errors.endDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget (€)</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="Ex: 50000"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  onBlur={(e) => validateField('budget', e.target.value)}
                  className={errors.budget ? 'border-red-500' : ''}
                />
                {errors.budget && (
                  <p className="text-sm text-red-500">{errors.budget}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Paramètres du projet */}
        <Card>
          <CardHeader>
            <CardTitle>Paramètres du projet</CardTitle>
            <CardDescription>Priorité et catégorie</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Priorité</Label>
                <div className="flex space-x-2">
                  {(['low', 'medium', 'high'] as const).map((priority) => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => handleInputChange('priority', priority)}
                      className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                        formData.priority === priority
                          ? priorityColors[priority]
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {priorityLabels[priority]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange('category', e.target.value)
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="CVC">CVC Général</option>
                  <option value="CHAUFFAGE">Chauffage</option>
                  <option value="CLIMATISATION">Climatisation</option>
                  <option value="VENTILATION">Ventilation</option>
                  <option value="REGULATION">Régulation</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            <X className="mr-2 h-4 w-4" />
            Annuler
          </Button>
          <Button type="submit" disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? 'Création...' : 'Créer le projet'}
          </Button>
        </div>
      </form>
    </div>
  );
}
