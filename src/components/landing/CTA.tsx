import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 md:p-16"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-primary-foreground blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent mb-6">
              <Sparkles className="h-4 w-4" />
              Start for Free
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground">
              Ready to Transform
              <br />
              Your Career Journey?
            </h2>

            <p className="mt-6 text-lg text-primary-foreground/80 max-w-xl mx-auto">
              Join thousands of professionals who've discovered their skill gaps and landed their dream jobs with SkillBridge.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/register')}
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow min-w-[200px] h-12 text-base"
              >
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/register?role=recruiter')}
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 min-w-[200px] h-12 text-base"
              >
                I'm a Recruiter
              </Button>
            </div>

            <p className="mt-6 text-sm text-primary-foreground/60">
              No credit card required • Free forever for basic features
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
