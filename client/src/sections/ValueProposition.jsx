import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const cards = [
  {
    id: "01",
    title: "Velocity",
    subtitle: "Rapid Execution",
    description: "We ship at the speed of thought. No bureaucracy, just pure momentum.",
    // Image: Long exposure highway (Speed)
    image: "https://images.unsplash.com/photo-1492551557933-34265f7af79e?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Precision",
    subtitle: "Pixel Perfect",
    description: "Architecture that scales. Code that is clean, tested, and bulletproof.",
    // Image: Abstract Geometry (Structure)
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Impact",
    subtitle: "Market Force",
    description: "We don't just build apps. We build businesses that dent the universe.",
    // Image: Nebula/Explosion (Impact)
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1920&auto=format&fit=crop"
  }
];

// --- 3D PARALLAX CARD ---
const TriptychCard = ({ card, index }) => {
  const ref = useRef(null);

  // Mouse Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse movement
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function handleMouseMove({ clientX, clientY, currentTarget }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Parallax Transforms
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);
  const bgX = useTransform(mouseX, [-0.5, 0.5], ["-10%", "10%"]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], ["-10%", "10%"]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className="group relative h-[600px] w-full bg-[#050505] rounded-2xl overflow-hidden border border-white/5 cursor-none perspective-[1000px]"
    >
      {/* 1. THE HIDDEN WORLD (Background Image) */}
      <motion.div
        style={{ x: bgX, y: bgY, scale: 1.2 }}
        className="absolute inset-0 z-0 opacity-60 md:opacity-0 md:group-hover:opacity-60 transition-opacity duration-700 ease-out"
      >
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700"
        />
        {/* Dark Overlay to keep text readable */}
        <div className="absolute inset-0 bg-black/60 mix-blend-multiply" />
      </motion.div>

      {/* 2. THE BLACK GLASS (Default State) */}
      <div className="absolute inset-0 z-10 bg-transparent md:bg-black/80 md:group-hover:bg-transparent transition-colors duration-700" />

      {/* 3. CONTENT LAYER (Floats on top) */}
      <div className="relative z-20 h-full p-10 flex flex-col justify-between pointer-events-none" style={{ transform: "translateZ(50px)" }}>

        {/* Top: Header */}
        <div className="flex justify-between items-start">
          <span className="font-mono text-xs text-white/30 border border-white/10 px-2 py-1 rounded-full group-hover:text-white group-hover:border-white/30 transition-colors">
            {card.id}
          </span>
          <motion.div
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            <ArrowUpRight className="text-white w-5 h-5" />
          </motion.div>
        </div>

        {/* Bottom: Typography */}
        <div className="transform transition-transform duration-500 group-hover:translate-y-[-10px]">
          <h3 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tighter">
            {card.title}
          </h3>
          <div className="h-auto md:h-0 md:overflow-hidden md:group-hover:h-auto transition-all duration-500">
            <p className="text-lg text-white/80 font-light leading-relaxed max-w-xs pt-4 border-t border-white/20">
              {card.description}
            </p>
          </div>
          <div className="hidden md:block md:group-hover:hidden text-accent font-mono text-xs tracking-[0.3em] uppercase mt-2">
            {card.subtitle}
          </div>
        </div>
      </div>

      {/* 4. GLOSS OVERLAY (Apple Shine) */}
      <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 bg-gradient-to-tr from-white/5 to-transparent mix-blend-overlay" />

    </motion.div>
  );
};

export default function ValueProposition() {
  return (
    <section className="relative py-32 bg-black overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(20,20,20,1)_0%,_rgba(0,0,0,1)_100%)] z-0" />

      <div className="container mx-auto px-6 relative z-10">

        {/* HEADER */}
        <div className="mb-24 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Foundry</span> Pillars
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Explore the core principles that define our engineering output.
          </p>
        </div>

        {/* THE TRIPTYCH GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 perspective-[2000px]">
          {cards.map((card, index) => (
            <TriptychCard key={card.id} card={card} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}