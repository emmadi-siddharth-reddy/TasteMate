export function MealNavigation({ allMeals, currentMealIndex, changeMeal }) {
    if (allMeals.length <= 1) return null;

    return (
        <div className="meal-navigation">
            <button onClick={() => changeMeal(-1)}>Previous</button>
            <span>
                {currentMealIndex + 1} / {allMeals.length}
            </span>
            <button onClick={() => changeMeal(1)}>Next</button>
        </div>
    );
}
