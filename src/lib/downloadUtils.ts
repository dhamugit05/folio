import { resumeBase64, resumeDataUri } from '../data/resumeData';

/**
 * Downloads resume PDF directly into the user's browser using client-side Blob generation,
 * avoiding external target="_blank" 403 Forbidden Cloud Run proxy errors.
 */
export async function downloadResumeFile(filename = 'Dhamotharan_S_Resume.pdf'): Promise<boolean> {
  try {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return false;
    }

    // Convert base64 to binary array & blob
    const byteCharacters = atob(resumeBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = filename;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 3000);

    return true;
  } catch (err) {
    console.warn('Base64 blob download failed, attempting fetch fallback:', err);
    try {
      const res = await fetch('/resume.pdf');
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      return true;
    } catch (fallbackErr) {
      console.error('All download methods failed:', fallbackErr);
      return false;
    }
  }
}

export { resumeDataUri };
