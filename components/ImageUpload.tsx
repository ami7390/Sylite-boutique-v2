'use client'

import React, { useState } from 'react'
import { CheckCircle2, LoaderCircle, UploadCloud } from 'lucide-react'
import { supabase } from '../lib/supabaseclient'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function ImageUpload() {
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Vous devez sélectionner une image.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `fashion-images/${fileName}`

      // 1. Envoi du fichier vers le bucket 'images'
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      // 2. Récupération de l'URL publique de l'image
      const { data } = supabase.storage.from('images').getPublicUrl(filePath)
      const publicUrl = data.publicUrl
      setImageUrl(publicUrl)

      // 3. Force le passage sans typage strict pour ignorer l'ancien schéma local
      const { error: dbError } = await (supabase as any)
        .from('products')
        .insert({
          name: "Nouvel Article Chic",
          price: "25 000 F CFA",
          category: "Nouvel Arrivage",
          image_url: publicUrl
        })

      if (dbError) {
        throw dbError
      }

      alert('Image et produit ajoutés avec succès à la base de données !')

    } catch (error: any) {
      alert(error.message || "Une erreur est survenue lors de l'envoi.")
      console.error("Détails de l'erreur :", error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card className="flex flex-col items-center gap-4 border-2 border-dashed border-neutral-300 p-6 shadow-none">
      <Button asChild disabled={uploading}>
        <label className="cursor-pointer">
          {uploading ? <LoaderCircle className="size-4 animate-spin" /> : <UploadCloud className="size-4" />}
          {uploading ? 'Téléversement en cours...' : 'Sélectionner une image'}
          <input type="file" accept="image/*" onChange={uploadFile} disabled={uploading} className="hidden" />
        </label>
      </Button>

      {imageUrl && (
        <div className="mt-4 flex flex-col items-center">
          <p className="mb-2 flex items-center gap-1.5 text-sm text-green-600"><CheckCircle2 className="size-4" /> Aperçu de l&apos;image insérée :</p>
          <img src={imageUrl} alt="Uploaded preview" className="w-48 h-48 object-cover rounded shadow" />
        </div>
      )}
    </Card>
  )
}
