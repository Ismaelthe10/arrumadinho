import { useState } from "react";
import { useCloudinaryUpload } from "../hooks/useCloudinaryUpload";
import styles from "./ImageUploadField.module.css";


export default function ImageUploadField({
  label,
  value,
  onChange,
  tag,
  className = "",
}) {
  const { upload, uploading, error, reset } = useCloudinaryUpload({ tag });
  const [imgBroken, setImgBroken] = useState(false);

  function handleUrlChange(e) {
    setImgBroken(false);
    onChange(e.target.value);
  }

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    e.target.value = ""; // permite selecionar o mesmo arquivo de novo depois
    if (!file) return;

    try {
      const url = await upload(file);
      setImgBroken(false);
      onChange(url);
    } catch {
      // erro já fica disponível em `error` pra exibição; nada a fazer aqui
    }
  }

  return (
    <div className={`${styles.field} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.row}>
        <input
          type="text"
          value={value || ""}
          onChange={handleUrlChange}
          placeholder="URL da imagem"
          className={styles.input}
        />

        <label className={styles.button}>
          {uploading ? "Enviando..." : "Escolher arquivo"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            disabled={uploading}
            hidden
          />
        </label>
      </div>

      {value && !imgBroken && (
        <img
          src={value}
          alt="Pré-visualização"
          className={styles.preview}
          onError={() => setImgBroken(true)}
        />
      )}

      {value && imgBroken && (
        <div className={styles.previewBroken}>Imagem não encontrada</div>
      )}

      {error && (
        <p className={styles.error} role="alert">
          {error}
          <button type="button" onClick={reset} className={styles.errorClose}>
            fechar
          </button>
        </p>
      )}
    </div>
  );
}
