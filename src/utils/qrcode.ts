import QRCode from 'qrcode';

export async function generateQRCode(canvas: HTMLCanvasElement, url: string, size: number = 512): Promise<void> {
  await QRCode.toCanvas(canvas, url, {
    width: size,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  });
}

export async function copyQRCode(canvas: HTMLCanvasElement): Promise<void> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(async (blob) => {
      if (blob) {
        try {
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          resolve();
        } catch (error) {
          reject(error);
        }
      } else {
        reject(new Error('Failed to create blob'));
      }
    }, 'image/png');
  });
}

export function downloadQRCode(canvas: HTMLCanvasElement, filename: string = `qr-code-${Date.now()}.png`): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}