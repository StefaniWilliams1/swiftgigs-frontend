import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { Checkbox } from '@/app/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Star, 
  Award, 
  CheckCircle2, 
  Trophy,
  Filter,
  Sparkles,
  Brain,
  Zap
} from 'lucide-react';
import { mockServices, availableSkills, ukLocations } from '@/app/data/mockData';
import { ProviderMatch, MatchingCriteria } from '@/app/types';

export function MatchingPage() {
  const navigate = useNavigate();
  const [criteria, setCriteria] = useState<MatchingCriteria>({
    skills: [],
    location: '',
    date: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minRating: 0,
    maxPrice: 10000,
    selectedSkill: 'all',
  });
  const [hasSearched, setHasSearched] = useState(false);

  // Calculate match scores
  const matchedProviders = useMemo(() => {
    if (!hasSearched) return [];

    const matches: ProviderMatch[] = mockServices.map(provider => {
      let skillMatch = 0;
      let locationMatch = 0;
      let availabilityMatch = 0;

      // Skill matching (40% weight)
      if (criteria.skills.length > 0 && provider.skills) {
        const matchingSkills = criteria.skills.filter(skill =>
          provider.skills!.includes(skill)
        );
        skillMatch = (matchingSkills.length / criteria.skills.length) * 40;
      } else if (criteria.skills.length === 0) {
        skillMatch = 40; // Full score if no skill criteria
      }

      // Location matching (30% weight)
      if (criteria.location) {
        locationMatch = provider.location === criteria.location ? 30 : 0;
      } else {
        locationMatch = 30; // Full score if no location criteria
      }

      // Availability matching (30% weight)
      if (criteria.date) {
        availabilityMatch = provider.availability.includes(criteria.date) ? 30 : 0;
      } else {
        availabilityMatch = 30; // Full score if no date criteria
      }

      const matchScore = Math.round(skillMatch + locationMatch + availabilityMatch);

      return {
        ...provider,
        matchScore,
        matchDetails: {
          skillMatch: Math.round(skillMatch),
          locationMatch: Math.round(locationMatch),
          availabilityMatch: Math.round(availabilityMatch),
        },
      };
    });

    // Apply filters
    let filtered = matches.filter(match => {
      const ratingPass = match.rating >= filters.minRating;
      const pricePass = match.hourlyRate ? match.hourlyRate <= filters.maxPrice : true;
      const skillPass = filters.selectedSkill === 'all' || 
        (match.skills && match.skills.includes(filters.selectedSkill));
      
      return ratingPass && pricePass && skillPass;
    });

    // Sort by match score
    return filtered.sort((a, b) => b.matchScore - a.matchScore);
  }, [criteria, filters, hasSearched]);

  const topThree = matchedProviders.slice(0, 3);

  const handleSkillToggle = (skill: string) => {
    setCriteria(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSearch = () => {
    setHasSearched(true);
  };

  const handleReset = () => {
    setCriteria({ skills: [], location: '', date: '' });
    setFilters({ minRating: 0, maxPrice: 10000, selectedSkill: 'all' });
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600">
              <Brain className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold text-gray-900">Smart AI Matching System</h1>
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  AI-Powered
                </Badge>
              </div>
            </div>
          </div>
          <p className="text-gray-600 flex items-center gap-2">
            <Zap className="h-4 w-4 text-purple-600" />
            Our intelligent AI system finds perfect entertainment professionals based on your specific needs
          </p>
        </div>

        {/* Criteria Selection Card */}
        <Card className="mb-8 rounded-xl shadow-md border-2 border-purple-100">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Tell our AI what you're looking for
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Skills Selection */}
            <div>
              <Label className="mb-3 block text-base font-semibold">
                Select Skills/Services
              </Label>
              <div className="flex flex-wrap gap-2">
                {availableSkills.slice(0, 15).map(skill => (
                  <Badge
                    key={skill}
                    variant={criteria.skills.includes(skill) ? 'default' : 'outline'}
                    className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                      criteria.skills.includes(skill)
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'hover:border-purple-600 hover:text-purple-600'
                    }`}
                    onClick={() => handleSkillToggle(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
              {criteria.skills.length > 0 && (
                <p className="mt-2 text-sm text-gray-600">
                  {criteria.skills.length} skill(s) selected
                </p>
              )}
            </div>

            {/* Location and Date */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="location" className="mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-purple-600" />
                  Location
                </Label>
                <Select value={criteria.location} onValueChange={(value) => 
                  setCriteria(prev => ({ ...prev, location: value }))
                }>
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {ukLocations.map(loc => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date" className="mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-purple-600" />
                  Event Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={criteria.date}
                  onChange={(e) => setCriteria(prev => ({ ...prev, date: e.target.value }))}
                  className="h-12 rounded-xl"
                  min="2026-01-01"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex gap-3">
              <Button
                onClick={handleSearch}
                className="flex-1 h-12 rounded-xl bg-purple-600 hover:bg-purple-700"
              >
                <Search className="mr-2 h-5 w-5" />
                Find Matching Providers
              </Button>
              {hasSearched && (
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="h-12 rounded-xl"
                >
                  Reset
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        {hasSearched && (
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="mb-4 rounded-xl"
            >
              <Filter className="mr-2 h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>

            {showFilters && (
              <Card className="rounded-xl">
                <CardContent className="p-6">
                  <div className="grid gap-6 md:grid-cols-3">
                    <div>
                      <Label className="mb-3 block font-semibold">Minimum Rating</Label>
                      <Select
                        value={filters.minRating.toString()}
                        onValueChange={(value) =>
                          setFilters(prev => ({ ...prev, minRating: parseFloat(value) }))
                        }
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">All Ratings</SelectItem>
                          <SelectItem value="4.5">4.5+ Stars</SelectItem>
                          <SelectItem value="4.0">4.0+ Stars</SelectItem>
                          <SelectItem value="3.5">3.5+ Stars</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="mb-3 block font-semibold">Max Hourly Rate</Label>
                      <Select
                        value={filters.maxPrice.toString()}
                        onValueChange={(value) =>
                          setFilters(prev => ({ ...prev, maxPrice: parseInt(value) }))
                        }
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10000">Any Price</SelectItem>
                          <SelectItem value="500">Under £500</SelectItem>
                          <SelectItem value="700">Under £700</SelectItem>
                          <SelectItem value="1000">Under £1000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="mb-3 block font-semibold">Specific Skill</Label>
                      <Select
                        value={filters.selectedSkill}
                        onValueChange={(value) =>
                          setFilters(prev => ({ ...prev, selectedSkill: value }))
                        }
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Skills</SelectItem>
                          {availableSkills.slice(0, 10).map(skill => (
                            <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Results */}
        {hasSearched && (
          <>
            {/* Top 3 Matches */}
            {topThree.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  Top 3 Matches
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {topThree.map((provider, index) => (
                    <Card
                      key={provider.id}
                      className="relative overflow-hidden rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white shadow-lg transition-all hover:shadow-xl"
                    >
                      {/* Top Match Badge */}
                      <div className="absolute right-0 top-0">
                        <div
                          className={`rounded-bl-xl px-4 py-2 ${
                            index === 0
                              ? 'bg-yellow-500'
                              : index === 1
                              ? 'bg-gray-400'
                              : 'bg-amber-600'
                          }`}
                        >
                          <span className="font-bold text-white">
                            {index === 0 ? '🥇 #1' : index === 1 ? '🥈 #2' : '🥉 #3'}
                          </span>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <img
                          src={provider.image}
                          alt={provider.name}
                          className="mb-4 h-40 w-full rounded-lg object-cover"
                        />
                        
                        <div className="mb-3">
                          <h3 className="mb-1 font-bold text-lg">{provider.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            {provider.location}
                          </div>
                        </div>

                        {/* Match Score */}
                        <div className="mb-4">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-700">
                              Match Score
                            </span>
                            <span className="text-lg font-bold text-purple-600">
                              {provider.matchScore}%
                            </span>
                          </div>
                          <Progress value={provider.matchScore} className="h-3" />
                        </div>

                        {/* Match Breakdown */}
                        <div className="mb-4 space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Skills Match:</span>
                            <span className="font-semibold">
                              {provider.matchDetails.skillMatch}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Location Match:</span>
                            <span className="font-semibold">
                              {provider.matchDetails.locationMatch}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Availability:</span>
                            <span className="font-semibold">
                              {provider.matchDetails.availabilityMatch}%
                            </span>
                          </div>
                        </div>

                        {/* Rating & Price */}
                        <div className="mb-4 flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{provider.rating}</span>
                            <span className="text-gray-600">({provider.reviews})</span>
                          </div>
                          {provider.verified && (
                            <Badge variant="secondary" className="gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Verified
                            </Badge>
                          )}
                        </div>

                        <div className="mb-4 text-sm">
                          <span className="font-semibold text-purple-600">
                            {provider.priceRange}
                          </span>
                        </div>

                        <Button
                          onClick={() => navigate(`/service/${provider.id}`)}
                          className="w-full rounded-xl bg-purple-600 hover:bg-purple-700"
                        >
                          View Profile
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* All Results */}
            <div>
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                All Matches ({matchedProviders.length})
              </h2>
              
              {matchedProviders.length === 0 ? (
                <Card className="rounded-xl p-8 text-center">
                  <p className="text-gray-600">
                    No providers match your criteria. Try adjusting your filters.
                  </p>
                </Card>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {matchedProviders.map(provider => (
                    <Card
                      key={provider.id}
                      className="overflow-hidden rounded-xl transition-all hover:shadow-lg"
                    >
                      <CardContent className="p-6">
                        <img
                          src={provider.image}
                          alt={provider.name}
                          className="mb-4 h-36 w-full rounded-lg object-cover"
                        />
                        
                        <div className="mb-3">
                          <h3 className="mb-1 font-semibold">{provider.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="h-3 w-3" />
                            {provider.location}
                          </div>
                        </div>

                        {/* Match Score */}
                        <div className="mb-3">
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span className="font-medium text-gray-700">Match</span>
                            <span className="font-bold text-purple-600">
                              {provider.matchScore}%
                            </span>
                          </div>
                          <Progress value={provider.matchScore} className="h-2" />
                        </div>

                        {/* Skills */}
                        {provider.skills && (
                          <div className="mb-3 flex flex-wrap gap-1">
                            {provider.skills.slice(0, 3).map(skill => (
                              <Badge
                                key={skill}
                                variant="secondary"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Rating & Price */}
                        <div className="mb-3 flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{provider.rating}</span>
                          </div>
                          <span className="font-semibold text-purple-600">
                            £{provider.hourlyRate}/hr
                          </span>
                        </div>

                        <Button
                          onClick={() => navigate(`/service/${provider.id}`)}
                          variant="outline"
                          className="w-full rounded-xl"
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Empty State */}
        {!hasSearched && (
          <Card className="rounded-xl p-12 text-center border-2 border-purple-100">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-blue-100">
              <Brain className="h-10 w-10 text-purple-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Ready for AI-Powered Matching
            </h3>
            <p className="text-gray-600 mb-4">
              Select your criteria above and let our intelligent AI system analyze and find 
              the perfect entertainment professionals for your event
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-purple-600">
              <Zap className="h-4 w-4" />
              <span className="font-medium">Powered by advanced AI algorithms</span>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}