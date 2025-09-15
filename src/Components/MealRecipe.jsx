import React from "react";

export function MealRecipe({ meal, innerRef }) {
  if (!meal) return null;


  const title = meal.strMeal || meal.name;
  const image = meal.strMealThumb || meal.image;
  const instructions = meal.strInstructions || meal.recipe;

  return (
    <section ref={innerRef} className="meal-recipe">
      <h2>{title}</h2>

    
      {image && (
        <img
          src={image}
          alt={title}
          style={{ maxWidth: "300px", borderRadius: "8px" }}
        />
      )}

     
      {instructions ? (
        <p style={{ whiteSpace: "pre-line" }}>{instructions}</p>
      ) : (
        <p>No instructions available for this recipe.</p>
      )}

    
      {meal.strYoutube && (
        <p>
          <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
            ▶ Watch Video
          </a>
        </p>
      )}
    </section>
  );
}
