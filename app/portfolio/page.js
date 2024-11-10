import Image from 'next/image'
import Link from 'next/link'

const projects = [
  {
    id: 1,
    title: "E-commerce Website",
    description: "Built a full-featured online store using Next.js and Stripe integration.",
    image: "/images/work-1.jpg",
    tags: ["Next.js", "Stripe", "Tailwind CSS"],
    link: "/portfolio/e-commerce"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Developed a collaborative task management application with real-time updates.",
    image: "/images/work-2.jpg",
    tags: ["React", "Firebase", "Material-UI"],
    link: "/portfolio/task-management"
  },
  {
    id: 3,
    title: "Recipe Sharing Platform",
    description: "Created a social platform for sharing and discovering cooking recipes.",
    image: "/images/work-3.jpg",
    tags: ["Vue.js", "Node.js", "MongoDB"],
    link: "/portfolio/recipe-platform"
  },
  {
    id: 4,
    title: "Fitness Tracking Dashboard",
    description: "Designed and implemented a dashboard for tracking workout progress.",
    image: "/images/work-4.jpg",
    tags: ["React", "D3.js", "Express"],
    link: "/portfolio/fitness-dashboard"
  },
  {
    id: 5,
    title: "Weather Forecast App",
    description: "Built a weather application with location-based forecasts and alerts.",
    image: "/images/work-5.jpg",
    tags: ["React Native", "Weather API", "Redux"],
    link: "/portfolio/weather-app"
  },
  {
    id: 6,
    title: "Portfolio Website",
    description: "Designed and developed a responsive portfolio website showcasing my work.",
    image: "/images/work-6.jpg",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    link: "/portfolio/portfolio-site"
  }
];

export default function Portfolio() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">
        My Work
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link
            href={project.link}
            key={project.id}
            className="block group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group-hover:scale-105">
              <div className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

