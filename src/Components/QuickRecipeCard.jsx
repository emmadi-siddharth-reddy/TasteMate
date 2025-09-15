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
