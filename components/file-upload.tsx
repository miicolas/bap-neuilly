"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";


export default function FileUpload({ fileName, label }: { fileName: string, label?: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);



  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!file) {
      toast.error("Veuillez sélectionner un fichier");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      setLoading(false);
      const imageUrl = `https://minio-bap-neuilly.nicolas-becharat.com/bap-neuilly/${data.filename}`;
      setImageUrl(imageUrl);
      toast.success(`Upload réussi: ${data.filename}`);
      setFile(null);
    } else {
      toast.error(`Erreur: ${data.error}`);
    }
  };

  return (
    <div className="flex items-start justify-center gap-4">
      <form onSubmit={handleUpload} className="flex flex-col  items-start gap-4">
        <Label htmlFor={fileName}>{label}</Label>
        <Input id={fileName} type="file" accept="image/*" onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }} />
        <Button type="submit" disabled={loading || file === null}>
          {loading ? "Upload en cours..." : "Uploader"}
        </Button>
      </form>
      {imageUrl && (
        <div className="flex flex-col items-center gap-4">
          <h2>Image Uploadée :</h2>
          <img src={imageUrl} alt="Image uploadée" width={400} />
        </div>
      )}
    </div>
  );
}
