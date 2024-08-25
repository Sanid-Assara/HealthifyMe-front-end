import React, { useState } from "react";
const WorkoutTips = () => {
  const [tips] = useState([
    {
      title: "Warm up",
      description:
        "Always start with a warm-up to avoid injuries. Warming up before any physical activity is crucial to prepare your body and mind for exercise, reduce the risk of injury, and enhance performance.",
    },
    {
      title: "Focus on Form",
      description:
        "Good form is crucial to avoid injury. Focusing on proper form is essential for preventing injuries and maximizing the effectiveness of your workouts.",
    },
  ]);
  return (
    <div className="grid grid-cols-1 gap-4 mt-8">
      {tips.map((tip, idx) => (
        <div key={idx} className="border rounded p-4 shadow-sm">
          <h3 className="font-semibold">{tip.title}</h3>
          <p>{tip.description}</p>
        </div>
      ))}
    </div>
  );
};
export default WorkoutTips;
