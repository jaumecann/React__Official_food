import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useCallback, useEffect, useState } from 'react';

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('')


  const fetchMeals = useCallback( async () =>
    {
      const mealsData = [];

      setIsLoading(true);
      setError(null);

      try{
       
        const response = await fetch('https://react-http-bb165-default-rtdb.firebaseio.com/meals.json');

        if (!response.ok) {
          throw new Error('Request failed!');
        }

        const data = await response.json();
  
        for (const key in data){
          mealsData.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price
          })
        }
      }
      catch{
        setError('Fetch error')
      }

      setMeals(mealsData)
      setIsLoading(false)
     },[]);

  useEffect(()=>{
    fetchMeals()
  },[fetchMeals])

  
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  let content = "No data yet";

if (mealsList.length > 0){ 
    content = <ul>{mealsList}</ul>
 }

  if (error){
    content = 'Error fetching content';
  }

  if(isLoading){
    content = 'Loading';
  }

  return (
    <section className={classes.meals}>
       <Card>
       {content}
       </Card>
     </section>
  );
};

export default AvailableMeals;
