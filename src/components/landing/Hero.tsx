import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Upload, Search, TrendingUp, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div {...fadeInUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent-foreground mb-6">
              <TrendingUp className="h-4 w-4 text-accent" />
              AI-Powered Career Intelligence
            </span>
          </motion.div>

          <motion.h1
            {...fadeInUp}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl font-bold tracking-tight text-primary-foreground md:text-6xl lg:text-7xl"
          >
            Bridge Your{' '}
            <span className="relative">
              <span className="relative z-10 text-accent">Skills Gap</span>
              <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                <path d="M2 8C50 2 150 2 198 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-accent/40" />
              </svg>
            </span>
            <br />
            Land Your Dream Job
          </motion.h1>

          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 text-lg text-primary-foreground/80 md:text-xl max-w-2xl mx-auto"
          >
            Upload your resume, discover skill gaps, and get personalized learning paths. 
            Our AI matches you with jobs where you'll thrive.
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={() => navigate('/register')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow min-w-[200px] h-12 text-base"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/jobs')}
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 min-w-[200px] h-12 text-base"
            >
              <Search className="mr-2 h-5 w-5" />
              Browse Jobs
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {[
              { value: '10K+', label: 'Jobs Analyzed' },
              { value: '50K+', label: 'Resumes Processed' },
              { value: '95%', label: 'Match Accuracy' },
              { value: '2.5x', label: 'Faster Hiring' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold text-accent md:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-primary-foreground/60">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-20 hidden lg:block"
        >
          <div className="relative mx-auto max-w-5xl">
            {/* Process Steps Cards */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: Upload, title: 'Upload Resume', desc: 'PDF or DOCX format' },
                { icon: Search, title: 'AI Analysis', desc: 'Skill extraction & matching' },
                { icon: CheckCircle2, title: 'Get Matched', desc: 'Personalized recommendations' },
              ].map((step, i) => (
                <div
                  key={i}
                  className="glass rounded-2xl p-6 shadow-xl animate-float"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-accent">
                      <step.icon className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
