import { useState } from "react";
import ReactPlayer from "react-player/youtube";
import WorkoutCard from "../components/WorkoutCard";
import WorkoutTips from "../components/WorkoutTips";
export default function WorkoutExploration() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");

  const workouts = [
    {
      title: "Warm Up Exercises Before Workout 1",
      image:
        "https://plus.unsplash.com/premium_photo-1723683629048-c3f2682cecdd?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      videoUrl: "https://www.youtube.com/watch?v=9UYVecB2_08",
    },
    {
      title: "Warm Up Exercises Before Workout 2",
      image:
        "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=3125&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      videoUrl: "https://www.youtube.com/watch?v=dLFZnoMwLiA",
    },
    {
      title: "At Home Workout (No Equipment)",
      image:
        "https://images.unsplash.com/photo-1640622304964-3e2c2c0cd7cd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      videoUrl: "https://www.youtube.com/watch?v=BGXGdUj93BM",
    },
    {
      title: "Workout in the Nature, Motivational Video",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2202&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      videoUrl: "https://www.youtube.com/watch?v=YVq5BHtZp00",
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
          Workout tips & Advice
        </h2>

        {<WorkoutTips />}
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
