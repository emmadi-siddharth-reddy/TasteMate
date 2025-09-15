// export function QuickRecipeCard({ recipe, onClick }) {
//   return (
//     <div
//       className="quick-recipe-card cursor-pointer p-4 rounded-2xl shadow-md hover:shadow-lg transition"
//       onClick={() => onClick(recipe)}
//     >
//       <img
//         src={recipe.strMealThumb}
//         alt={recipe.strMeal}
//         className="w-full h-40 object-cover rounded-xl mb-2"
//       />
//       <h3 className="text-lg font-semibold text-center">{recipe.strMeal}</h3>
//     </div>
//   );
// }



// export function QuickRecipeCard({ recipe }) {
//   return (
//     <div
//       className="card m-2"
//       style={{ width: "16rem", cursor: "pointer" }}
//       data-bs-toggle="modal"
//       data-bs-target={`#recipeModal-${recipe.id}`} // unique modal id
//     >
//       <img
//         src={recipe.strMealThumb}
//         className="card-img-top"
//         alt={recipe.strMeal}
//       />
//       <div className="card-body">
//         <h5 className="card-title">{recipe.strMeal}</h5>
//       </div>

//       {/* Bootstrap Modal */}
//       <div
//         className="modal fade"
//         id={`recipeModal-${recipe.id}`}
//         tabIndex="-1"
//         aria-labelledby={`recipeModalLabel-${recipe.id}`}
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-dialog-centered modal-lg">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5
//                 className="modal-title"
//                 id={`recipeModalLabel-${recipe.id}`}
//               >
//                 {recipe.strMeal}
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body text-center">
//               <img
//                 src={recipe.strMealThumb}
//                 alt={recipe.strMeal}
//                 className="img-fluid mb-3 rounded"
//               />
//               <pre
//                 style={{
//                   whiteSpace: "pre-wrap",
//                   textAlign: "left",
//                 }}
//               >
//                 {recipe.strInstructions}
//               </pre>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from "react";

export function QuickRecipeCard({ recipe, onClick }) {
  return (
    <div
      className="card quick-recipe-card shadow-sm"
      style={{
        width: "14rem",
        cursor: "pointer",
        borderRadius: "12px",
        overflow: "hidden",
      }}
      onClick={onClick}
    >
      <img
        src={recipe.strMealThumb}
        className="card-img-top"
        alt={recipe.strMeal}
        style={{ height: "160px", objectFit: "cover", display: "block" }}
      />
      <div className="card-body text-center">
        <h6 className="card-title fw-bold" style={{ margin: 0 }}>
          {recipe.strMeal}
        </h6>
      </div>
    </div>
  );
}
