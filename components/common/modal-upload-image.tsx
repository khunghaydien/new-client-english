import React, { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { DialogTitle, DialogContent, DialogFooter, DialogClose, Dialog, DialogHeader } from '../ui/dialog';
import { Button } from '../ui/button';
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop, PercentCrop } from 'react-image-crop';
import { setCanvasPreview } from '@/lib/utils';
import { DialogDescription } from '@radix-ui/react-dialog';
import NextImage from 'next/image'
import TestImage from '@/public/test-2.png'
import { ScrollArea } from '../ui/scroll-area';
import ConditionalRender from './conditional-render';
import clsx from 'clsx';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;
interface IModalUploadImage {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    onSubmit: (imgSrc: string) => void
    onClose: () => void
    title: string
    description?: string
}
const ModalUploadImage = ({ onSubmit, onClose, title, description, open, setOpen }: IModalUploadImage) => {
    const [imgSrc, setImgSrc] = useState<string>("")
    const inputRef = useRef<HTMLInputElement>(null)
    const imgRef = useRef<HTMLImageElement | null>(null)
    const previewCanvasRef = useRef<HTMLCanvasElement | null>(null)
    const [crop, setCrop] = useState<PercentCrop>();
    const [images, setImages] = useState<string[]>([])
    const [selected, setSelected] = useState<string>("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        getImgSrc(file)
    }

    const getImgSrc = (file: File) => {
        const reader = new FileReader()
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageURL = reader.result?.toString() ?? "";
            imageElement.src = imageURL;
            setImgSrc(imageURL)
        });
        reader.readAsDataURL(file);
    }

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

        const initialCrop: PercentCrop = makeAspectCrop(
            {
                unit: "%",
                width: cropWidthInPercent,
            },
            ASPECT_RATIO,
            width,
            height
        );
        const centeredCrop = centerCrop(initialCrop, width, height);
        setCrop(centeredCrop);
    };

    const handleCropImage = () => {
        if (imgRef.current && previewCanvasRef.current) {
            setCanvasPreview(
                imgRef.current,
                previewCanvasRef.current,
                convertToPixelCrop(
                    crop!,
                    imgRef.current.width,
                    imgRef.current.height
                )
            );
            return previewCanvasRef.current.toDataURL();
        }
    }

    const handleApply = () => {
        if (imgSrc) {
            const imageSrc = handleCropImage() ?? "";
            onSubmit(imageSrc);
        }
        onSubmit(selected);
        setSelected("");
        setImgSrc("");
        onClose()
    }

    const handleReview = () => {
        const imageURL = handleCropImage() ?? "";
        const tmpNewImages = [...images, imageURL];
        setImages(tmpNewImages);
        setSelected(imageURL);
        setImgSrc('');
    }

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (!file) return;
        getImgSrc(file)
    }, []);

    const handleDragOver = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
        },
        []
    );

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent className="min-w-[550px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <Input
                    ref={inputRef}
                    className='hidden'
                    type={'file'}
                    accept="image/*"
                    onChange={handleChange}
                />
                <ConditionalRender
                    conditional={Boolean(imgSrc)}
                    fallback={
                        <ScrollArea className='h-[500px]'>
                            <div className='flex gap-3 flex-wrap w-full'>
                                <div
                                    className='flex items-center justify-center border border-dashed w-[150px] h-[150px] border-muted-foreground'
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                >
                                    <Button variant={'ghost'} onClick={() => inputRef.current?.click()}>Upload image</Button>
                                </div>
                                {images.map((image, index) => (
                                    <div key={index}
                                        className={clsx("w-[150px] h-[150px] cover border-2 cursor-pointer",
                                            { ["border-muted-foreground"]: image === selected })}
                                        onClick={() => setSelected(image)}>
                                        <NextImage
                                            src={image}
                                            alt="Test Image"
                                            width={300}
                                            height={300}
                                        />
                                    </div>
                                ))}
                                {Array.from({ length: 20 }).map((_, index) => (
                                    <div key={index} className='w-[150px] h-[150px] cover border border-muted-foreground'>
                                        <NextImage
                                            src={TestImage}
                                            alt="Test Image"
                                            width={300}
                                            height={300}
                                        />
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    }>
                    <div className='p-3 flex flex-col gap-3'>
                        <ReactCrop
                            crop={crop}
                            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                            circularCrop
                            keepSelection
                            aspect={ASPECT_RATIO}
                            minWidth={MIN_DIMENSION}
                        >
                            <img
                                ref={imgRef}
                                src={imgSrc}
                                onLoad={onImageLoad}
                            />
                        </ReactCrop>
                    </div>
                </ConditionalRender>
                <DialogFooter className='flex gap-2'>
                    <DialogClose><Button variant={'outline'}>Cancel</Button></DialogClose>
                    {imgSrc &&
                        <Button variant={'blue'} onClick={handleReview}>
                            Preview
                        </Button>
                    }
                    <Button onClick={handleApply}>
                        Apply
                    </Button>
                </DialogFooter>
                {
                    crop && (
                        <canvas
                            ref={previewCanvasRef}
                            className="hidden"
                        />
                    )
                }
            </DialogContent >
        </Dialog >
    )
}

export default ModalUploadImage