'use client';

import { Suspense } from 'react';
import ProjectCard from '@/components/ProjectCard';
import LetteringProjectCard from '@/components/LetteringProjectCard';
import { Project } from '@/data/projects';
import { useSearchParams } from 'next/navigation';


interface ProjectTabsProps {
  projects: Project[];

}

function ProjectTabsContent({ projects }: ProjectTabsProps) {
  const searchParams = useSearchParams();

  const tabParam = searchParams.get('tab');
  const activeTab = tabParam && ['branding', 'ui_ux', 'packaging'].includes(tabParam) ? tabParam : 'all';

  const getProjectsForTab = () => {
    const filtered = projects
      .map((p, index) => ({ project: p, index }))
      .filter(({ project }) => {
        if (activeTab === 'all') return true;
        const tags = project.tags_en || [];
        if (activeTab === 'branding' && tags.includes('Branding')) return true;
        if (activeTab === 'ui_ux' && tags.includes('UI/UX')) return true;
        if (activeTab === 'packaging' && tags.includes('Packaging')) return true;
        return false;
      });
    
    return filtered;
  };

  const currentProjects = getProjectsForTab();

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {currentProjects.length > 0 ? (
          currentProjects.map(({ project, index }) => (
            activeTab === 'ui_ux' ? (
              <LetteringProjectCard key={index} project={project} index={index} />
            ) : (
              <ProjectCard key={index} project={project} index={index} />
            )
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-32 text-black/40 font-medium text-[15px]">
            Updating...
          </div>
        )}
      </div>


    </div>
  );
}

export default function ProjectTabs({ projects }: ProjectTabsProps) {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
      <ProjectTabsContent projects={projects} />
    </Suspense>
  );
}
