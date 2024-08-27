import React, { useState } from "react";
const WorkoutTips = () => {
  const [tips] = useState([
    {
      title: "Warming Up Before Workout",
      description:
        "Warming up before a workout is essential as it prepares your body for physical activity by gradually increasing your heart rate, blood flow, and muscle temperature. This process enhances flexibility, reduces the risk of injury, and improves overall performance by loosening muscles and joints, making them more responsive to the demands of exercise. Additionally, warming up helps mentally prepare you for the workout ahead, ensuring you start your exercise routine with focus and energy.",
    },
    {
      title: "Stretch Only After Training",
      description:
        "Stretching after training is crucial as it improves flexibility, reduces muscle tension, enhances blood flow, and prevents injury. It supports muscle recovery by promoting circulation, reducing soreness, and increasing range of motion. Additionally, stretching aids in relaxation, improves posture, and helps maintain overall physical well-being.",
    },
    {
      title: "Benefits of Sauna or Hot Tub",
      description:
        "Using a sauna or hot tub after a workout offers several benefits, including muscle relaxation, improved circulation, and faster recovery. The heat helps soothe sore muscles, reduces stiffness, and alleviates joint pain by promoting blood flow. Additionally, the warmth can aid in flushing out toxins through sweating, enhance relaxation by reducing stress, and improve overall recovery, making you feel rejuvenated and ready for your next workout.",
    },
  ]);
  return (
    <div className="grid grid-cols-1 gap-4 mt-8">
      {tips.map((tip, idx) => (
        <div key={idx} className="border rounded p-4 shadow-sm">
          <h3 className="font-semibold text-xl">{tip.title}</h3>
          <p>{tip.description}</p>
        </div>
      ))}
    </div>
  );
};
export default WorkoutTips;
