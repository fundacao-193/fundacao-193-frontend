import { useState } from 'react';
import { Flame } from 'lucide-react';

type ImageWithPlaceholderProps = {
  src?: string | null;
  alt: string;
  containerClassName?: string;
};

export default function ImageWithPlaceholder({
  src,
  alt,
  containerClassName = 'aspect-[16/10]',
}: ImageWithPlaceholderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const showImage = Boolean(src) && !hasError;
  const showPlaceholder = !showImage || !isLoaded;

  return (
    <div className={`${containerClassName} relative overflow-hidden bg-white`}>
      {showPlaceholder && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <img
            src="/logo-reduzida.png"
            alt="Fundação 193 Logo"
            className="h-12 w-auto"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      {showImage && (
        <img
          src={src!}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
