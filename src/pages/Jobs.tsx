import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { JobCard } from '@/components/jobs/JobCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  job_type: string;
  required_skills: string[];
  salary_min?: number;
  salary_max?: number;
  is_internship: boolean;
  created_at: string;
}

const Jobs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('');
  const [showInternships, setShowInternships] = useState<boolean | null>(null);

  useEffect(() => {
    fetchJobs();
    if (user) {
      fetchApplications();
    }
  }, [user]);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchQuery, jobTypeFilter, locationFilter, showInternships]);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('job_applications')
      .select('job_id')
      .eq('user_id', user.id);

    if (data) {
      setApplications(data.map((a) => a.job_id));
    }
  };

  const filterJobs = () => {
    let filtered = [...jobs];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.required_skills.some((s) => s.toLowerCase().includes(query))
      );
    }

    if (jobTypeFilter !== 'all') {
      filtered = filtered.filter((job) => job.job_type === jobTypeFilter);
    }

    if (locationFilter) {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (showInternships !== null) {
      filtered = filtered.filter((job) => job.is_internship === showInternships);
    }

    setFilteredJobs(filtered);
  };

  const handleApply = async (jobId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const { error } = await supabase.from('job_applications').insert({
        job_id: jobId,
        user_id: user.id,
      });

      if (error) {
        if (error.code === '23505') {
          toast.error('You have already applied to this job');
        } else {
          throw error;
        }
        return;
      }

      setApplications([...applications, jobId]);
      toast.success('Application submitted!');
    } catch (error) {
      toast.error('Failed to apply');
    }
  };

  const uniqueLocations = [...new Set(jobs.map((j) => j.location))];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Browse Jobs</h1>
          <p className="text-muted-foreground mt-1">
            Find your perfect job or internship opportunity
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl p-4 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs, companies, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full md:w-[150px]"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <Badge
              variant={showInternships === null ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setShowInternships(null)}
            >
              All
            </Badge>
            <Badge
              variant={showInternships === false ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setShowInternships(false)}
            >
              Jobs
            </Badge>
            <Badge
              variant={showInternships === true ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setShowInternships(true)}
            >
              Internships
            </Badge>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No jobs found matching your criteria</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  applied={applications.includes(job.id)}
                  onApply={handleApply}
                  onViewDetails={(id) => navigate(`/jobs/${id}`)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Jobs;
