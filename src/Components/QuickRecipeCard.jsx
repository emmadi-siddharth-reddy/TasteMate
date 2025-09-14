export function QuickRecipeCard({ recipe, onClick }) {
  return (
    <div
      className="quick-recipe-card cursor-pointer p-4 rounded-2xl shadow-md hover:shadow-lg transition"
      onClick={() => onClick(recipe)}
    >
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-40 object-cover rounded-xl mb-2"
      />
      <h3 className="text-lg font-semibold text-center">{recipe.strMeal}</h3>
    </div>
  );
}
