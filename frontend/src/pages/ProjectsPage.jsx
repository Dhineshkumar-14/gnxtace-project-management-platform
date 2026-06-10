import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { useProjectStore } from "../hooks/useProjectStore";
import { useAuthStore } from "../hooks/useAuthStore";

import { hasPermission } from "../utils/permissions";
import { successToast, errorToast } from "../utils/toast";

import ProjectCard from "../components/projects/ProjectCard";
import ProjectFilters from "../components/projects/ProjectFilters";
import ProjectPagination from "../components/projects/ProjectPagination";
import ProjectSkeleton from "../components/projects/ProjectSkeleton";
import ProjectModal from "../components/projects/ProjectModal";
import ProjectsTable from "../components/projects/ProjectsTable";
import ProjectDetailsModal from "../components/projects/ProjectDetailsModal";

function ProjectsPage() {
  const user = useAuthStore((state) => state.user);

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
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const canCreateProject = hasPermission(user, "projects:create");

  const canUpdateProject = hasPermission(user, "projects:update");

  const canDeleteProject = hasPermission(user, "projects:delete");

  useEffect(() => {
    fetchProjects();
  }, [filters, fetchProjects]);

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

    try {
      const result = await deleteProject(projectId);

      if (result?.success) {
        successToast(result.message);
      } else {
        errorToast(result?.message || "Failed to delete project");
      }
    } catch (error) {
      errorToast("Failed to delete project");
    }
  };
  const handleViewProject = (project) => {
    setSelectedProject(project);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setSelectedProject(null);
    setIsDetailsOpen(false);
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>

          <p className="text-slate-500">Manage and track all projects</p>
        </div>

        {canCreateProject && (
          <button
            onClick={handleCreateProject}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Create Project
          </button>
        )}
      </div>

      {/* Filters */}
      <ProjectFilters filters={filters} setFilters={setFilters} />

      {/* Loading */}
      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4].map((item) => (
            <ProjectSkeleton key={item} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && projects.length === 0 && (
        <div className="rounded-xl border border-dashed bg-white py-16 text-center">
          <h3 className="text-lg font-medium">No projects found</h3>

          <p className="text-slate-500">Try changing your filters</p>
        </div>
      )}

      {/* Projects */}
      {!isLoading && projects.length > 0 && (
        <ProjectsTable
          projects={projects}
          canView={hasPermission(user, "projects:read")}
          canEdit={canUpdateProject}
          canDelete={canDeleteProject}
          onView={handleViewProject}
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
        />
      )}

      {/* Pagination */}
      <ProjectPagination
        pagination={pagination}
        filters={filters}
        setFilters={setFilters}
      />

      {/* Modal */}
      <ProjectModal
        open={isModalOpen}
        project={selectedProject}
        onClose={handleCloseModal}
        createProject={createProject}
        updateProject={updateProject}
      />
      {/* Modal */}
      <ProjectDetailsModal
        open={isDetailsOpen}
        project={selectedProject}
        onClose={handleCloseDetails}
      />
    </div>
  );
}

export default ProjectsPage;
