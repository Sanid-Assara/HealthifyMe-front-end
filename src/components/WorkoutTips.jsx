import React, { useState } from "react";
const WorkoutTips = () => {
  const [tips] = useState([
    {
      title: "Warm up",
      description: "Always start with a warm-up to avoid injuries.",
    },
    {
      title: "Focus on Form",
      description: "Good form is crucial to avoid injury",
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
