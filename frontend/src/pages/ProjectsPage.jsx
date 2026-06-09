import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { useProjectStore } from "../hooks/useProjectStore";

import ProjectCard from "../components/projects/ProjectCard";
import ProjectFilters from "../components/projects/ProjectFilters";
import ProjectPagination from "../components/projects/ProjectPagination";
import ProjectSkeleton from "../components/projects/ProjectSkeleton";
import ProjectModal from "../components/projects/ProjectModal";

function ProjectsPage() {
  const {
    projects,
    pagination,
    filters,
    setFilters,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    isLoading,
  } = useProjectStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, [filters]);

  const handleCreateProject = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  const handleDeleteProject = async (projectId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) return;

    const result = await deleteProject(projectId);

    if (result.success) {
      successToast(result.message);
    } else {
      errorToast(result.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>

          <p className="text-slate-500">Manage and track all projects</p>
        </div>

        <button
          onClick={handleCreateProject}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Project
        </button>
      </div>

      <ProjectFilters filters={filters} setFilters={setFilters} />

      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4].map((item) => (
            <ProjectSkeleton key={item} />
          ))}
        </div>
      )}

      {!isLoading && projects.length === 0 && (
        <div className="rounded-xl border border-dashed bg-white py-16 text-center">
          <h3 className="text-lg font-medium">No projects found</h3>

          <p className="text-slate-500">Try changing your filters</p>
        </div>
      )}

      {!isLoading && projects.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={() => handleEditProject(project)}
              onDelete={() => handleDeleteProject(project.id)}
            />
          ))}
        </div>
      )}

      <ProjectPagination
        pagination={pagination}
        filters={filters}
        setFilters={setFilters}
      />

      <ProjectModal
        open={isModalOpen}
        project={selectedProject}
        onClose={handleCloseModal}
        createProject={createProject}
        updateProject={updateProject}
      />
    </div>
  );
}

export default ProjectsPage;
