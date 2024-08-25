import React from "react";
const WorkoutCard = React.memo(({ workout, openModal }) => {
  return (
    <div
      className="relative bg-white rounded-lg shadow p-6 cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out"
      onClick={() => openModal(workout.videoUrl)}
      role="button"
      tabIndex={0}
      aria-label={`Watch video for ${workout.title}`}
    >
      <div className="relative">
        <img
          className="h-48 w-full object-cover rounded-t-lg"
          src={workout.image}
          alt={workout.title}
        />
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-lg"></div>
      </div>
      <div className="mt-4 relative z-10">
        <h3 className="text-lg font-semibold text-gray-900">{workout.title}</h3>
        <p className="text-gray-600 mt-2">Click to watch the workout video.</p>
      </div>
    </div>
  );
});
export default WorkoutCard;
