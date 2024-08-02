'use client'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useEffect } from "react"
import { MAX_ELLIPSIS } from "@/const/app"
import { CATEGORIES, ECHAPTER, ECHAPTERSTATUS, EDIFFICULTY, EEXERCISE } from "@/const/library"
import { PixelCrop } from "react-image-crop"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const useClickOutside = (
  ref: React.MutableRefObject<null | HTMLDivElement>,
  handler: Function
) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      handler(event)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

export const getTextEllipsis = (
  text: any,
  maxEllipsis?: number | undefined
) => {
  const _maxEllipsis = maxEllipsis || MAX_ELLIPSIS
  let _text = text?.toString() || ''
  const indexBreakLine = _text.indexOf('\n')
  if (indexBreakLine > -1) {
    _text = `${text?.slice(0, indexBreakLine)}`
  }
  if (_text?.length < _maxEllipsis && indexBreakLine > -1) {
    return `${_text}...`
  } else if (_text?.length < _maxEllipsis && indexBreakLine === -1) {
    return _text
  }
  if (_text.length === _maxEllipsis) return _text
  return `${_text?.slice(0, _maxEllipsis)}...`
}

export const scrollToFirstErrorMessage = () => {
  const firstErrorMessage = document.querySelector(
    '.error-message-scroll'
  ) as HTMLElement
  if (firstErrorMessage) {
    firstErrorMessage.scrollIntoView({
      behavior: 'smooth',
    })
  }
}

export const getFirstNSegments = (url: string, rank: number = 2): string => {
  const parts = url.split("/");
  if (parts.length > rank) {
    return "/" + parts.slice(1, rank + 1).join("/");
  }
  return url;
}

export const setCanvasPreview = (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No 2d context");
  }

  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";
  ctx.save();

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  // Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();
};