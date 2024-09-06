"use client";
import React, { useEffect, useId, useState } from "react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export const Cover = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
  const [hovered, setHovered] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [lightningPositions, setLightningPositions] = useState<number[]>([]);
  const [beamPositions, setBeamPositions] = useState<number[]>([]);

  useEffect(() => {
    if (ref.current) {
      setContainerWidth(ref.current?.clientWidth ?? 0);

      const height = ref.current?.clientHeight ?? 0;

      const numberOfLightnings = Math.floor(height / 10);
      const lightningPositions = Array.from(
        { length: numberOfLightnings },
        (_, i) => (i + 1) * (height / (numberOfLightnings + 1))
      );
      setLightningPositions(lightningPositions);

      const numberOfBeams = Math.floor(height / 10);
      const beamPositions = Array.from({ length: numberOfBeams }, (_, i) => (i + 1) * (height / (numberOfBeams + 1)));
      setBeamPositions(beamPositions);
    }
  }, []);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={ref}
      className="group/cover cursor-flash relative inline-block rounded-sm px-2 py-2 transition duration-200"
    >
      {beamPositions.map((position, index) => {
        console.log("BEAM", { position, index });
        return (
          <Beam
            key={index}
            hovered={hovered}
            duration={Math.random() * 2 + 1}
            delay={Math.random() * 2 + 1}
            width={containerWidth}
            style={{
              top: `${position}px`,
            }}
          />
        );
      })}
      {hovered &&
        lightningPositions.map((position, index) => (
          <Lightning
            key={`lightning-${index}`}
            hovered={hovered}
            duration={Math.random() * 2 + 1}
            delay={Math.random() * 2 + 1}
            width={containerWidth}
            size={12}
            style={{
              top: `${position}px`,
            }}
          />
        ))}
      <motion.span
        key={String(hovered)}
        animate={{
          scale: hovered ? 0.8 : 1,
          x: hovered ? [0, -30, 30, -30, 30, 0] : 0,
          y: hovered ? [0, 30, -30, 30, -30, 0] : 0,
        }}
        exit={{
          filter: "none",
          scale: 1,
          x: 0,
          y: 0,
        }}
        transition={{
          duration: 0.2,
          x: {
            duration: 0.2,
            repeat: Infinity,
            repeatType: "loop",
          },
          y: {
            duration: 0.2,
            repeat: Infinity,
            repeatType: "loop",
          },
          scale: {
            duration: 0.2,
          },
          filter: {
            duration: 0.2,
          },
        }}
        className={cn(
          "relative z-20 inline-block text-neutral-900 transition duration-200 group-hover/cover:text-white dark:text-white",
          className
        )}
      >
        {children}
      </motion.span>
    </div>
  );
};

export const Beam = ({
  className,
  delay,
  duration,
  hovered,
  width = 600,
  ...svgProps
}: {
  className?: string;
  delay?: number;
  duration?: number;
  hovered?: boolean;
  width?: number;
} & React.ComponentProps<typeof motion.svg>) => {
  const id = useId();
  console.log("BEA", { hovered });

  return (
    <motion.svg
      width={width ?? "600"}
      height="1"
      viewBox={`0 0 ${width ?? "600"} 1`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("absolute inset-x-0 w-full", className)}
      {...svgProps}
    >
      <motion.path d={`M0 0.5H${width ?? "600"}`} stroke={`url(#svgGradient-${id})`} />

      <defs>
        <motion.linearGradient
          id={`svgGradient-${id}`}
          key={String(hovered)}
          gradientUnits="userSpaceOnUse"
          initial={{
            x1: "0%",
            x2: hovered ? "-10%" : "-5%",
            y1: 0,
            y2: 0,
          }}
          animate={{
            x1: "110%",
            x2: hovered ? "100%" : "105%",
            y1: 0,
            y2: 0,
          }}
          transition={{
            duration: hovered ? 0.5 : (duration ?? 2),
            ease: "linear",
            repeat: Infinity,
            delay: hovered ? Math.random() * (1 - 0.2) + 0.2 : 0,
            repeatDelay: hovered ? Math.random() * (2 - 1) + 1 : (delay ?? 1),
          }}
        >
          <stop stopColor="#ffedd5" stopOpacity="0" />
          <stop stopColor="#fed7aa" />
          <stop offset="1" stopColor="#fdba74" stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </motion.svg>
  );
};

export const Lightning = ({
  className,
  delay,
  duration,
  hovered,
  width = 600,
  size = 24,
  ...svgProps
}: {
  className?: string;
  delay?: number;
  duration?: number;
  hovered?: boolean;
  width?: number;
  size?: number;
} & React.ComponentProps<typeof motion.svg>) => {
  const id = useId();

  // Calculate the scale factor based on the new size
  const scaleFactor = size / 24;

  return (
    <motion.svg
      width={width}
      height={size}
      viewBox={`0 0 ${width} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("absolute inset-x-0 w-full", className)}
      {...svgProps}
    >
      <defs>
        <linearGradient id={`lightningGradient-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffedd5" stopOpacity="0.5" />
          <stop offset="25%" stopColor="#fed7aa" stopOpacity="1" />
          <stop offset="50%" stopColor="#fdba74" stopOpacity="1" />
          <stop offset="75%" stopColor="#fed7aa" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffedd5" stopOpacity="0.5" />
        </linearGradient>
        <motion.clipPath id={`lightningClip-${id}`}>
          <motion.path
            id={`lightningPath-${id}`}
            key={String(hovered)}
            d={`M${4 * scaleFactor} ${14 * scaleFactor}a${1 * scaleFactor} ${1 * scaleFactor} 0 0 1-${0.78 * scaleFactor}-${1.63 * scaleFactor}l${9.9 * scaleFactor}-${10.2 * scaleFactor}a${0.5 * scaleFactor} ${0.5 * scaleFactor} 0 0 1 ${0.86 * scaleFactor} ${0.46 * scaleFactor}l-${1.92 * scaleFactor} ${6.02 * scaleFactor}A${1 * scaleFactor} ${1 * scaleFactor} 0 0 0 ${13 * scaleFactor} ${10 * scaleFactor}h${7 * scaleFactor}a${1 * scaleFactor} ${1 * scaleFactor} 0 0 1 ${0.78 * scaleFactor} ${1.63 * scaleFactor}l-${9.9 * scaleFactor} ${10.2 * scaleFactor}a${0.5 * scaleFactor} ${0.5 * scaleFactor} 0 0 1-${0.86 * scaleFactor}-${0.46 * scaleFactor}l${1.92 * scaleFactor}-${6.02 * scaleFactor}A${1 * scaleFactor} ${1 * scaleFactor} 0 0 0 ${11 * scaleFactor} ${14 * scaleFactor}z`}
            initial={{ x: -size }}
            animate={{ x: width }}
            transition={{
              duration: hovered ? 0.5 : (duration ?? 2),
              ease: "linear",
              repeat: Infinity,
              delay: hovered ? Math.random() * (1 - 0.2) + 0.2 : 0,
              repeatDelay: hovered ? Math.random() * (2 - 1) + 1 : (delay ?? 1),
            }}
          />
        </motion.clipPath>
      </defs>
      <rect
        x="0"
        y="0"
        width={width}
        height={size}
        fill={`url(#lightningGradient-${id})`}
        clipPath={`url(#lightningClip-${id})`}
      />
    </motion.svg>
  );
};
