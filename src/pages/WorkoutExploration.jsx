import { useState } from "react";
import ReactPlayer from "react-player/youtube";
import WorkoutCard from "../components/WorkoutCard";
export default function WorkoutExploration() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");

  const workouts = [
    {
      title: "Title 1",
      image:
        "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      videoUrl: "https://www.youtube.com/watch?v=wIynl3at0Rs",
    },
    {
      title: "Title 2",
      image:
        "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      videoUrl: "https://www.youtube.com/watch?v=wIynl3at0Rs",
    },
    {
      title: "Title 3",
      image:
        "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      videoUrl: "https://www.youtube.com/watch?v=wIynl3at0Rs",
    },
    {
      title: "Title 4",
      image:
        "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      videoUrl: "https://www.youtube.com/watch?v=wIynl3at0Rs",
    },
  ];
  const openModal = (videoUrl) => {
    setCurrentVideoUrl(videoUrl);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideoUrl("");
  };
  return (
    <>
      <div
        className="hero min-h-[70vh] mb-12"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-3xl">
            <h1 className="mb-5 text-5xl font-bold">Workout with us...</h1>
            <p className="mb-5 text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. In nam
              ullam corporis illum quis nostrum nisi voluptatem quisquam amet
              suscipit tempora, deleniti impedit. Commodi
            </p>
          </div>
        </div>
      </div>
      {/* Workouts */}
      <div className="mx-auto container text-center mt-20 mb-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Workout Categories
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {workouts.map((workout, idx) => (
            <WorkoutCard key={idx} workout={workout} openModal={openModal} />
          ))}
        </div>
      </div>
      {/* Workout tips */}
      <div className="m-auto container mt-20 mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl text-center mb-4">
          Workout tips & advace
        </h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt, a rem
          porro ipsa perferendis nam placeat veniam eaque rerum atque, harum
          soluta accusantium, nesciunt iure fuga autem illo numquam ut quisquam
          iste nisi aperiam amet corrupti. Autem ab exercitationem saepe dolorum
          distinctio, ex voluptas alias numquam enim! Velit.
        </p>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative transform transition-all duration-300 ease-in-out scale-100">
            <button
              className="text-gray-500 hover:text-gray-800 absolute top-2 right-2 font-bold focus:outline-none"
              onClick={closeModal}
              aria-label="Close video modal"
            >
              ✕
            </button>
            <div className="relative pb-[56.25%] h-0">
              <ReactPlayer
                url={currentVideoUrl}
                controls
                width="100%"
                height="100%"
                className="absolute top-0 left-0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
