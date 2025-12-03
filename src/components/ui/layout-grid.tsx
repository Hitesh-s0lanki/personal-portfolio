"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type Card = {
  id: number;
  content: React.ReactNode | string;
  className: string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  // Prevent body scroll when card is selected on mobile only
  useEffect(() => {
    const isMobile = window.innerWidth < 768; // md breakpoint
    if (selected && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selected]);

  return (
    <div className="w-full h-full p-4 md:p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative" style={{ gridAutoRows: "minmax(250px, 1fr)" }}>
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "min-h-[250px]")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden cursor-pointer min-h-[250px]",
              selected?.id === card.id
                ? "rounded-lg fixed md:absolute inset-0 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:h-1/2 md:w-1/2 z-[50] flex justify-center items-center flex-wrap flex-col max-h-screen md:max-h-none"
                : lastSelected?.id === card.id
                ? "z-40 bg-white rounded-xl h-full w-full"
                : "bg-white rounded-xl h-full w-full"
            )}
            layoutId={`card-${card.id}`}
          >
            <ImageComponent card={card} />
            {selected?.id === card.id && <SelectedCard selected={selected} onClose={handleOutsideClick} />}
          </motion.div>
        </div>
      ))}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={handleOutsideClick}
            className={cn(
              "fixed inset-0 md:absolute md:inset-0 bg-black z-40 md:z-10",
              "pointer-events-auto"
            )}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      height="500"
      width="500"
      className={cn(
        "object-cover object-top absolute inset-0 h-full w-full transition duration-200"
      )}
      alt="thumbnail"
      onError={(e) => {
        console.error("Failed to load image:", card.thumbnail);
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  );
};

const SelectedCard = ({ selected, onClose }: { selected: Card | null; onClose: () => void }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60] overflow-y-auto">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
      />
      {/* Close button for mobile */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 md:hidden z-[80] p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors"
        aria-label="Close"
      >
        <X className="h-5 w-5 text-white" />
      </button>
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 100,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative px-4 md:px-8 pb-4 md:pb-4 pt-16 md:pt-0 z-[70]"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};
