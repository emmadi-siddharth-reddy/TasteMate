import { React, useEffect, useRef, useState } from "react";
import { AIRecipe } from "./AIRecipe";
import { IngredientsList } from "./IngredientsList";
import { getRecipeFromMistral } from "./Ai";
import { MealRecipe } from "./MealRecipe";
import { MealNavigation } from "./MealNavigation";
import QuickRecipes from "./QuickRecipes";

export function Main({ useAI }) {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");             // AI / MealDB recipes
  const [quickRecipe, setQuickRecipe] = useState(null); // Quick recipe selection
  const [mood, setMood] = useState("");
  const [time, setTime] = useState("");
  const [allMeals, setAllMeals] = useState([]);
  const [currentMealIndex, setCurrentMealIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const recipeSection = useRef(null);

  useEffect(() => {
    if ((recipe || quickRecipe) && recipeSection.current) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe, quickRecipe]);

  // Add ingredient handler
  function addIngredient(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newIngredient = formData.get("ingredient")?.trim();
    if (!newIngredient || !/^[A-Za-z\s]+$/.test(newIngredient)) {
      alert("Please enter a valid ingredient (letters only).");
      return;
    }
    setIngredients(prev => [...prev, newIngredient]);
    event.target.reset();
  }

  function removeIngredient(indexToRemove) {
    setIngredients(prev => prev.filter((_, index) => index !== indexToRemove));
  }

  // Fetch recipe from AI or MealDB
  async function getRecipe() {
    if (useAI) {
      setLoading(true);
      try {
        const recipeMarkdown = await getRecipeFromMistral(ingredients, mood, time);
        setRecipe(recipeMarkdown);
      } catch (err) {
        console.error(err);
        setRecipe("Error fetching recipe from AI.");
      } finally {
        setLoading(false);
      }
    } else {
      const ingredientQuery = ingredients.map(i => `i=${encodeURIComponent(i)}`).join("&");
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?${ingredientQuery}`;

      setLoading(true);
      try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.meals) {
          setAllMeals(data.meals);
          setCurrentMealIndex(0);

          const firstMeal = data.meals[0];
          const detailsRes = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${firstMeal.idMeal}`
          );
          const detailsData = await detailsRes.json();
          setRecipe(detailsData.meals[0]);
        } else {
          setAllMeals([]);
          setRecipe("No meals found with those ingredients.");
        }
      } catch (err) {
        console.error(err);
        setRecipe("Error fetching recipe from TheMealDB.");
      } finally {
        setLoading(false);
      }
    }
  }

  async function changeMeal(direction) {
    if (!allMeals.length) return;

    const newIndex = (currentMealIndex + direction + allMeals.length) % allMeals.length;
    setCurrentMealIndex(newIndex);

    const meal = allMeals[newIndex];
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
      );
      const data = await res.json();
      if (data.meals && data.meals.length > 0) {
        setRecipe(data.meals[0]);
      }
    } catch (err) {
      console.error(err);
      setRecipe("Error fetching meal details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      {/* Ingredients Form */}
      <form onSubmit={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button type="submit">Add ingredient</button>
      </form>

      <h2>Add Ingredients</h2>

      {/* Mood / Time Options */}
      {useAI && (
        <div className="extra-options">
          <label>
            Mood:
            <select value={mood} onChange={(e) => setMood(e.target.value)}>
              <option value="">--Select--</option>
              <option value="comforting">Comforting</option>
              <option value="healthy">Healthy</option>
              <option value="quick">Quick</option>
              <option value="fancy">Fancy</option>
            </select>
          </label>

          <label>
            Time:
            <select value={time} onChange={(e) => setTime(e.target.value)}>
              <option value="">--Select--</option>
              <option value="under 15 minutes">Under 15 minutes</option>
              <option value="15 to 30 minutes">15 to 30 minutes</option>
              <option value="over 30 minutes">Over 30 minutes</option>
            </select>
          </label>
        </div>
      )}

      {/* Ingredients List */}
      {ingredients.length > 0 && (
        <IngredientsList
          innerRef={recipeSection}
          ingredients={ingredients}
          getRecipe={getRecipe}
          removeIngredient={removeIngredient}
        />
      )}

      {/* Loading Message */}
      {loading && (
        <p className="loading-message" style={{ textAlign: "center", marginTop: "1rem" }}>
          ⏳ Fetching recipe...
        </p>
      )}

      {/* AI / MealDB Recipes */}
      {!loading && recipe && useAI && <AIRecipe recipe={recipe} />}
      {!loading && recipe && !useAI && typeof recipe === "object" && recipe.strMeal && (
        <>
          <MealRecipe meal={recipe} innerRef={recipeSection} />
          <MealNavigation
            allMeals={allMeals}
            currentMealIndex={currentMealIndex}
            changeMeal={changeMeal}
          />
        </>
      )}

      {/* Quick Recipes Section */}
      <QuickRecipes onSelect={(selectedRecipe) => setQuickRecipe(selectedRecipe)} />
      {!loading && quickRecipe && (
        <MealRecipe
          meal={{
            strMeal: quickRecipe.strMeal,
            strMealThumb: quickRecipe.strMealThumb,
            strInstructions: quickRecipe.strInstructions
          }}
          innerRef={recipeSection}
        />
      )}
    </main>
  );
}
