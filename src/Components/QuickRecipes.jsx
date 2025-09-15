import React, { useState, useEffect } from "react";
import { quickRecipes } from "./QuickRecipesData";
import { QuickRecipeCard } from "./QuickRecipeCard";

export default function QuickRecipes() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedRecipe ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedRecipe]);

  return (
    <section className="quick-recipes-section">
      <h2 className="text-center my-4">🍴 Quick Recipes</h2>

      <div className="container">
        <div className="row g-3">
          {(quickRecipes || []).map((recipe) => (
            <div
              key={recipe.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
            >
              <QuickRecipeCard
                recipe={recipe}
                onClick={() => setSelectedRecipe(recipe)}
              />
            </div>
          ))}
        </div>
      </div>

      {selectedRecipe && (
        <div
          className="quickrecipes-modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="quickrecipes-modal modal-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="modal-header-custom"
              role="banner"
              aria-labelledby={`modalTitle-${selectedRecipe.id}`}
            >
              <h5 id={`modalTitle-${selectedRecipe.id}`} className="modal-title">
                {selectedRecipe.strMeal}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close"
                onClick={() => setSelectedRecipe(null)}
              />
            </div>

            <div className="modal-body-custom">
              <img
                src={selectedRecipe.strMealThumb}
                alt={selectedRecipe.strMeal}
                className="img-fluid rounded mb-3 shadow-sm"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />

              <div className="instructions-box">
                <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>
                  {selectedRecipe.strInstructions}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
