import { ListLoading } from "@/components/common/loading";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { convertToChunks } from "@/lib/utils";
import clsx from "clsx";

type CarouselPaletteProps<T> = {
  loading?: boolean;
  items: T[];
  renderButton: (
    item: T,
    index: number,
    chunkIndex: number,
    chunkSize: number
  ) => JSX.Element;
  title?: string;
  maxChunkSize?: number;
  activeIndex?: number;
};

export const CarouselPalette = <T,>({
  loading,
  items,
  renderButton,
  title,
  maxChunkSize = 5,
  activeIndex,
}: CarouselPaletteProps<T>) => {
  const { chunkList, chunkSize } = convertToChunks(items, maxChunkSize) as {
    chunkList: T[][];
    chunkSize: number;
  };
  return (
    <div className="flex">
      {title && <Button variant={"secondary"}>{title}</Button>}
      {loading ? (
        <ListLoading
          width={36}
          height={36}
          direction={"horizontal"}
          quantity={3}
        />
      ) : (
        <div
          style={{ maxWidth: `${chunkSize * 52}px` }}
          className={clsx(chunkList.length > 1 ? "ml-20 mr-20" : "ml-4")}
        >
          <Carousel
            opts={{
              startIndex: activeIndex
                ? Math.ceil(activeIndex / chunkSize) - 1
                : 0,
            }}
          >
            <CarouselContent>
              {chunkList.map((chunk, chunkIndex) => (
                <CarouselItem
                  key={chunkIndex}
                  className="flex justify-evently gap-2"
                >
                  {chunk.map((item, index) =>
                    renderButton(item, index, chunkIndex, chunkSize)
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
            {chunkList.length > 1 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
        </div>
      )}
    </div>
  );
};
