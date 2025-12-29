import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function SectionPreview({ title, subtitle, description, imageUrl, linkTo, reverse = false }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.section 
      ref={ref}
      className="py-20"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center`}>
        {/* Image Column */}
        <div className={`order-1 ${reverse ? 'md:order-2' : 'md:order-1'}`}>
          <img 
            src={imageUrl} 
            alt={`${title} preview`} 
            className="rounded-xl shadow-2xl border border-border"
          />
        </div>

        {/* Text Column */}
        <div className={`order-2 ${reverse ? 'md:order-1' : 'md:order-2'} text-center md:text-left`}>
          <p className="text-lg text-molten-orange font-semibold">{subtitle}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mt-2 mb-6">{title}</h2>
          <p className="text-lg text-text-secondary mb-8 leading-relaxed">
            {description}
          </p>
          <Link to={linkTo}>
            <button className="btn-primary text-lg px-10 py-3 rounded-full">
              Explore More
            </button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}