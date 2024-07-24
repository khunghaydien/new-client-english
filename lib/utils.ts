'use client'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useEffect } from "react"
import { MAX_ELLIPSIS } from "@/const/app"
import { CATEGORIES, ECHAPTER, ECHAPTERSTATUS, EDIFFICULTY, EEXERCISE } from "@/const/library"

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

export const categorize = (data: string[]) => {
  return data.reduce((acc, item) => {
    if (Object.values(ECHAPTER).includes(item)) {
      acc.ECHAPTER.push(item);
    } else if (Object.values(EDIFFICULTY).includes(item)) {
      acc.EDIFFICULTY = item;
    } else if (Object.values(ECHAPTERSTATUS).includes(item)) {
      acc.ECHAPTERSTATUS = item;
    } else if (Object.values(EEXERCISE).includes(item)) {
      acc.EEXERCISE = item;
    }
    return acc;
  }, CATEGORIES);
}