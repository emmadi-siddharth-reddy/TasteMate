import React from "react";
import { quickRecipes } from "./QuickRecipesData";
import { QuickRecipeCard } from "./QuickRecipeCard";

export default function QuickRecipes({ onSelect }) {
  return (
    <section>
      <h2>🍴 Quick Recipes</h2>
      <div className="quick-recipes-grid">
        {quickRecipes.map((recipe) => (
          <QuickRecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            onClick={onSelect}
          />
        ))}
      </div>
    </section>
  );
}
