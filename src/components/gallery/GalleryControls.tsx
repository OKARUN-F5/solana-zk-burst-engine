
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grid3x3, List, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface GalleryControlsProps {
  viewMode: string;
  setViewMode: (mode: string) => void;
  sort: string;
  setSort: (sort: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const GalleryControls = ({
  viewMode,
  setViewMode,
  sort,
  setSort,
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
}: GalleryControlsProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full mb-8">
      <div className="relative w-full md:w-1/3">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <Input
          placeholder="Search tokens..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-black/30 border-white/10 text-white placeholder:text-slate-400 focus:ring-gallery-accent-teal/30"
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-[160px] bg-black/30 border-white/10 text-white">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent className="bg-gallery-bg-from border-white/10">
            <SelectItem value="all">All Tokens</SelectItem>
            <SelectItem value="claimed">Claimed</SelectItem>
            <SelectItem value="unclaimed">Not Claimed</SelectItem>
            <SelectItem value="legendary">Legendary</SelectItem>
            <SelectItem value="rare">Rare</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-full sm:w-[180px] bg-black/30 border-white/10 text-white">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-gallery-bg-from border-white/10">
            <SelectItem value="date-desc">Newest First</SelectItem>
            <SelectItem value="date-asc">Oldest First</SelectItem>
            <SelectItem value="rarity">Rarity (High to Low)</SelectItem>
            <SelectItem value="value-desc">Value (High to Low)</SelectItem>
            <SelectItem value="value-asc">Value (Low to High)</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className={`${viewMode === 'grid' ? 'bg-gallery-accent-pink/20 text-gallery-accent-pink border-gallery-accent-pink/30' : 'bg-black/30 border-white/10 text-white'}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`${viewMode === 'list' ? 'bg-gallery-accent-pink/20 text-gallery-accent-pink border-gallery-accent-pink/30' : 'bg-black/30 border-white/10 text-white'}`}
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GalleryControls;
