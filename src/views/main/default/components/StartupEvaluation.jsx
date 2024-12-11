// import React, { useState } from "react";
// import SSI from "./SSI";
// import EvaluationMetrics from "./EvaluationMetrics";

// const StartupEvaluation = () => {
//     const [currentStage, setCurrentStage] = useState("SEED");
  
//     return (
//       <div className="p-8 bg-white rounded-lg shadow-lg">
//         <h1 className="text-2xl font-bold mb-4">스타트업 단계별 평가 지표</h1>
//         <p className="text-gray-600 mb-8">
//           단계별 핵심 지표와 검증 방법을 제공합니다. 가장 중요한 지표는 **굵게**
//           표시되었습니다.
//         </p>
  
//         {/* Stage Selector */}
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-lg font-semibold">투자 단계 선택</h2>
//           <select
//             value={currentStage}
//             onChange={(e) => setCurrentStage(e.target.value)}
//             className="p-2 border rounded-lg"
//           >
//             {Object.keys(startupStageMetrics).map((stage) => (
//               <option key={stage} value={stage}>
//                 {stage}
//               </option>
//             ))}
//           </select>
//         </div>
  
//         {/* Evaluation Metrics */}
//         <EvaluationMetrics metrics={startupStageMetrics[currentStage]} />
//       </div>
//     );
//   };
  
//   export default StartupEvaluation;
  