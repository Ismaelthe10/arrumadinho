import { useState, useCallback } from "react";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

// Limites espelhando o preset (defesa em profundidade: barra lixo óbvio
// antes de gastar chamada de rede/cota, mas quem garante de verdade é o
// preset configurado no painel do Cloudinary).
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

/**
 * Hook para upload de imagens ao Cloudinary usando um unsigned upload preset.
 *
 * @param {Object} [options]
 * @param {string} [options.tag] - tag opcional pra organizar/filtrar no Media Library
 *   (ex: "hero", "products"). Só funciona se o preset permitir tags em uploads unsigned.
 *
 * @returns {{
 *   upload: (file: File) => Promise<string>,
 *   uploading: boolean,
 *   error: string|null,
 *   reset: () => void,
 * }}
 */
export function useCloudinaryUpload({ tag } = {}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const reset = useCallback(() => setError(null), []);

  const upload = useCallback(
    async (file) => {
      setError(null);

      if (!CLOUD_NAME || !UPLOAD_PRESET) {
        const msg =
          "Cloudinary não configurado: verifique VITE_CLOUDINARY_CLOUD_NAME e VITE_CLOUDINARY_UPLOAD_PRESET no .env";
        setError(msg);
        throw new Error(msg);
      }

      if (!file) {
        throw new Error("Nenhum arquivo selecionado");
      }

      if (!ALLOWED_TYPES.includes(file.type)) {
        const msg = "Formato inválido. Envie JPG, PNG ou WEBP.";
        setError(msg);
        throw new Error(msg);
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        const msg = "Arquivo muito grande. Tamanho máximo: 5MB.";
        setError(msg);
        throw new Error(msg);
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      if (tag) formData.append("tags", tag);

      setUploading(true);
      try {
        const res = await fetch(UPLOAD_URL, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error?.message || "Falha no upload da imagem");
        }

        const data = await res.json();
        return data.secure_url;
      } catch (err) {
        const msg = err.message || "Falha no upload da imagem";
        setError(msg);
        throw err;
      } finally {
        setUploading(false);
      }
    },
    [tag]
  );

  return { upload, uploading, error, reset };
}