import { useCloudinaryUpload } from "../hooks/useCloudinaryUpload";
import styles from "./ImageUploadField.module.css";

/**
 * Campo de imagem com upload direto pro Cloudinary.
 * Mantém compatibilidade com o padrão atual: recebe/emite uma URL (string).
 *
 * Uso:
 *   <ImageUploadField
 *     label="Imagem do card"
 *     value={form.image}
 *     onChange={(url) => setForm((f) => ({ ...f, image: url }))}
 *     tag="products"
 *   />
 */
export default function ImageUploadField({
  label,
  value,
  onChange,
  tag,
  className = "",
}) {
  const { upload, uploading, error, reset } = useCloudinaryUpload({ tag });

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    e.target.value = ""; // permite selecionar o mesmo arquivo de novo depois
    if (!file) return;

    try {
      const url = await upload(file);
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
          onChange={(e) => onChange(e.target.value)}
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

      {value && (
        <img src={value} alt="Pré-visualização" className={styles.preview} />
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
