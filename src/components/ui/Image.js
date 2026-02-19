"use client";

import NextImage from "next/image";

/**
 * Componente de imagen reutilizable. Envuelve next/image con soporte para rounded.
 * @param {number} rounded - Porcentaje de border-radius (ej. 50 para circular). Por defecto 0.
 */
export function Image({
  src,
  alt,
  width,
  height,
  rounded = 0,
  className,
  priority = false,
  ...props
}) {
  const style = rounded
    ? { borderRadius: `${rounded}%` }
    : undefined;

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      style={style}
      {...props}
    />
  );
}

Image.displayName = "Image";
